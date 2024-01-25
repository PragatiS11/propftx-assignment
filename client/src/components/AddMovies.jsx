import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddMovies = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    year: "",
    image: "",
    createdBy: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not logged in",
      });
      return;
    }

    try {
        await axios.post(
        "https://movie-server-mu.vercel.app/movie/add",
        movieData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Movie Added",
        text: "The movie has been successfully added.",
      });
      navigate("/movies")
      setMovieData({
        title: "",
        year: "",
        image: "",
        createdBy: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while trying to add the movie.",
      });
    }
  };

  return (
    <AddBooksContainer>
      <h2 className="add-movies-heading">Add Movie</h2>
      <form onSubmit={handleAddBook}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            placeholder="Enter book title"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="year">Year:</Label>
          <Input
            type="text"
            name="year"
            value={movieData.year}
            onChange={handleInputChange}
            placeholder="Enter publication year"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">Movie Poster:</Label>
          <Input
            type="text"
            name="image"
            value={movieData.image}
            onChange={handleInputChange}
            placeholder="Movie Poster"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="author">Movie Creater:</Label>
          <Input
            type="text"
            name="createdBy"
            value={movieData.createdBy}
            onChange={handleInputChange}
            placeholder="Enter movie creater name"
          />
        </FormGroup>
        <SubmitButton type="submit">Add Book</SubmitButton>
      </form>
    </AddBooksContainer>
  );
};

const AddBooksContainer = styled.div`
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;

  .add-movies-heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color:#48BB78;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  height: 40px;
  font-size: larger;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #48BB78;
  }
`;

const SubmitButton = styled.button`
  height: 35px;
  background-color:#48BB78;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;

export default AddMovies;
