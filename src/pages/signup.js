
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Card } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const Signup = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("Username is already taken");
      return;
    }

    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username,
        email,
        profilePicture: null, 
      });

      router.push("/"); 
    } catch (error) {
      setError("Failed to sign up: " + error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: '100%', maxWidth: '400px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', backgroundColor: '#ffffff' }}>
        <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Username Field */}
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
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
          />

          {/* Confirm Password Field */}
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
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
            Already have an account? <Link href="/login" color="primary">Log in</Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Signup;