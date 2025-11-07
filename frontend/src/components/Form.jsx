import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Show a friendlier, mapped message coming from the server (keep raw details in console)
      if (error.response) {
        // server responded with a status outside 2xx
        const respData = error.response.data;

        // Build a readable message from common server shapes
        let friendly = "Whoops — something went wrong.";

        if (typeof respData === "string") {
          friendly = respData;
        } else if (respData && typeof respData === "object") {
          // Common DRF error shapes: { detail: "..." } or { field: ["err.."] }
          if (respData.detail) {
            const d = respData.detail;
            if (typeof d === "string") {
              if (d.includes("No active account found")) {
                friendly = "Login failed — those credentials don't match our records.\nTry again or create a new account if you haven't signed up yet.";
              } else {
                friendly = d;
              }
            } else {
              friendly = JSON.stringify(d);
            }
          } else {
            // Map object keys to readable lines
            const parts = Object.entries(respData).map(([k, v]) => {
              const text = Array.isArray(v) ? v.join(' ') : String(v);
              const label = k.charAt(0).toUpperCase() + k.slice(1);
              return `${label}: ${text}`;
            });
            if (parts.length) friendly = parts.join('\n');
          }
        }

        // A small friendly tip to make the popup more helpful
        friendly += "\n\nTip: Check your username/password or click 'Create an account' to sign up.";

        // Make the message a tiny bit more interesting while keeping it professional
        alert("✨ " + friendly);
        console.error("API error:", error.response.status, respData);
      } else if (error.request) {
        // request made but no response
        alert("No response from the server. Please check your network or that the backend is running.");
        console.error("No response:", error.request);
      } else {
        // something else happened
        alert(error.message);
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}

      <button className="form-button" type="submit">
        {name}
      </button>

      {method === "login" && (
        <button
          type="button"
          className="form-secondary"
          onClick={() => navigate("/register")}
        >
          Create an account
        </button>
      )}
    </form>
  );
}

export default Form;