import './App.css'

import Header from "./Components/Header";
import HomePageSection from './Components/HomePageSection'
import EmployeeDetailsSection from './Components/EmployeeDetailsSection'
import AddandUpdateEmployeeSection from './Components/AddandUpdateEmployeeSection'
import Footer from "./Components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Header />
        <div className="flex-grow-1" style={{ paddingTop: "70px" }}>
          <Routes>
            <Route path="/" element={<HomePageSection />} />
            <Route path="/employees" element={<EmployeeDetailsSection />} />
            <Route path="/add-employee" element={<AddandUpdateEmployeeSection />} />
            <Route path="/edit-employee/:id" element={<AddandUpdateEmployeeSection />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
