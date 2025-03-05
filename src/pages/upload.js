import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardMedia } from '@mui/material';

const Upload = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: null,
    imagePreview: null, // For image preview
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
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
        marginBottom: '120px', // Add margin for the footer
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
          {/* Image Upload Section */}
          <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
                  '&:hover': {
                    backgroundColor: '#5a7c1f',
                  },
                }}
              >
                Browse or Drag & Drop Image
              </Button>
            </label>
            {recipe.imagePreview && (
              <Typography variant="body2" sx={{ marginTop: '10px' }}>
                Selected file: {recipe.image.name}
              </Typography>
            )}
          </Box>

          {/* Image Preview */}
          {recipe.imagePreview && (
            <CardMedia
              component="img"
              image={recipe.imagePreview}
              alt="Recipe Preview"
              sx={{
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          )}

          {/* Recipe Title */}
          <TextField
            name="title"
            label="Recipe Title"
            value={recipe.title}
            onChange={handleChange}
            fullWidth
            required
            placeholder="Enter the recipe title..."
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
            placeholder="Describe the recipe..."
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