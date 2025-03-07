import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Image from "next/image";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadIcon from "@mui/icons-material/Upload";
import LogoutIcon from "@mui/icons-material/Logout"; // Import Logout icon
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Destructure logout from useAuth

  return (
    <AppBar
      position="fixed"
      style={{
        background: "linear-gradient(90deg, #6B8E23, #8AA63A)",
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Poppins', sans-serif", // Apply Poppins font
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Link href="/" passHref>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              className="logo-hover" // Apply hover effect
            >
              <Image
                src="/images/CookSphereLogo.png"
                alt="CookSphere Logo"
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>

        {/* Search Bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 20px",
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
              style: { backgroundColor: "#fff", borderRadius: "20px" },
            }}
            style={{ maxWidth: "500px", marginRight: "10px" }}
          />
          <IconButton
            onClick={() => console.log("Search")}
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <SearchIcon style={{ color: "#6B8E23" }} />
          </IconButton>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Home Button */}
          <Button
            color="inherit"
            component={Link}
            href="/"
            startIcon={<HomeIcon />}
            style={{
              textTransform: "none",
              margin: "0 10px",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif", // Apply Poppins font
            }}
          >
            Home
          </Button>

          {/* Upload Button */}
          <Button
            color="inherit"
            component={Link}
            href="/upload"
            startIcon={<UploadIcon />}
            style={{
              textTransform: "none",
              margin: "0 10px",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif", // Apply Poppins font
            }}
          >
            Upload
          </Button>

          {/* Conditional Rendering for Login/Signup or Logout */}
          {currentUser ? (
            <>
              {/* Profile Button */}
              <Button
                color="inherit"
                component={Link}
                href="/profile"
                startIcon={<AccountCircleIcon />}
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                }}
              >
                Profile
              </Button>

              {/* Logout Button */}
              <Button
                color="inherit"
                onClick={logout} // Call logout function
                startIcon={<LogoutIcon />}
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Button
                color="inherit"
                component={Link}
                href="/login"
                startIcon={<LoginIcon />}
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                }}
              >
                Login
              </Button>

              {/* Signup Button */}
              <Button
                color="inherit"
                component={Link}
                href="/signup"
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;