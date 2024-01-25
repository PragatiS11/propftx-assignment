import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.pass) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://movie-server-mu.vercel.app/users/login",
        formData
      );
      console.log(response);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuth(true);
      Swal.fire({
        title: "Login Successful",
        icon: "success",
      });
      navigate("/movies");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <LoginContainer>
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">
            Email<span>*</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="pass">
            Password<span>*</span>
          </Label>
          <Input
            type="password"
            id="pass"
            name="pass"
            value={formData.pass}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            placeholder="Enter your password"
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>
      </form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 90%; /* Adjusted width for responsiveness */
  max-width: 400px; /* Added max-width for smaller screens */
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;

  .login-heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #48bb78;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const SubmitButton = styled.button`
  height: 35px;
  background-color: #48bb78;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
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

  span {
    color: red;
    margin-left: 4px;
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
    border-color: #48bb78;
  }
`;

export default Login;
