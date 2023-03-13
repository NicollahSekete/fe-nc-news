import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="App">
      <Header />
      <Articles />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
