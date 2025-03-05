import React from 'react';
import { Router } from 'next/router';
import Welcome from './welcome'; // Import the Welcome Page
import Home from './index'; // Import the Homepage
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;