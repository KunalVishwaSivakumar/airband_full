import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoughAnalyzer from "./pages/CoughAnalyzer";
import BreathingRhythm from "./pages/BreathingRhythm";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Home /><Navigation /></>} />
          <Route path="/cough" element={<><CoughAnalyzer /><Navigation /></>} />
          <Route path="/breathing" element={<><BreathingRhythm /><Navigation /></>} />
          <Route path="/insights" element={<><Insights /><Navigation /></>} />
          <Route path="/settings" element={<><Settings /><Navigation /></>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
