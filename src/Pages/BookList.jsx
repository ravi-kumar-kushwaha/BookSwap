import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Utils/Loader";
import { useNavigate } from "react-router-dom";
const BookList = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchAllBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/book/all-books`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("response", response.data.data);
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
    fetchAllBook();
  }, []);

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;
    try {
      setLoading(true);
      const response = await axios.delete(
        `${BASE_URL}/book/delete-book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        window.location.reload();
        navigate("/");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Internal Server error. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl font-bold text-center mt-2">Discover Books</h1>
      <p className="text-center text-2xl text-gray-500 mt-1">
        Explore <span className="font-semibold">{data?.length || 0}</span>{" "}
        {data?.length === 1 ? "book" : "books"} shared by our community.
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
                  src={item?.image?.url}
                  alt="book-image"
                  className="w-full h-60 object-cover border  rounded-[10px_0_0_0]"
                />
                <h2 className="text-lg pl-6 font-semibold mt-4">
                  Title: <span className="font-normal">{item?.title}</span>
                </h2>
                <p className="pl-6">
                  Description:{" "}
                  {item?.description?.length > 100
                    ? item?.description.slice(0, 100) + "..."
                    : item?.description}
                </p>
                <p className="pl-6">Author: {item.author}</p>
              </div>
              <div className="mb-3 pl-6">
                <p>Available: {item.available ? "Yes" : "No"}</p>
                <p>Condition: {item.condition}</p>
                <p>
                  Owner:{" "}
                  <span className="capitalize">{item.owner?.fullName}</span>
                </p>
                <p>Published On: {new Date(item.createdAt).toDateString()}</p>
              </div>
              <div>
                {item?.owner?._id ===
                  JSON.parse(localStorage.getItem("userDetails"))?._id && (
                  <div className="flex justify-center gap-6 mb-4 mt-6">
                    <button
                      onClick={() => navigate(`/edit-book/${item?._id}`)}
                      className="btn text-xl btn-primary rounded-full px-7 py-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(item?._id)}
                      className="btn text-xl btn-primary rounded-full px-7 py-3"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-6 mb-4">
                {token ? (
                  <button
                    onClick={() => navigate(`/request-book/${item?._id}`)}
                    className="btn text-xl btn-primary rounded-full px-7 py-3 mb-2"
                  >
                    Request Now
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/login`)}
                    className="btn text-xl btn-primary rounded-full px-7 py-3 mb-2"
                  >
                    Login to Request
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
