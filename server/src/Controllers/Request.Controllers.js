import Book from "../Models/Book.model.js";
import Request from "../Models/Request.model.js";

const createBookRequest = async (req, res) => {
    try {
        const { bookId, message } = req.body || {};
        if(!bookId || !message){
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
        const book = await Book.findById(bookId);
        if(!book || book?.length === 0){
            return res.status(400).json({
                message: "Book Not Found!",
                success: false,
            });
        }

        if(book.owner.toString() === userId.toString()){
            return res.status(400).json({
                message: "Cannot request your own book!",
                success: false,
            });
        }

        const existingRequest = await Request.findOne({
            book: bookId,
            requester: userId,
            status: 'pending'
        });

        if(existingRequest){
            return res.status(400).json({
                message: "You have already made a request for this book!",
                success: false,
            });
        }

        const newRequest = await Request.create({
            book: bookId,
            requester: userId,
            owner: book.owner,
            message
        });

        if(!newRequest){
            return res.status(400).json({
                message: "Failed to create request!",
                success: false,
            });
        }

        return res.status(201).json({
            message: "Request created successfully!",
            success: true,
            data: newRequest
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error:" + error.message,
            success: false
        });
    }
}
 // Get requests for user's books (as owner)
const receivedRequests = async (req, res)=>{
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({
                message: "UserId is required!",
                success: false,
            });
        }

        const requests = await Request.find({
            owner: userId,
            status: 'pending'
        }).populate('book').populate('requester', 'fullName email').populate('owner', 'fullName email').sort({ createdAt: -1 });

        if(!requests || requests?.length === 0){
            return res.status(400).json({
                message: "No requests found!",
                success: false,
            });
        }

        return res.status(200).json({
            message: "User's received requests fetched successfully!",
            success: true,
            data: requests
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error:" + error.message,
            success: false
        });
        
    }
}
// Get books requested by user (as requester)
const userRequestedBooks = async (req, res)=>{
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({
                message: "UserId is required!",
                success: false,
            });
        }

        const requests = await Request.find({
            requester: userId
        }).populate('book').populate('requester', 'fullName email').populate('owner', 'fullName email').sort({ createdAt: -1 });

        if(!requests || requests?.length === 0){
            return res.status(400).json({
                message: "No requests found!",
                success: false,
            });
        }

        return res.status(200).json({
            message: "User's requested books fetched successfully!",
            success: true,
            data: requests
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error:" + error.message,
            success: false
        });
    }
}
  
const updateRequestStatus = async (req, res) => {
    try {
        const requestId = req.params.id;
        if(!requestId){
            return res.status(400).json({
                message: "RequestId is required!",
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

        const { status } = req.body;
        if(!status){
            return res.status(400).json({
                message: "Status is required!",
                success: false,
            });
        }
        const request = await Request.findById(requestId).populate('book').populate('requester', 'fullName email').populate('owner', 'fullName email');
        if(!request || request?.length === 0){
            return res.status(400).json({
                message: "Request Not Found!",
                success: false,
            });
        }
        if(request.book.owner.toString() !== userId.toString()){
            return res.status(403).json({
                message: "You are not authorized to update this request!",
                success: false,
            });
        }
       
         request.status = status;
         if(status === 'accepted'){
            await Book.findByIdAndUpdate(request.book._id, {
              available: false
            });
         }
        const updatedRequest = await request.save();
        return res.status(200).json({
            message: "Request updated successfully!",
            success: true,
            data: updatedRequest
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error:" + error.message,
            success: false
        })
    }
}

export  {
    createBookRequest,
    receivedRequests,
    userRequestedBooks,
    updateRequestStatus
}