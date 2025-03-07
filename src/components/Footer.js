import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#6B8E23',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        position: 'fixed',
        bottom: isVisible ? 0 : '-100px', 
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'bottom 0.3s ease-in-out',
        fontFamily: "'Poppins', sans-serif", // Apply Poppins font
      }}
    >
      <Typography variant="body1">
        &copy; 2025 CookSphere. All rights reserved.
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <IconButton href="https://facebook.com" target="_blank" style={{ color: '#fff' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" style={{ color: '#fff' }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" style={{ color: '#fff' }}>
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;