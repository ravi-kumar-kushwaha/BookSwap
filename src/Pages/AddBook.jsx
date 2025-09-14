import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Utils/Loader";

const AddBook = () => {
  const bookCondition = ["New", "Like New", "Very Good", "Good", "Fair"];
  const [data, setData] = useState({
    title: "",
    author: "",
    condition: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
        setData({ ...data, image: e.target.files[0] });  
    } else {
        setData({ ...data, [name]: value });
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!data.title || !data.author || !data.condition || !data.description) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("image", data.image);

    try {
      const response = await axios.post(`${BASE_URL}/book/add-book`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        setData({
          title: "",
          author: "",
          condition: "",
          description: "",
          image: null,
        });
        navigate("/");
      } else {
        setErrorMsg(
          response.data.message ||
            "Something went wrong while adding new book."
        );
      }
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Internal Server error. Please try again."
      );
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
    <div className="flex fixed items-center justify-center max-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900  top-20 inset-0 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Book
        </h1>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Enter Book Title"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="text"
          name="author"
          value={data.author}
          onChange={handleChange}
          placeholder="Enter Book Author Name"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <select
          name="condition"
          id="condition"
          value={data.condition}
          onChange={handleChange}
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Book Condition</option>
          {bookCondition.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Enter Book Description"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="p-3 btn btn-primary text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>

        <p className="text-sm text-center text-gray-600">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home →
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AddBook;











