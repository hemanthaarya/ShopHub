import React, { useState } from "react";
import "./ErrorTech.css";
import { BiShoppingBag, BiGridSmall, BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const USERS_KEY = "users";

function RegisterPage() {
  const [toggleOn, setToggleOn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isButtonDisabled =
    password !== confirmpass || password === "" || userName === "";

  const handleToggle = () => setToggleOn(!toggleOn);

  const handleRegister = () => {
    if (!isEmailValid(userName)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      const userExists = existingUsers.some(
        (user) => user.userName === userName
      );

      if (userExists) {
        alert("Username already exists! Please choose a different username.");
        setUserName("");
        setPassword("");
        setConfirmpass("");
        return;
      }

      const newUser = { userName, password };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

      setUserName("");
      setPassword("");
      setConfirmpass("");

      alert("User registered successfully!");
      // Redirect to the login page after successful registration
      navigate("/LoginPage");
    } catch (error) {
      console.error("Error accessing local storage:", error);
      alert("An error occurred. Please try again.");
    }
  };

  document.body.className = toggleOn ? "red-background" : "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="Navbar">
        <div className="LogoContainer">
          <div
            className="Logo"
            style={toggleOn ? { backgroundColor: "black", color: "white" } : null}
          >
            <BiGridSmall style={{ width: "30px", marginTop: "5px", height: "30px" }} />
          </div>
          <h2>shophub</h2>
        </div>
        <div className="PagesCpntainer">
          <Link className="link" to="/">
            <div>Home</div>
          </Link>
          <Link className="link" to="/ShopPage">
            <div>Shop</div>
          </Link>
          <Link className="link" to="/LoginPage">
            <div>Login</div>
          </Link>
          <Link className="link" to="/RegisterPage">
            <div
              style={toggleOn ? { color: "lightblue" } : { color: "#7d2804" }}
            >
              Register
            </div>
          </Link>
          <Link className="link" to="/MyAccountPage">
            <div>My Account</div>
          </Link>
        </div>
        <div className="ShopCOntainer">
          <Link to="/CartPage" className="link">
            <div
              className="Logo"
              style={toggleOn ? { backgroundColor: "black", color: "white" } : null}
            >
              <BiShoppingBag style={{ width: "20px", marginTop: "8px", height: "20px" }} />
            </div>
          </Link>
        </div>
      </div>

      <div
        className="Product4"
        style={
          toggleOn
            ? {
                backgroundColor: "#172838",
                backgroundImage: "radial-gradient(#2f2c4f 8%,transparent 0)",
                boxShadow: "inset 0 0 5rem 2rem #000",
              }
            : null
        }
      >
        <div className="Tit">
          <h1 style={toggleOn ? { color: "white" } : null}>Register</h1>
        </div>
        <div className="Tit">
          <p style={toggleOn ? { color: "white" } : null}>E-mail:</p>
        </div>
        <div className="Input">
          <input
            style={toggleOn ? { backgroundColor: "black", color: "white" } : null}
            type="text"
            placeholder="abc@example.com"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="Tit">
          <p style={toggleOn ? { color: "white" } : null}>Password:</p>
        </div>
        <div className="Input">
          <input
            style={toggleOn ? { backgroundColor: "black", color: "white" } : null}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="Tit">
          <p style={toggleOn ? { color: "white" } : null}>Confirm Password:</p>
        </div>
        <div className="Input">
          <input
            style={toggleOn ? { backgroundColor: "black", color: "white" } : null}
            type="password"
            value={confirmpass}
            onChange={(event) => setConfirmpass(event.target.value)}
          />
        </div>
        <div className="ButtonContainer">
          <button
            style={toggleOn ? { backgroundColor: "#677480", color: "lightblue" } : null}
            disabled={isButtonDisabled}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>

      <div>
        <Link to="/SearchPage" className="link">
          <div
            className="L3"
            style={toggleOn ? { backgroundColor: "black", color: "white" } : null}
          >
            <BiSearchAlt2
              style={{
                width: "25px",
                marginTop: "5px",
                height: "25px",
                marginLeft: "5px",
              }}
            />
          </div>
        </Link>
      </div>
      <div
        className="toggle-container"
        style={toggleOn ? { backgroundColor: "black" } : null}
      >
        <label className="toggle-label">
          <input
            type="checkbox"
            className="toggle-input"
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="Footer">
        <div></div>
        <div>
          <p style={toggleOn ? { color: "white" } : null}>
            copyrights @ 2023 | all rights reserved
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default RegisterPage;
