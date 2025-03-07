import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Typography } from "@mui/material";
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

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <Typography variant="h3" gutterBottom align="center" style={{ marginTop: '40px' }}>
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
      </div>
    </div>
  );
};

export default Home;