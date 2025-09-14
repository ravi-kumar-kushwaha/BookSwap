import express from "express";
import { addBooks, deleteBook, getAllBooks, getSingleBook, getUserBooks, updateBook, updateBookImage } from "../Controllers/Book.Controllers.js";
import verifyToken from "../Middleware/Auth.js";
import upload from "../Middleware/Multer.js";

const router = express.Router();

router.get("/all-books",getAllBooks);
router.get("/user-books",verifyToken,getUserBooks);
router.post("/add-book",verifyToken,upload.single("image"),addBooks);
router.put("/update-book/:id",verifyToken,updateBook);
router.put("/update-book-image/:id",verifyToken,upload.single("image"),updateBookImage);
router.delete("/delete-book/:id",verifyToken,deleteBook);
router.get("/single-book/:id",getSingleBook);
export default router;