import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        if (response.data && response.data.data) {
          setBooks(response.data.data);
        } else {
          console.error("Invalid API response:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ padding: 4, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Books List of main
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/books/create"
        >
          Add Book
        </Button>
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Book Table with Scrollbar */}
          <TableContainer
            component={Paper}
            sx={{
              mb: 4,
              maxHeight: 400, // Height for the table container
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Author
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Publish Year
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Operations
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.length ? (
                  books.map((book, index) => (
                    <TableRow key={book._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.publishYear}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            component={Link}
                            to={`/books/details/${book._id}`}
                          >
                            <InfoIcon />
                          </Button>
                          <Button
                            variant="outlined"
                            color="warning"
                            size="small"
                            component={Link}
                            to={`/books/edit/${book._id}`}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            component={Link}
                            to={`/books/delete/${book._id}`}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No books available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Additional Project Features */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Feature Highlight
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Showcase your book collection with detailed insights, edit
                    features, and responsive design for any device.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Easy Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add, edit, or delete book entries effortlessly with a
                    user-friendly interface powered by Material-UI.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Home;
