import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to check if the user has scrolled to the bottom
  const checkScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setIsVisible(true); // Show footer when scrolled to the bottom
    } else {
      setIsVisible(false); // Hide footer otherwise
    }
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll); // Cleanup
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#6B8E23',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        position: 'fixed', // Make the footer fixed
        bottom: isVisible ? 0 : '-100px', // Show/hide based on scroll
        left: 0, // Span the full width
        right: 0, // Span the full width
        zIndex: 1000, // Ensure it stays above other content
        transition: 'bottom 0.3s ease-in-out', // Smooth transition
      }}
    >
      <Typography variant="body1">
        &copy; 2025 CookSphere. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;