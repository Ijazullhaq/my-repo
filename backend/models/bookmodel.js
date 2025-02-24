import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishYear: { type: Number, required: true },
  pdfPath: { type: String, required: false },  // Field to store PDF file path
},
{ timestamps: true } // This adds createdAt and updatedAt
);

export const Book = mongoose.model('Book', bookSchema);
