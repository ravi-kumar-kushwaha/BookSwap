import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Like New', 'Very Good', 'Good', 'Fair'],
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      url:{
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    }
  }, {
    timestamps: true,
  });
  
  const Book = mongoose.model('Book', bookSchema);
  
  export default Book;