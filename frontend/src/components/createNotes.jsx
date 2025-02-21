import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./createNotes.module.css";

const CreateNotes = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, body, category }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Note created successfully!");
        navigate("/shownotes");
      } else {
        alert(`Error: ${data.msg}`);
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert("An error occurred while creating the note.");
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
            onChange={(e) => setTitle(e.target.value)} required
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            type="text"
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)} required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} required>
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
      </form>
    </div>
  );
};

export default CreateNotes;
