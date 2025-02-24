import express from 'express';
import { Book } from '../models/bookmodel.js';


const router = express.Router();

// Route for save a new book
router.post("/", async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const book = await Book.create({ title, author, publishYear });

        return response.status(201).json({ message: 'Book added successfully', data: book });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get all books from database
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Get a single book by ID from database
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a book by ID
router.put("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, auther, publishYear",
            });
        }

        const result = await Book.findByIdAndUpdate(
            id,
            { title, author, publishYear },
            { new: true } // Return the updated document
        );

        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).send({ message: "Book updated successfully", result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).send({ message: 'Book deleted Successfuly' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

export default router;