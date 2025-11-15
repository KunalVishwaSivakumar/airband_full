
# AirBand – Local Prototype Setup Guide

This README explains how to run the **AirBand prototype** (frontend + backend) on your local computer.

---

## ✅ 1. Project Structure

```
AIRBAND_FULL/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── simple_model.pkl
│
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    ├── package.json
    └── vite.config.ts
```

---

## ✅ 2. Backend Setup (FastAPI + Local ML Model)

### **Step 1 — open terminal**
```
cd backend
```

### **Step 2 — install dependencies**
```
pip install -r requirements.txt
```

### **Step 3 — run backend**
```
uvicorn app:app --reload
```

Backend runs at:  
👉 http://127.0.0.1:8000

---

## ✅ 3. Frontend Setup (Vite + React + Tailwind)

### **Step 1**
```
cd frontend
```

### **Step 2**
```
npm install
```

### **Step 3**
```
npm run dev
```

Frontend runs at:  
👉 http://localhost:8080

---

## ✅ 4. How it Works (Current Version)

### ✔ Audio recording + upload  
Frontend sends audio to:
```
POST /api/cough/analyze
```

### ✔ Backend processing  
Backend:
- extracts features (simple)
- uses a local model `simple_model.pkl`
- returns severity, score, confidence

### ✔ Frontend display  
The result appears in:
- **Cough screen**
- **Insights screen**

---

## ⚠ Limitations (For Now)

As requested:
- **Home screen values are static placeholders**  
- They do NOT update dynamically right now  
- Only the cough analysis page shows real results  
- No HuggingFace, no heavy models — only lightweight ML prototype

Dynamic home-page updates can be added later.

---

## 🛠 Troubleshooting

### ❗ Backend unreachable  
Make sure backend is running:
```
uvicorn app:app --reload
```

### ❗ Mic not working  
Use Chrome  
and ensure you're on:
```
http://localhost:8080
```

### ❗ Errors in frontend  
Run:
```
npm install
npm run dev
```


