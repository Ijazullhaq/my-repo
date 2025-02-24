import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console for details.");
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        position: "relative",
      }}
    >
      {/* Back to Home Button positioned in the top-right corner */}
   {/* Back to Home Button positioned in the top-left corner */}
<Button
  variant="outlined"
  color="secondary"
  onClick={() => navigate("/")}
  sx={{
    position: "absolute",
    top: 16,
    left: 16, // Changed from 'right' to 'left'
  }}
>
  Back to Home
</Button>


      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Book
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            label="Publish Year"
            variant="outlined"
            fullWidth
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveBook}
            disabled={loading}
          >
            Save Book
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateBooks;
