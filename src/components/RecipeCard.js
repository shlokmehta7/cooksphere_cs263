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
import FavoriteIcon from "@mui/icons-material/Favorite";
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
  const [isLiked, setIsLiked] = useState(false); 

  const {
    title = "Untitled Recipe",
    description = "No description available.",
    image = "/images/default-recipe.jpg",
    ingredients = "", 
    instructions = "", 
    likedBy = [], 
  } = recipe;

  
  useEffect(() => {
    if (currentUser && likedBy.includes(currentUser.uid)) {
      setIsLiked(true);
    }
  }, [currentUser, likedBy]);

  const handleLike = async () => {
    if (!currentUser) return; 

    const recipeRef = doc(db, "recipes", recipe.id);

    try {
      if (isLiked) {
        await updateDoc(recipeRef, {
          likes: likes - 1,
          likedBy: arrayRemove(currentUser.uid),
        });
        setLikes(likes - 1);
      } else {
        await updateDoc(recipeRef, {
          likes: likes + 1,
          likedBy: arrayUnion(currentUser.uid),
        });
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked); 
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
      <Card
        sx={{
          width: "100%", 
          height: "100%", 
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
        <CardMedia
          component="img"
          sx={{
            height: "75%",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
          image={image}
          alt={title}
        />

        <CardContent
          sx={{
            height: "25%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleLike} aria-label="like">
                {isLiked ? (
                  <FavoriteIcon style={{ color: "#6B8E23" }} /> 
                ) : (
                  <FavoriteBorderIcon style={{ color: "#6B8E23" }} /> 
                )}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likes} 
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleViewCommentsClick} aria-label="comment">
                <ChatBubbleOutlineIcon style={{ color: "#6B8E23" }} />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {comments.length} 
              </Typography>
            </div>

            <Button size="small" color="primary" onClick={handleViewRecipeClick}>
              View Recipe
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {ingredients ? (
              ingredients.split(",").map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${ingredient.trim()}`} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No ingredients listed.</Typography>
            )}
          </List>

          <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }}>
            Instructions
          </Typography>
          <List>
            {instructions ? (
              instructions.split("\n").map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${instruction.trim()}`} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No instructions listed.</Typography>
            )}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={showComments} onClose={handleCloseComments} maxWidth="md" fullWidth>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
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