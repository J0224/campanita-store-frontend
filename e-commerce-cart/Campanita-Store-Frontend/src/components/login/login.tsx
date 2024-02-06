// Login.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  emailValidator,
  passwordValidator,
  ValidationResult,
} from "../validation";
import "./login.css";
import { useAuth } from "../auth/authProvider";

export function Login() {
  const history = useHistory();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSuccessfulLogin = (firstName: string) => {
    login(firstName);
    history.push("/");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Validations
    const emailValidationResult: ValidationResult = emailValidator(
      formData.email
    );
    const passwordValidationResult: ValidationResult = passwordValidator(
      formData.password
    );

    if (!emailValidationResult.isValid || !passwordValidationResult.isValid) {
      console.error(
        "Invalid inputs",
        emailValidationResult.errorMessage,
        passwordValidationResult.errorMessage
      );

      setMessage({
        text: "Invalid inputs. Please check the form. 5 failed attempts will lock your account.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 10000);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({
          text: data.error || "An error occurred during login.",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      if (response.status === 401) {
        setMessage({
          text: "Unauthorized, please contact an admin or sign up.",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
      }

      if (response.status === 200) {
        setMessage({
          text: `Welcome, ${data.firstName}! Sign in successful.`,
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
          handleSuccessfulLogin(data.firstName); // Logging in with the user's first name
        }, 5000);
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during login. 5 consecutive failed attempts will lock your account.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 10000);
      console.error("Sign in error", error);
    }
  };

  return (
    <div className="login-div">
      {message && (
        <div
          className={`message ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </div>
      )}

      <section id="Login" className="login-section">
        <span className="span-login">Login</span>
        <form
          action="login"
          id="LoginUser"
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-div-input">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            id="SubmitLogin"
            className="submit-login-button"
          >
            Continue
          </button>

          <label>
            <p> Don't have an account yet?</p>{" "}
            <a href="http://localhost:5173/signup">Sign up</a>
          </label>

          <br />

          <a className="forgot-a-password" href="/forgotpassword">
            Forgot Password?
          </a>
        </form>
      </section>
    </div>
  );
}
