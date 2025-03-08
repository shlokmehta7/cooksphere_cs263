import React, { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardMedia } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Upload = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({ ...recipe, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to upload a recipe.");
      return;
    }

    const recipeData = {
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.imagePreview,
      userId: currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "recipes"), recipeData);
      console.log("Recipe added with ID:", docRef.id);
      router.push("/"); 
    } catch (error) {
      console.error("Failed to upload recipe:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '80px', marginBottom: '120px' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }} // Apply Poppins font
      >
        Upload a Recipe
      </Typography>
      <Card sx={{ width: '100%', maxWidth: '600px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Image Upload Section */}
          <Box
            sx={{
              border: '2px dashed #6B8E23',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: '#6B8E23',
                  color: '#fff',
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                  '&:hover': {
                    backgroundColor: '#5a7c1f',
                  },
                }}
              >
                Upload Image
              </Button>
            </label>
            {recipe.imagePreview && (
              <CardMedia
                component="img"
                image={recipe.imagePreview}
                alt="Recipe Preview"
                sx={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }}
              />
            )}
          </Box>

          {/* Recipe Title */}
          <TextField
            name="title"
            label="Recipe Title"
            value={recipe.title}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              style: { fontFamily: "'Poppins', sans-serif" }, // Apply Poppins font
            }}
          />

          {/* Recipe Description */}
          <TextField
            name="description"
            label="Recipe Description"
            value={recipe.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
            InputProps={{
              style: { fontFamily: "'Poppins', sans-serif" }, // Apply Poppins font
            }}
          />

          {/* Ingredients */}
          <TextField
            name="ingredients"
            label="Ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            fullWidth
            multiline
            rows={5}
            required
            placeholder="List ingredients separated by commas..."
            InputProps={{
              style: { fontFamily: "'Poppins', sans-serif" }, // Apply Poppins font
            }}
          />

          {/* Instructions */}
          <TextField
            name="instructions"
            label="Instructions"
            value={recipe.instructions}
            onChange={handleChange}
            fullWidth
            multiline
            rows={5}
            required
            placeholder="Write step-by-step instructions..."
            InputProps={{
              style: { fontFamily: "'Poppins', sans-serif" }, // Apply Poppins font
            }}
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
              fontFamily: "'Poppins', sans-serif", // Apply Poppins font
              '&:hover': {
                backgroundColor: '#5a7c1f',
              },
            }}
          >
            Upload Recipe
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Upload;