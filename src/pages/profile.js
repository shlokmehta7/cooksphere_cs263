import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Profile.module.css";
import { db } from "./firebase";
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUsername(userData.username);
            setProfilePicture(userData.profilePicture);
          }

          const recipesRef = collection(db, "recipes");
          const recipesQuery = query(recipesRef, where("userId", "==", currentUser.uid));
          const recipesSnapshot = await getDocs(recipesQuery);
          const recipes = recipesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecipes(recipes);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", currentUser.uid));
        getDocs(q).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            updateDoc(userDoc.ref, { profilePicture: reader.result });
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.profile}>
      {/* Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
          id="profile-picture-upload"
        />
        <label htmlFor="profile-picture-upload">
          <IconButton component="span">
            <Avatar
              src={profilePicture}
              alt={username}
              sx={{ width: 150, height: 150, marginBottom: "20px" }}
            />
          </IconButton>
        </label>
        <Typography variant="h4" gutterBottom>
          {username}
        </Typography>
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* Uploaded Recipes Section */}
      <Typography variant="h5" gutterBottom>
        Your Recipes
      </Typography>
      <Box className={styles.recipeGrid}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <Typography variant="body1">No recipes found.</Typography>
        )}
      </Box>
    </div>
  );
};

export default Profile;