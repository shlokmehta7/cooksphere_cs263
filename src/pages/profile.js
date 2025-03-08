import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, IconButton, Card, CardContent, TextField } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

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

  const handleUsernameUpdate = async () => {
    if (newUsername.trim() === "") return;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(userDoc.ref, { username: newUsername.trim() });
        setUsername(newUsername.trim());
        setIsEditingUsername(false);
      }
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5dc", 
        minHeight: "100vh",
        marginTop: "80px", 
        marginBottom: "120px", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          backgroundColor: "#ffffff",
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
            <EditIcon
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#6B8E23",
                color: "#fff",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
          </IconButton>
        </label>

        {isEditingUsername ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <TextField
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              size="small"
              InputProps={{
                style: { fontFamily: "'Poppins', sans-serif" }, 
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUsernameUpdate}
              sx={{ backgroundColor: "#6B8E23", fontFamily: "'Poppins', sans-serif", "&:hover": { backgroundColor: "#5a7c1f" } }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditingUsername(false)}
              sx={{ fontFamily: "'Poppins', sans-serif" }} 
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
              {username}
            </Typography>
            <IconButton onClick={() => setIsEditingUsername(true)}>
              <EditIcon sx={{ color: "#6B8E23" }} />
            </IconButton>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          sx={{ backgroundColor: "#6B8E23", fontFamily: "'Poppins', sans-serif", "&:hover": { backgroundColor: "#5a7c1f" } }}
        >
          Logout
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBottom: "20px", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
        Your Recipes
      </Typography>
      <Box className={styles.recipeGrid}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif" }}>
            No recipes found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Profile;