import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardMedia } from '@mui/material';

const Upload = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipe.title || !recipe.description || !recipe.ingredients || !recipe.instructions || !recipe.image) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
    console.log('Recipe submitted:', recipe);
    // Add logic to upload the recipe to a backend or database
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        marginTop: '80px', // Adjust for the sticky navbar
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload a Recipe
      </Typography>
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Image Preview */}
          {recipe.imagePreview && (
            <CardMedia
              component="img"
              image={recipe.imagePreview}
              alt="Recipe Preview"
              sx={{
                maxHeight: '200px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          )}

          {/* File Upload */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              padding: '10px',
              border: '2px dashed #6B8E23',
              color: '#6B8E23',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </Button>

          {/* Recipe Title */}
          <TextField
            name="title"
            label="Recipe Title"
            value={recipe.title}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Enter the title of your recipe..."
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
            placeholder="Describe your recipe in a few words..."
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
            Upload Recipe
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Upload;