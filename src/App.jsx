import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Footer from "./Components/Footer";
import AddBook from "./Pages/AddBook";
import Home from "./Components/Home";
import EditBooks from "./Pages/EditBooks";
import RequestBook from "./Pages/RequestBook";
import SentRequests from "./Pages/SentRequests";
import ReceivedRequests from "./Pages/ReceivedRequests";
import UpdateStatus from "./Pages/UpdateStatus";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {token && (
              <>
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/sent-requests" element={<SentRequests />} />
                <Route path="/request-book/:id" element={<RequestBook />} />
                <Route
                  path="/received-requests"
                  element={<ReceivedRequests />}
                />
                <Route
                  path="/update-request-status/:id"
                  element={<UpdateStatus />}
                />
                <Route path="/edit-book/:id" element={<EditBooks />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
