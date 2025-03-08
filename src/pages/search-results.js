import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/Home.module.css"; // Import the same styles as the homepage

const SearchResults = ({ results }) => {
  const recipes = JSON.parse(results);

  return (
    <div className={styles.home}>
      {/* Featured Recipes Section */}
      <Box className={styles.container} sx={{ padding: "40px 20px" }}>
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
          Searched Results
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

export async function getServerSideProps(context) {
  const { results } = context.query;
  return {
    props: {
      results,
    },
  };
}

export default SearchResults;