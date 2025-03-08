import React, { useState } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";
import { useRouter } from "next/router";
import ChatGptModal from "../components/ChatGptModal";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isGptModalOpen, setIsGptModalOpen] = useState(false);
  const router = useRouter();

  const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  const handleGptClick = () => {
    setIsGptModalOpen(true);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const recipesRef = collection(db, "recipes");
      const q = query(recipesRef, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
      const querySnapshot = await getDocs(q);
      const firestoreRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const spoonacularResponse = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            query: searchQuery,
            number: 10,
          },
        }
      );
      const spoonacularRecipes = spoonacularResponse.data.results;

      const allRecipes = [...firestoreRecipes, ...spoonacularRecipes];

      router.push({
        pathname: "/search-results",
        query: { results: JSON.stringify(allRecipes) },
      });
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          background: "linear-gradient(90deg, #6B8E23, #8AA63A)",
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Toolbar>
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
                className="logo-hover"
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
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
              onClick={handleSearch}
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

          <IconButton
            onClick={handleGptClick}
            style={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              margin: "0 10px",
              padding: "0",
              width: "40px", 
              height: "40px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              src="/images/chatgptlogo.png"
              alt="GPT Logo"
              width={40} 
              height={40} 
              style={{ objectFit: "cover", borderRadius: "50%" }} 
            />
          </IconButton>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              href="/"
              startIcon={<HomeIcon />}
              style={{
                textTransform: "none",
                margin: "0 10px",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              component={Link}
              href="/upload"
              startIcon={<UploadIcon />}
              style={{
                textTransform: "none",
                margin: "0 10px",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Upload
            </Button>

            {currentUser ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  href="/profile"
                  startIcon={<AccountCircleIcon />}
                  style={{
                    textTransform: "none",
                    margin: "0 10px",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Profile
                </Button>

                <Button
                  color="inherit"
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                  style={{
                    textTransform: "none",
                    margin: "0 10px",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  href="/login"
                  startIcon={<LoginIcon />}
                  style={{
                    textTransform: "none",
                    margin: "0 10px",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Login
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  href="/signup"
                  style={{
                    textTransform: "none",
                    margin: "0 10px",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <ChatGptModal open={isGptModalOpen} onClose={() => setIsGptModalOpen(false)} />
    </>
  );
};

export default Navbar;