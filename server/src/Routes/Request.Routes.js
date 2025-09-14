import express from 'express';
import { createBookRequest, receivedRequests, updateRequestStatus, userRequestedBooks } from '../Controllers/Request.Controllers.js';
import verifyToken from '../Middleware/Auth.js';

const router = express.Router();

router.post("/create-request",verifyToken,createBookRequest);
router.get("/sent-requests",verifyToken,userRequestedBooks);
router.get("/received-requests",verifyToken,receivedRequests);
router.put("/update-request-status/:id",verifyToken,updateRequestStatus);

export default router;