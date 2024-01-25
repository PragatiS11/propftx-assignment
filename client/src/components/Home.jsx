import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  VStack,
  Center,
  Box,
  Select,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://movie-server-mu.vercel.app/movie",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://movie-server-mu.vercel.app/movie/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Movie Deleted",
          text: "The Movie has been successfully deleted.",
        });
        const updatedMovies = movies.filter((movie) => movie._id !== id);
        setMovies(updatedMovies);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not logged in.",
      });
    }
  };

  const sortMovies = (order) => {
    const sortedMovies = [...movies];

    if (order === "asc") {
      sortedMovies.sort((a, b) => a.year - b.year);
    } else if (order === "desc") {
      sortedMovies.sort((a, b) => b.year - a.year);
    }
    setMovies(sortedMovies);
  };

  useEffect(() => {
    sortMovies(order);
  }, [order]);

  return (
    <Box overflowX="auto">
      <Box>
        <Select
          onChange={(e) => setOrder(e.target.value)}
          value={order}
          width={["100%", "100%", "300px"]}
          bg="#48bb78"
          color="white"
          border={"none"}
          marginBottom={"10px"}
          padding={"5px"}
          borderRadius={"1rem"}
          outline={"none"}
          cursor={"pointer"}
        >
          <option value="" style={{ color: "gray" }}>
            See by year
          </option>
          <option value="desc" style={{ color: "black" }}>
            New to old
          </option>
          <option value="asc" style={{ color: "black" }}>
            Old to new
          </option>
        </Select>
      </Box>
      <VStack spacing="4" align="stretch">
        <Box>
          <Center>
            <Table variant="striped" colorScheme="green">
              <Thead>
                <Tr>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Year</Th>
                  <Th>CreatedBy</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {movies.length > 0 &&
                  movies.map((movie) => (
                    <Tr key={movie._id}>
                      <Td>
                        {" "}
                        <img
                          src={movie.image}
                          alt="movie img"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </Td>
                      <Td>{movie.title}</Td>
                      <Td>{movie.year}</Td>
                      <Td>{movie.createdBy}</Td>
                      <Td>
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => handleDelete(movie._id)}
                          mr="2"
                        />
                        <Link to={`/movie/update/${movie._id}`}>
                          <IconButton
                            icon={<EditIcon />}
                            colorScheme="green"
                          />
                        </Link>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Center>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
