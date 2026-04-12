import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import LaborwerteListe from "./pages/LaborwerteListe";
import LaborwertDetail from "./pages/LaborwertDetail";
import SupplementsListe from "./pages/SupplementsListe";
import SupplementDetail from "./pages/SupplementDetail";
import KrankheitenListe from "./pages/KrankheitenListe";
import KrankheitDetail from "./pages/KrankheitDetail";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/laborwerte" element={<LaborwerteListe />} />
        <Route path="/laborwerte/:code" element={<LaborwertDetail />} />
        <Route path="/supplements" element={<SupplementsListe />} />
        <Route path="/supplements/:slug" element={<SupplementDetail />} />
        <Route path="/krankheiten" element={<KrankheitenListe />} />
        <Route path="/krankheiten/:slug" element={<KrankheitDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: "32px", marginBottom: "16px" }}>
        Seite nicht gefunden
      </h2>
      <p style={{ color: "var(--text-light)", marginBottom: "24px" }}>
        Diese Seite gibt es (noch) nicht.
      </p>
      <a href="/" style={{ color: "var(--primary)", fontWeight: "600" }}>
        → Zurück zur Startseite
      </a>
    </div>
  );
}
