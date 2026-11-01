import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Main";
import Home from "./Layout/Home/Home";
import About from "./Layout/About/About";
import Services from "./Layout/Services/Services";
import Contact from "./Layout/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
