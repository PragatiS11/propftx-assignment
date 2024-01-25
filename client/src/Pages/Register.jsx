import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.pass) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: "Please fill in all fields and select at least one role.",
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!isStrongPassword(formData.pass)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Please choose a stronger password with at least 8 characters, including uppercase, lowercase, and numbers.",
      });
      return;
    }

    try {
      await axios.post(
        "https://movie-server-mu.vercel.app/users/register",
        formData
      );

      Swal.fire({
        title: "Register Successfully",
        icon: "success",
      });
      setFormData({
        username: "",
        email: "",
        pass: "",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <RegisterContainer>
      <h2 className="register-heading">Register</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">
            Username<span>*</span>
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter your username"
            required
          />
        </FormGroup>
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
        <SubmitButton type="submit">Register</SubmitButton>
      </form>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;

  .register-heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #48BB78;
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
    border-color: #48BB78;
  }
`;

const SubmitButton = styled.button`
  height: 35px;
  background-color: #48BB78;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;

export default Register;
