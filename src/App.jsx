import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import TeacherFeatures from './components/TeacherFeatures.jsx';
import StudentFeatures from './components/StudentFeatures.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';
import TeacherDemo from './pages/TeacherDemo.jsx';
import StudentDemo from './pages/StudentDemo.jsx';

// Layout component to control Navbar/Footer visibility
const Layout = () => {
  const location = useLocation();
  const isDemoPage = location.pathname.includes('/teacher-demo') || location.pathname.includes('/student-demo');

  return (
    <div className="app">
      {!isDemoPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <TeacherFeatures />
              <StudentFeatures />
              <HowItWorks />
            </>
          } />
          <Route path="/teacher-demo" element={<TeacherDemo />} />
          <Route path="/student-demo" element={<StudentDemo />} />
        </Routes>
      </main>
      {!isDemoPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout />
      </Router>
    </LanguageProvider>
  );
}

export default App;
