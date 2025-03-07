import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart icon for liked state
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const RecipeCard = ({ recipe }) => {
  const { currentUser } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(recipe.likes || 0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false); // Track if the current user has liked the recipe

  // Check if the current user has already liked the recipe
  useEffect(() => {
    if (currentUser && recipe.likedBy?.includes(currentUser.uid)) {
      setIsLiked(true);
    }
  }, [currentUser, recipe.likedBy]);

  const handleLike = async () => {
    if (!currentUser) return; // Ensure the user is logged in

    const recipeRef = doc(db, "recipes", recipe.id);

    try {
      if (isLiked) {
        // If already liked, remove the like
        await updateDoc(recipeRef, {
          likes: likes - 1,
          likedBy: arrayRemove(currentUser.uid),
        });
        setLikes(likes - 1);
      } else {
        // If not liked, add the like
        await updateDoc(recipeRef, {
          likes: likes + 1,
          likedBy: arrayUnion(currentUser.uid),
        });
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked); // Toggle the liked state
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  const handleViewRecipeClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleViewCommentsClick = async () => {
    setShowComments(true);
    const commentsRef = collection(db, `recipes/${recipe.id}/comments`);
    const querySnapshot = await getDocs(commentsRef);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(comments);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleAddComment = async () => {
    if (!currentUser || !newComment.trim()) return;

    try {
      const commentsRef = collection(db, `recipes/${recipe.id}/comments`);
      await addDoc(commentsRef, {
        userId: currentUser.uid,
        username: currentUser.displayName || "Anonymous",
        comment: newComment.trim(),
        timestamp: new Date(),
      });

      const querySnapshot = await getDocs(commentsRef);
      const updatedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <>
      {/* Recipe Card */}
      <Card
        sx={{
          width: "100%", // Ensure the card takes up the full width of its grid cell
          height: "100%", // Ensure the card takes up the full height of its grid cell
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image (3/4th of the card) */}
        <CardMedia
          component="img"
          sx={{
            height: "75%",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
          image={recipe.image}
          alt={recipe.title}
        />

        {/* Recipe Information (1/4th of the card) */}
        <CardContent
          sx={{
            height: "25%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Like Button with Count */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleLike} aria-label="like">
                {isLiked ? (
                  <FavoriteIcon style={{ color: "#6B8E23" }} /> // Filled heart for liked state
                ) : (
                  <FavoriteBorderIcon style={{ color: "#6B8E23" }} /> // Outline heart for unliked state
                )}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likes} {/* Display like count */}
              </Typography>
            </div>

            {/* Comment Button with Count */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleViewCommentsClick} aria-label="comment">
                <ChatBubbleOutlineIcon style={{ color: "#6B8E23" }} />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {comments.length} {/* Display comment count */}
              </Typography>
            </div>

            {/* View Recipe Button */}
            <Button size="small" color="primary" onClick={handleViewRecipeClick}>
              View Recipe
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Details Modal */}
      <Dialog open={showDetails} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle>{recipe.title}</DialogTitle>
        <DialogContent>
          {/* Ingredients */}
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.split(",").map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${ingredient.trim()}`} />
              </ListItem>
            ))}
          </List>

          {/* Instructions */}
          <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }}>
            Instructions
          </Typography>
          <List>
            {recipe.instructions.split("\n").map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${instruction.trim()}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* Comments Modal */}
      <Dialog open={showComments} onClose={handleCloseComments} maxWidth="md" fullWidth>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {/* Add Comment Section */}
          {currentUser && (
            <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleAddComment}>
                Post
              </Button>
            </Box>
          )}

          {/* Comments List */}
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemText
                  primary={comment.username}
                  secondary={comment.comment}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeCard;