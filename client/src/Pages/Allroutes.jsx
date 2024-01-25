import React from "react";
import { Route, Routes } from "react-router-dom";
import AddMovies from "../components/AddMovies";
import EditMovie from "../components/EditMovie";
import Register from "./Register";
import Login from "./Login";
import Home from "../components/Home";
import PrivateRoute from "../components/PrivateRoute";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/movies"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/movie/add"
        element={
          <PrivateRoute>
            <AddMovies />
          </PrivateRoute>
        }
      />
      <Route path="/movie/update/:id" element={<EditMovie />} />
    </Routes>
  );
};

export default Allroutes;
