import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Card } from '@mui/material';
import { useRouter } from 'next/router';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }
    console.log('Signup submitted:', { name, email, password });
    // Add logic to handle signup (e.g., Firebase Authentication)
    router.push('/'); // Redirect to homepage after signup
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f5f5f5', // Light background color
        marginBottom: '120px',
        marginTop: '55px'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          backgroundColor: '#ffffff', // White background for the card
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Name Field */}
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            placeholder="Enter your name..."
          />

          {/* Email Field */}
          <TextField
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            placeholder="Enter your email..."
          />

          {/* Password Field */}
          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            placeholder="Enter your password..."
          />

          {/* Password Field */}
          <TextField
            name="password"
            label="Confirm Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            placeholder="Enter your password again..."
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#6B8E23',
              '&:hover': {
                backgroundColor: '#5a7c1f',
              },
            }}
          >
            Sign Up
          </Button>

          {/* Login Link */}
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link href="/login" color="primary">
              Log in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Signup;