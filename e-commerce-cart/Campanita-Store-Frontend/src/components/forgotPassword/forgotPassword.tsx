import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { emailValidator, ValidationResult } from "../validation";
import "./forgotPassword.css";

export const ForgotPassword: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validations
    const emailValidationResult: ValidationResult = emailValidator(email);
    if (!emailValidationResult.isValid) {
      console.error("Invalid imput", emailValidationResult.errorMessage);
      setMessage({
        text: "Invalid email format. Please add a valid email format",
        type: "error",
      });
      setTimeout(() => setMessage(null), 10000);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/user/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      //This way i can use the variable data to get the response from the server
      //so with this variable passed through the setMessage users can see Res
      const data = await response.json();

      if (!response.ok) {
        setMessage({
          text: data.error || "An error accurred in forgot password",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      if (response.status == 401) {
        setMessage({
          text: "Unauthorized please contact an admin",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
      } else {
        setMessage({
          text: "Password reset link sent successfully. Please check your email and follow the process",
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
          history.push("/login");
        }, 10000);
      }
    } catch (error) {
      setMessage({
        text: "An error occurred during forgot password",
        type: "error",
      });
      setTimeout(() => setMessage(null), 10000);
      console.error("Forgot Password error", error);
    }
  };

  return (
    <div className="forgot-password-container">
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <div className="forgot-password-form-container">
        <span className="forgot-password-span">Forgot Password</span>
        <form
          action="forgotPassword"
          className="forgot-password-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="forgot-password-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
