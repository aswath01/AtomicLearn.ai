import React from 'react';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import TeacherFeatures from './components/TeacherFeatures.jsx';
import StudentFeatures from './components/StudentFeatures.jsx';

import WhyAtomicLearn from './components/WhyAtomicLearn.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Navbar />
        <main>
          <HeroSection />
          <TeacherFeatures />
          <StudentFeatures />
          <WhyAtomicLearn />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
