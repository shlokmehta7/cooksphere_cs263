import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Typography, Button, Box } from "@mui/material";
import styles from "../styles/Home.module.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleExploreClick = () => {
    const featuredRecipesSection = document.getElementById("featured-recipes");
    if (featuredRecipesSection) {
      featuredRecipesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/images/hero.jpg')", // Add a background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff", // Default text color (white)
          padding: "20px",
        }}
      >
        {/* Welcome to CookSphere */}
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            color: "#6B8E23", // Olive green color
          }}
        >
          Welcome to CookSphere
        </Typography>

        {/* Discover delicious recipes from around the world */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            marginBottom: "20px",
            color: "#6B8E23", // Olive green color
          }}
        >
          Discover delicious recipes from around the world
        </Typography>

        {/* Explore Recipes Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleExploreClick}
          sx={{
            backgroundColor: "#6B8E23",
            "&:hover": { backgroundColor: "#5a7c1f" },
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.2rem",
            padding: "10px 30px",
          }}
        >
          Explore Recipes
        </Button>
      </Box>

      {/* Featured Recipes Section */}
      <Box id="featured-recipes" className={styles.container} sx={{ padding: "40px 20px" }}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            marginTop: "40px",
            marginBottom: "40px",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Featured Recipes
        </Typography>
        <div className={styles.recipeGrid}>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <Typography variant="body1">No recipes found.</Typography>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Home;