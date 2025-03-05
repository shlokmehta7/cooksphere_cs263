import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  // Hardcoded profile data
  const profile = {
    name: 'John Doe',
    profilePicture: '/images/profile-pic.jpg', // Add a profile picture
    followers: 120,
    followings: 85,
    recipesPosted: 10,
  };

  // Hardcoded saved recipes data
  const savedRecipes = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      description: 'Creamy Italian pasta dish with eggs, cheese, and bacon.',
      image: '/images/pasta.jpg',
      likes: 12,
      comments: 5,
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      description: 'Spicy and creamy Indian chicken curry.',
      image: '/images/chicken-tikka.jpg',
      likes: 8,
      comments: 3,
    },
  ];

  // Hardcoded posted recipes data
  const postedRecipes = [
    {
      id: 3,
      title: 'Chocolate Cake',
      description: 'Rich and decadent chocolate cake.',
      image: '/images/chocolate-cake.jpg',
      likes: 15,
      comments: 7,
    },
    {
      id: 4,
      title: 'Vegetable Stir Fry',
      description: 'Healthy and colorful vegetable stir fry.',
      image: '/images/stir-fry.jpg',
      likes: 6,
      comments: 2,
    },
  ];

  return (
    <div className={styles.profile}>
      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '40px',
        }}
      >
        <Avatar
          src={profile.profilePicture}
          alt={profile.name}
          sx={{ width: 120, height: 120, marginBottom: '20px' }}
        />
        <Typography variant="h4" gutterBottom>
          {profile.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '400px',
            marginBottom: '20px',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{profile.followers}</Typography>
            <Typography variant="body2" color="text.secondary">
              Followers
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{profile.followings}</Typography>
            <Typography variant="body2" color="text.secondary">
              Following
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{profile.recipesPosted}</Typography>
            <Typography variant="body2" color="text.secondary">
              Recipes
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
      </Box>

      {/* Saved Recipes Section */}
      <Typography variant="h5" gutterBottom>
        Saved Recipes
      </Typography>
      <Box className={styles.recipeGrid}>
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>

      {/* Posted Recipes Section */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        Posted Recipes
      </Typography>
      <Box className={styles.recipeGrid}>
        {postedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </div>
  );
};

export default Profile;