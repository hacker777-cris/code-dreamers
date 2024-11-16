import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InvoiceGenerator from "./Products/InvoiceGenerator";
import EnhancedLandingPage from "./components/LandingPage";
import "./index.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/"></Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<EnhancedLandingPage />} />
        <Route path="/Invoice-generator" element={<InvoiceGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
