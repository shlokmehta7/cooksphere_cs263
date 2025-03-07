import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Card } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/"); // Redirect to home page after successful login
    } catch (error) {
      setError("Failed to log in: " + error.message); // Display error message
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5dc", // Beige background
        marginTop: "80px", // Add margin to avoid navbar overlap
        marginBottom: "120px", // Add margin to avoid footer overlap
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Title */}
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {/* Login Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
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

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#6B8E23",
              "&:hover": {
                backgroundColor: "#5a7c1f",
              },
            }}
          >
            Login
          </Button>

          {/* Signup Link */}
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link href="/signup" color="primary">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;