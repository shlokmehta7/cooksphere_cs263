import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Collapse } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Heart icon for like
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; // Message icon for comment

const RecipeCard = ({ recipe }) => {
  const [showComments, setShowComments] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);

  const handleLike = () => {
    // Add your like logic here
    console.log('Liked:', recipe.title);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments); // Toggle comment section
    setShowRecipeDetails(false); // Close recipe details if open
  };

  const handleViewRecipeClick = () => {
    setShowRecipeDetails(!showRecipeDetails); // Toggle recipe details
    setShowComments(false); // Close comments if open
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%', // Ensure all cards have the same width
        margin: '10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Small shadow
        transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition for hover effect
        '&:hover': {
          transform: 'scale(1.05)', // Pop-out effect
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
        },
        display: 'flex',
        flexDirection: 'column',
        height: showRecipeDetails || showComments ? 'auto' : '400px', // Adjust height dynamically
      }}
    >
      {/* Image (3/4th of the card) */}
      <CardMedia
        component="img"
        sx={{
          height: '75%', // 3/4th of the card height
          objectFit: 'cover', // Ensure the image covers the area
          borderTopLeftRadius: '12px', // Rounded corners for the top
          borderTopRightRadius: '12px',
        }}
        image={recipe.image}
        alt={recipe.title}
      />

      {/* Recipe Information (1/4th of the card) */}
      <CardContent
        sx={{
          height: '25%', // 1/4th of the card height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Space out the content
        }}
      >
        {/* Recipe Title and Description */}
        <div>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </div>

        {/* Like and Comment Buttons with Counts */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Like Button with Count */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike} aria-label="like">
              <FavoriteBorderIcon style={{ color: '#6B8E23' }} /> {/* Olive green heart icon */}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {recipe.likes || 0} {/* Display like count (default to 0 if not provided) */}
            </Typography>
          </div>

          {/* Comment Button with Count */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleCommentClick} aria-label="comment">
              <ChatBubbleOutlineIcon style={{ color: '#6B8E23' }} /> {/* Olive green message icon */}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {recipe.comments || 0} {/* Display comment count (default to 0 if not provided) */}
            </Typography>
          </div>

          {/* View Recipe Button */}
          <Button size="small" color="primary" onClick={handleViewRecipeClick}>
            View Recipe
          </Button>
        </div>
      </CardContent>

      {/* Expandable Comment Section */}
      <Collapse in={showComments}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.commentsList?.join('\n') || 'No comments yet.'}
          </Typography>
        </CardContent>
      </Collapse>

      {/* Expandable Recipe Details Section */}
      <Collapse in={showRecipeDetails}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.ingredients}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ marginTop: '16px' }}>
            Instructions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;