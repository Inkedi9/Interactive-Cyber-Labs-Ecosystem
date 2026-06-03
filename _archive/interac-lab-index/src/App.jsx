import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LabDetailPage from "./pages/LabDetailPage";
import MiniLabITPage from "./pages/MiniLabITPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/labs/mini-lab-it" element={<MiniLabITPage />} />
      <Route path="/labs/:labId" element={<LabDetailPage />} />
    </Routes>
  );
}