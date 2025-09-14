import Book from "../Models/Book.model.js";
import { deleteFromCLoudinary, uploadOnCloudinary } from "../Utils/Cloudinary.js";
  
  const getAllBooks = async (req, res) => {
      try {
        const books = await Book.find({ available: true }).populate('owner', 'fullName email').sort({ createdAt: -1 });
        if(!books || books.length === 0){
            return res.status(400).json({
                message: "Books not found!",
                success: false
            });
        }
        return res.status(200).json({
            message: "Books Found Successfully!",
            success: true,
            data: books
        })
      } catch (error) {
          return res.status(500).json({
              message: "Internal Server Error:" + error.message,
              success: false
          });
        
      }
  }
  
  const getUserBooks = async (req, res) => {
      try {
        const books = await Book.find({ owner: req.user._id }).sort({ createdAt: -1 });
        if(!books || books.length === 0){
            return res.status(400).json({
                message: "books not found!",
                success: false
            });
        }
        return res.status(200).json({
            message: "Books Found Successfully!",
            success: true,
            data: books
        })
      } catch (error) {
          return res.status(500).json({
              message: "Internal Server Error:" + error.message,
              success: false
          });
        
      }
  }

  const addBooks = async (req, res) => {
    try {
      const { title, author, condition, description } = req.body || {};
      
      if(!title || !author || !condition || !description){
          return res.status(400).json({
              message: "All fields are required!",
              success: false,
          });
      }

      const userId = req.user._id;
      console.log(userId);
      if(!userId){
          return res.status(400).json({
              message: "UserId is required!",
              success: false,
          });
      }

      const imageLocalPath = req.file?.path;
      if (!imageLocalPath) {
          return res.status(400).json({
              message: "Image file is missing!",
              success: false,
          });
      }
      let image;
      try {
          image = await uploadOnCloudinary(imageLocalPath);
          if (!image) {
              return res.status(400).json({
                  message: "Something went wronge while uploading image on cloudinay!",
                  success: false,
              });
          }
      } catch (error) {
          return res.status(500).json({
              message: "Internal Server error!",
              success: false,
          });
      }
  
      const book = await Book.create({
        title,
        author,
        condition,
        description,
        image:{
            url:image.url,
            public_id:image.public_id
        },
        owner: userId
      });
  
      if(!book){
          return res.status(402).json({
              message: "Something went wronge while creating book!",
              success: false,
          });
      }
      return res.status(200).json({
          message: "Book Created Successfully!",
          success: true,
          data: book
      });
    } catch (error) {
        if(image){
            await deleteFromCLoudinary(image.public_id);
        }
     return res.status(500).json({
         message: "Internal Server Error:" + error.message,
         success: false
     })
    }
  }

  const getSingleBook = async (req, res) => {
      try {
        const bookId = req.params.id;
        if(!bookId){
            return res.status(400).json({
                message: "BookId is required!",
                success: false,
            });
        }

        const book = await Book.findById(bookId).populate('owner', 'fullName email');
        if(!book || book?.length === 0){
            return res.status(400).json({
                message: "Book Not Found!",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Book Found Successfully!",
            success: true,
            data: book
        })
      } catch (error) {
          return res.status(500).json({
              message: "Internal Server Error:" + error.message,
              success: false
          });
        
      }
  }
const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        if(!bookId){
            return res.status(400).json({
                message: "BookId is required!",
                success: false,
            });
        }

        const oldBook = await Book.findById(bookId);
        if(!oldBook || oldBook?.length === 0){
            return res.status(400).json({
                message: "Book Not Found!",
                success: false,
            });
        }

        if(oldBook.owner.toString() !== req.user._id.toString()){
            return res.status(400).json({
                message: "You are not authorized to update this book!",
                success: false,
            });
        }

      const { title, author, condition, description } = req.body || {};
      
      if(!title || !author || !condition || !description){
          return res.status(400).json({
              message: "All fields are required!",
              success: false,
          });
      }              

      const userId = req.user._id;
      if(!userId){
          return res.status(400).json({
              message: "UserId is required!",
              success: false,
          });
      }

      const book = await Book.findByIdAndUpdate(bookId, {
        title,
        author,
        condition,
        description,
        owner: userId
      },
        { new: true });
  
      if(!book){
          return res.status(402).json({
              message: "Something went wronge while updating book!",
              success: false,
          });
      }
      return res.status(200).json({
          message: "Book Updated Successfully!",
          success: true,
          data: book
      });
    } catch (error) {
     return res.status(500).json({
         message: "Internal Server Error:" + error.message,
         success: false
     });
    }
  }
    
const updateBookImage = async (req, res) => {
    try {
        const bookId = req.params.id;
        if(!bookId){
            return res.status(400).json({
                message: "BookId is required!",
                success: false,
            });
        }

        const oldBook = await Book.findById(bookId);
        if(!oldBook || oldBook?.length === 0){
            return res.status(400).json({
                message: "Book Not Found!",
                success: false,
            });
        }

        if(oldBook.owner.toString() !== req.user._id.toString()){
            return res.status(400).json({
                message: "You are not authorized to update this book!",
                success: false,
            });
        }

        const deletedImage = oldBook.image;
        if(deletedImage.public_id){
            await deleteFromCLoudinary(deletedImage.public_id);
        }

        const imageLocalPath = req.file?.path;
        if (!imageLocalPath) {
            return res.status(400).json({
                message: "Image file is required!",
                success: false,
            });
        }
        let image;
        try {
            image = await uploadOnCloudinary(imageLocalPath);
            if (!image) {
                return res.status(400).json({
                    message: "Something went wronge while uploading image on cloudinay!",
                    success: false,
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server error!",
                success: false,
            });
        }

        const book = await Book.findByIdAndUpdate(bookId, {
            image: {
                url: image.url,
                public_id: image.public_id
            }
        },
            { new: true }).populate('owner', 'name location');
    
        if(!book){
            return res.status(402).json({
                message: "Something went wronge while updating book!",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Book Updated Successfully!",
            success: true,
            data: book
        }); 
    } catch (error) {
     return res.status(500).json({
         message: "Internal Server Error:" + error.message,
         success: false
     });
    }
  }

const deleteBook = async(req,res)=>{
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({
                message: "UserId is required!",
                success: false,
            });
        }
        const bookId = req.params.id;
        if(!bookId){
            return res.status(400).json({
                message: "BookId is required!",
                success: false,
            });
        }
        const book = await Book.findById(bookId);
        if(!book || book?.length === 0){
            return res.status(400).json({
                message: "Book Not Found!",
                success: false,
            });
        }
        if(book.owner.toString() !== userId.toString()){
            return res.status(400).json({
                message: "You are not authorized to delete this book!",
                success: false,
            });
        }
        const deletedImage = book.image;
        if(deletedImage.public_id){
            await deleteFromCLoudinary(deletedImage.public_id);
        }
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if(!deletedBook){
            return res.status(400).json({
                message: "Something went wronge while deleting book!",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Book Deleted Successfully!",
            success: true,
            data: deletedBook
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error:" + error.message,
            success: false
        });
    }
}
  

  export {
    getAllBooks,
    getUserBooks,
    getSingleBook,
    addBooks,
    updateBook,
    updateBookImage,
    deleteBook
  }