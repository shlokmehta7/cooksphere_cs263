import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import LoginIcon from '@mui/icons-material/Login'; // Login icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile icon
import UploadIcon from '@mui/icons-material/Upload'; // Upload icon

const Navbar = () => {
  const handleSearch = () => {
    // Add your search logic here
    console.log('Search button clicked!');
  };

  return (
    <AppBar
      position="fixed" // Make the navbar sticky
      style={{
        background: 'linear-gradient(90deg, #6B8E23, #8AA63A)', // Gradient background
        width: '100%', // Ensure the navbar spans the full width
        zIndex: 1000, // Ensure the navbar stays above other content
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
      }}
    >
      <Toolbar>
        {/* Logo with Hover Effect */}
        <Link href="/" passHref>
          <div
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginRight: 'auto', // Pushes the logo to the left
            }}
          >
            <div
              style={{
                width: '80px', // Adjust size as needed
                height: '80px', // Adjust size as needed
                borderRadius: '50%', // Make it circular
                overflow: 'hidden', // Ensure the image stays within the circle
                transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition for hover effect
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Small shadow
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'; // Pop-out effect
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; // Enhanced shadow on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Reset on mouse leave
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Reset shadow
              }}
            >
              <Image
                src="/images/CookSphereLogo.png"
                alt="CookSphere Logo"
                width={80} // Adjust to match the container size
                height={80} // Adjust to match the container size
                style={{
                  objectFit: 'cover', // Ensure the image covers the circular area
                }}
              />
            </div>
          </div>
        </Link>

        {/* Centered Search Bar with Search Button */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 20px', // Add some spacing
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search recipes..."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                backgroundColor: '#fff', // White background for the search bar
                borderRadius: '20px', // Rounded corners
              },
            }}
            style={{
              maxWidth: '500px', // Limit the width of the search bar
              marginRight: '10px', // Add spacing between search bar and button
            }}
          />
          {/* Search Button */}
          <IconButton
            onClick={handleSearch}
            style={{
              backgroundColor: '#fff', // White background for the button
              borderRadius: '20px', // Rounded corners
              padding: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Small shadow
            }}
          >
            <SearchIcon style={{ color: '#6B8E23' }} /> {/* Olive green icon */}
          </IconButton>
        </div>

        {/* Navigation Buttons on the Right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          {/* Home Button */}
          <Button
            color="inherit"
            component={Link}
            href="/"
            startIcon={<HomeIcon />} // Home icon
            style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }} // Prevent uppercase text
          >
            Home
          </Button>

          {/* Upload Button */}
          <Button
            color="inherit"
            component={Link}
            href="/upload"
            startIcon={<UploadIcon />} // Upload icon
            style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }} // Prevent uppercase text
          >
            Upload
          </Button>

          {/* Login Button */}
          <Button
            color="inherit"
            component={Link}
            href="/login"
            startIcon={<LoginIcon />} // Login icon
            style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }} // Prevent uppercase text
          >
            Login
          </Button>

          {/* Profile Button */}
          <Button
            color="inherit"
            component={Link}
            href="/profile"
            startIcon={<AccountCircleIcon />} // Profile icon
            style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }} // Prevent uppercase text
          >
            Profile
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;