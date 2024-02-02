import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./resetPassword.css";
import { passwordValidator } from "../validation";

interface Passwords {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  const history = useHistory();
  const { resetToken } = useParams<{ resetToken: string }>();
  const [passwords, setPasswords] = useState<Passwords>({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validations
    if (!passwordValidator(passwords.newPassword).isValid) {
      setMessage({
        text: "Password must be at least 6 characters and have upper, lower case, digit, and number.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 10000);
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({
        text: "New password and confirm password do not match.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 10000);
      return;
    }

    try {
      // Make a Put request to my backend API
      const response = await fetch(
        `http://localhost:8000/api/user/resetpassword/${resetToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwords),
        }
      );

      if (response.status === 401) {
        setMessage({
          text: "Link expired, please start over.",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      const data = await response.json();
      if (data.message) {
        setMessage({
          text: "Password reset successfully, please login.",
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
          history.push("/login");
        }, 10000);
      } else {
        setMessage({ text: "Error Resetting password.", type: "error" });
        setTimeout(() => setMessage(null), 10000);
      }
    } catch (error) {
      setMessage({ text: "An error occurred.", type: "error" });
      setTimeout(() => setMessage(null), 10000);
      console.error("An error occurred.", error);
    }
  };

  return (
    <div className="reset-password-container">
      {message && (
        <div
          className={`message ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </div>
      )}

      <form className="reset-password-form" onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};
