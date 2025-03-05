import React from 'react';
import { Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../styles/Welcome.module.css';

const Welcome = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/'); // Redirect to the homepage
  };

  return (
    <div className={styles.welcome}>
      <div className={styles.overlay}>
        <Typography variant="h2" gutterBottom style={{ color: '#fff', fontWeight: 'bold' }}>
          Welcome to CookSphere
        </Typography>
        <Typography variant="h5" style={{ color: '#fff', marginBottom: '40px' }}>
          Discover, share, and enjoy delicious recipes from around the world.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleExploreClick}
          style={{ backgroundColor: '#6B8E23', color: '#fff', fontSize: '18px', padding: '12px 24px' }}
        >
          Explore Featured Recipes
        </Button>
      </div>
    </div>
  );
};

export default Welcome;

