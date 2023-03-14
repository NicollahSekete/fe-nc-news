import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { useState } from "react"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Articles" element={<Articles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
