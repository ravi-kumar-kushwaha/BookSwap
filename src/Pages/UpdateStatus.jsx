import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Utils/Loader";

const UpdateStatus = () => {
  const statusOptions = ["pending", "accepted", "declined"];
  const navigate = useNavigate();
  const requestId = useParams().id;

  const BASE_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatus = async () => {
    const confirmStatus = window.confirm(
      "Are you sure you want to update the status?"
    );
    if (!confirmStatus) return;
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/request/update-request-status/${requestId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert(response?.data?.message);
        navigate("/");
        window.location.reload();
      } else {
        alert(
          response?.data?.message || "Internal Server error. Please try again."
        );
      }
    } catch (error) {
      alert(error?.message || "Internal Server error. Please try again.");
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
      <h1 className="text-3xl font-bold mb-8 mt-8">Update Status</h1>
      <p className="mb-8">
        This page will be used to update the status of the request.
      </p>
      <div>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={data.status}
          className="p-3 w-[400px] text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Status</option>
          {statusOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8 mb-8">
        <button
          type="submit"
          onClick={handleStatus}
          className="btn text-xl btn-primary rounded-full px-7 py-3"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default UpdateStatus;
