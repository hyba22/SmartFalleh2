import './App.css'
//import UpdatePage from './components/admin dashboard/admin settings/UpdatePage'
import Accueil from './components/home pages/Accueil'
import Contact from './components/home pages/Contact'
import About from './components/home pages/About'
import Navbar from './components/navbar/Navbar'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react';
import { scroller } from 'react-scroll';
import Footer from './components/footer/Footer'
import Profile from './components/profiles/Profile'

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -100,
          duration: 500
        });
      }, 0);
    }
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Accueil />
              <About />
              <Contact />
              <Footer />
            </>
          } />

          <Route path="/profile" element={<Profile />} />

        </Routes>
        {/*<UpdatePage />*/}
      </div>
    </Router>
  )
}

export default App
