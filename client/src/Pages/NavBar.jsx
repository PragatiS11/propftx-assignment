import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
   const {setIsAuth} =  useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false)
    Swal.fire({
      icon: "success",
      title: "Successfully Logged Out",
      text: "You have been successfully logged out.",
    });
    navigate("/login");
     
  };

  return (
    <StyledNavbar>
      <StyledLogo onClick={() => navigate("/movies")}>
        <img
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          src="https://static.vecteezy.com/system/resources/thumbnails/005/188/413/small/cinema-logo-template-isolated-on-white-background-vector.jpg"
          alt="logo"
        />
      </StyledLogo>
      <StyledLinks>
        {<StyledLink to="/movies">Home</StyledLink>}
        {<StyledLink to="/movie/add">AddMovie</StyledLink>}
        {token ? (
          <StyledLogoutButton onClick={handleLogout}>Logout</StyledLogoutButton>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/">Register</StyledLink>
          </>
        )}
      </StyledLinks>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 10px 20px;
  position: sticky;
  background-color: #48bb78;
  color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const StyledLogo = styled.div`
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: red;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #d65656;
  }
`;

const StyledLogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #d65656;
  }
`;

export default Navbar;
