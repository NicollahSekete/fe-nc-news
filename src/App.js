import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import LandingPage from './components/LandingPage';
import Comments from './components/Comments';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Article/:article_id" element={<Article />} />
        <Route path="/Comments/:article_id" element={<Comments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
