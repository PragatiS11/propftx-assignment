import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";


const EditMovie = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(null);
  const [image , setImage] = useState("")
  

  const token = localStorage.getItem("token");
    const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://movie-server-mu.vercel.app/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        setTitle(response.data.title);
        setYear(response.data.year);
        setImage(response.data.image)
      } catch (error) {
        console.error("Error fetching book:", error.message);
      }
    };
      fetchData();
  }, [id]);
  

  const handleUpdate = () => {
    const data = {
      title,
      year,
      image
    };

    axios
      .patch(`https://movie-server-mu.vercel.app/movie/update/${id}`, data , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Movie Updated",
            text: "The Movie has been successfully updated.",
          });
          navigate("/movies")
          setTitle("")
          setYear("")
          setImage("")

        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error while Editing",
        });
      });
  };

 
  return (
    <Container>
      <h2 className="edit-heading ">Edit Movie</h2>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        type="number"
        value={year}
        onChange={(e) => setYear(+e.target.value)}
        placeholder="Year"
      />
        <Input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Poster"
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  padding: 20px;
  .edit-heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #48BB78;
  }
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
    border-color:#48BB78;
  }
`;

const Button = styled.button`
  height: 35px;
  background-color:#48BB78;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #48BB78;
  }
`;

export default EditMovie;
