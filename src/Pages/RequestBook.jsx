import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Utils/Loader";
const RequestBook = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const bookId = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    bookId,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRequest = async () => {
    const confirmRequest = window.confirm(
      "Are you sure you want to request this book?"
    );
    if (!confirmRequest) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/request/create-request`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Internal Server error. Please try again.";
      alert(message);
      navigate("/");
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
      <h1 className="text-3xl font-bold mb-8 mt-8">Request Book</h1>
      <textarea
        value={data.message}
        onChange={handleChange}
        name="message"
        rows="4"
        placeholder="Write Message"
        className="w-[50%] p-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        className="btn text-xl btn-primary rounded-full px-7 py-3 mt-12 mb-4"
        onClick={handleRequest}
      >
        Request Book
      </button>
      <div className="mt-4 mb-8">
        <p className="text-sm text-center text-gray-600">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RequestBook;
