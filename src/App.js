import "./styles.css";
import "./mobStyles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Home from "./Pages/Home";
import Project from "./Pages/Project";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  AOS.init();
  return (
    <Router>
      <div className="BodyContainer">
        <Header />
        <Routes>
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
