import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

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
          maxWidth: 600,
          padding: 4,
          borderRadius: 2,
          bgcolor: "white",
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
            <Typography variant="h4" gutterBottom align="center">
              Book Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="body1">
                <strong>ID:</strong> {book._id || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Title:</strong> {book.title || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Author:</strong> {book.author || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Publish Year:</strong> {book.publishYear || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Created At:</strong>{" "}
                {book.createdAt ? new Date(book.createdAt).toLocaleString() : "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Last Updated At:</strong>{" "}
                {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ShowBook;
