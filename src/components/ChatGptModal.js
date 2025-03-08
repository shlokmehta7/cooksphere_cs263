import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography, CircularProgress, Box } from "@mui/material";
import { OpenAI } from "openai";

const ChatGptModal = ({ open, onClose }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true, 
      });

      const prompt = `I have the following ingredients: ${input}. Suggest recipes I can make with these ingredients and provide nutritional facts for each recipe.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setResponse("Failed to fetch response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
        ChatGPT Recipe Assistant
      </DialogTitle>
      <DialogContent>

        <TextField
          fullWidth
          placeholder="Type the ingredients you have..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
          rows={4}
          sx={{ marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}
        />


        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#6B8E23",
            "&:hover": { backgroundColor: "#5a7c1f" },
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Get Recipes"}
        </Button>


        {response && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif", whiteSpace: "pre-wrap" }}>
              {response}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatGptModal;