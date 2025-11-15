
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from joblib import load
import numpy as np
import pathlib

BASE_DIR = pathlib.Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "cough_intensity_model.joblib"

# Load model once at startup
clf = load(MODEL_PATH)

LABELS = {
    0: {
        "status": "normal",
        "message": "Cough pattern looks normal. No strong signs of respiratory stress detected."
    },
    1: {
        "status": "irregular",
        "message": "Mild irregular cough pattern detected. Monitor your symptoms and repeat later."
    },
    2: {
        "status": "distress",
        "message": "Pattern resembles respiratory distress. If symptoms continue or worsen, consider clinical advice."
    }
}

class CoughRequest(BaseModel):
    samples: List[float]

class CoughResponse(BaseModel):
    status: str
    message: str
    confidence: int
    score: int
    features: Dict[str, Any]

app = FastAPI(title="AirBand Demo Backend")

# Allow Vite dev server (localhost:5173) and simple static hosting (localhost:5500)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}

def extract_features(samples: np.ndarray) -> np.ndarray:
    if samples.size == 0:
        samples = np.array([0.0])
    mean = float(samples.mean())
    std = float(samples.std())
    maxv = float(samples.max())
    minv = float(samples.min())
    spikes = float(((samples > (mean + std)).sum() / samples.size) if samples.size > 0 else 0.0)
    length = float(samples.size)
    return np.array([mean, std, maxv, minv, spikes, length], dtype=float)

@app.post("/api/cough/analyze", response_model=CoughResponse)
def analyze_cough(req: CoughRequest) -> CoughResponse:
    samples = np.array(req.samples, dtype=float)
    feat_vec = extract_features(samples)
    X = feat_vec.reshape(1, -1)
    probs = clf.predict_proba(X)[0]
    label_idx = int(np.argmax(probs))
    info = LABELS.get(label_idx, LABELS[0])

    confidence = int(round(float(probs[label_idx] * 100)))
    # Define a simple 0–100 "AirBand score": higher means more risk
    risk_weight = {0: 0.2, 1: 0.6, 2: 1.0}[label_idx]
    score_raw = (risk_weight * 70) + (feat_vec[1] / 100.0 * 30)  # std contribution
    score = int(max(0, min(100, round(score_raw))))

    features = {
        "mean_intensity": round(float(feat_vec[0]), 2),
        "std_intensity": round(float(feat_vec[1]), 2),
        "max_intensity": round(float(feat_vec[2]), 2),
        "min_intensity": round(float(feat_vec[3]), 2),
        "spike_fraction": round(float(feat_vec[4]), 3),
        "sample_count": int(feat_vec[5]),
        "probabilities": {
            "normal": round(float(probs[0]), 3),
            "irregular": round(float(probs[1]), 3),
            "distress": round(float(probs[2]), 3),
        },
    }

    return CoughResponse(
        status=info["status"],
        message=info["message"],
        confidence=confidence,
        score=score,
        features=features,
    )
