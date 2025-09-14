import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Utils/Loader";
import { useNavigate } from "react-router-dom";
const ReceivedRequests = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllReceivedRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/request/received-requests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response?.data?.success) {
          setData(response.data.data);
        }
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Internal Server error. Please try again.";
        alert(message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReceivedRequests();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h1 className="text-4xl font-bold text-center mt-2">
        Your Received Requests
      </h1>
      <p className="text-center text-2xl text-gray-500 mt-1">
        You have received{" "}
        <span className="font-semibold">{data?.length || 0}</span>{" "}
        {data?.length === 1 ? "request" : "requests"}
      </p>
      <div className="flex flex-wrap items-center justify-center text-gray-700 mt-4 p-10 gap-6">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div
              className="w-[360px] border border-amber-100 rounded-[10px_0_10px_0] shadow-lg bg-white"
              key={item._id}
            >
              <div className="mb-3">
                <img
                  src={item?.book?.image?.url}
                  alt="book-image"
                  className="w-full h-60 object-cover border  rounded-[10px_0_0_0]"
                />
                <h2 className="text-lg pl-6 font-semibold mt-4">
                  Title:{" "}
                  <span className="font-normal">{item?.book?.title}</span>
                </h2>
                <p className="pl-6">
                  Description:{" "}
                  {item?.book?.description.length > 100
                    ? item?.book?.description.slice(0, 100) + "..."
                    : item?.book?.description}
                </p>
                <p className="pl-6">Author: {item?.book?.author}</p>
              </div>
              <div className="mb-3 pl-6">
                <p>Available: {item?.book?.available ? "Yes" : "No"}</p>
                <p>Condition: {item?.book?.condition}</p>
                <p>
                  Owner:{" "}
                  <span className="capitalize">{item.owner?.fullName}</span>
                </p>
              </div>
              <div className="mb-3 pl-6">
                <p>Requester: {item?.requester?.fullName}</p>
                <p>Request Message: {item.message}</p>
                <p>Status: {item.status}</p>
                <p>Book Id: {item.book._id}</p>
                <p>Published On: {new Date(item.createdAt).toDateString()}</p>
              </div>
              <div className="flex justify-center gap-6 mb-4">
                <button
                  onClick={() =>
                    navigate(`/update-request-status/${item?._id}`)
                  }
                  className="btn text-xl btn-primary rounded-full px-7 py-3"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            You have no received requests.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceivedRequests;
