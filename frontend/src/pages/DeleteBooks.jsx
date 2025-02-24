import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
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
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginBottom: 2 }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Delete Book
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Are you sure you want to delete this book? This action cannot be
              undone.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: 4,
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteBook}
              >
                Yes, Delete it
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default DeleteBooks;
