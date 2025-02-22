import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./createNotes.module.css";
import axios from "axios";
const CreateNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !content || !category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a note.");
        return;
      }
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes/create`,
        { title, content, category },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.json;

      if (response.status === 201) {
        setSuccess("Note created successfully!");
        setTimeout(() => {
          navigate("/ShowNotes");
        }, 1500);
      } else if (response.status === 400) {
        setError("All fields are required.");
      } else if (response.status === 500) {
        setError("Internal server error.");
      } else {
        setError(
          response.data.msg || "An error occurred while creating the note."
        );
      }
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={`${Style.box}`}>
      <div className={Style.overlay}></div>
      <h1>Create New Note</h1>
      <form className={`${Style.form_container}`} onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            type="text"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Education">Education</option>
            <option value="Ideas">Ideas</option>
            <option value="To-do">To-do</option>
            <option value="Projects">Projects</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>
        <button type="submit" className={`${Style.button} btn`}>
          Create Note
        </button>
        {error && <p className={Style.error}>{error}</p>}
        {success && <p className={Style.success}>{success}</p>}
      </form>
    </div>
  );
};

export default CreateNotes;
