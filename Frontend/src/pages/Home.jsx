import React from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default HomePage;
