import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'; 

const app = express();


// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Modleware for handling CORS POLICY
// option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//option 2: Allow custom origins

// app.use(
//   cors({
//     origin:'http://localhost:3000',
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: [Content-Type],
//   })
// )



// Welcome route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to the MERN stack");
});

app.use('/books', booksRoute);

// Database connection and server setup
mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to the Database");
    app.listen(PORT, () => {
      console.log(`APP IS LISTENING ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    
    console.log("Error connecting to the database:", error.message);
  });
