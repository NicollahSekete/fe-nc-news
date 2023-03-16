import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import LandingPage from './components/LandingPage';
import Topics from './components/Topics';
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
        <Route path="/Topics" element={<Topics />} />
        <Route path="/Articles?topic=:topic" element={<Articles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
