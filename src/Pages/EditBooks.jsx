import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Utils/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditBooks = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = useParams().id;

  const bookCondition = ["New", "Like New", "Very Good", "Good", "Fair"];
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSingleBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/book/single-book/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
    fetchSingleBook();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`${BASE_URL}/book/update-book/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response", response.data.massage);
      if (response?.data?.success) {
        alert(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      alert(
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
        onSubmit={handleEdit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Edit Book
        </h1>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        <input
          type="text"
          name="title"
          value={data?.title || ""}
          onChange={handleChange}
          placeholder="Enter Book Title"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="text"
          name="author"
          value={data?.author || ""}
          onChange={handleChange}
          placeholder="Enter Book Author Name"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <select
          name="condition"
          id="condition"
          value={data?.condition || ""}
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
          value={data?.description || ""}
          onChange={handleChange}
          placeholder="Enter Book Description"
          className="p-3 text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          className="p-3 btn btn-primary text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Editing Book..." : "Edit Book"}
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

export default EditBooks;
