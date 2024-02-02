import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./signup.css";
import {
  emailValidator,
  passwordValidator,
  ValidationResult,
  phoneValidator,
  addressValidator,
} from "../validation";

export function Signup() {
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (formSubmitted) {
      // Validations
      const emailValidationResult: ValidationResult = emailValidator(
        formData.email
      );

      if (!emailValidationResult.isValid) {
        setMessage({
          text: "Please provide a valid email as: example@gmail.com",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      const passwordValidationResult: ValidationResult = passwordValidator(
        formData.password
      );

      if (!passwordValidationResult.isValid) {
        setMessage({
          text: "Password must be at least 6 characters and have lower and upper case as well digit and number",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      const confirmPasswordValidationResult: ValidationResult =
        passwordValidator(formData.confirmPassword);

      if (!confirmPasswordValidationResult.isValid) {
        setMessage({
          text: "Password and confirm password must match",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      const phoneValidationResult: ValidationResult = phoneValidator(
        formData.phone
      );

      if (!phoneValidationResult.isValid) {
        setMessage({
          text: "Please enter a valid phone number",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      const addressValidationResult: ValidationResult = addressValidator(
        formData.city,
        formData.state,
        formData.streetAddress,
        formData.zipCode
      );

      if (!addressValidationResult.isValid) {
        setMessage({
          text: "Please add a valid address City, State, Street Address and Postal Code",
          type: "error",
        });
        setTimeout(() => setMessage(null), 10000);
        return;
      }

      // Reset formSubmitted to prevent unnecessary re-execution of this effect
      setFormSubmitted(false);
    }
  }, [formData, formSubmitted, history]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.status === 409) {
        setMessage({
          text: "Email already exists. Please use a different valid email.",
          type: "error",
        });
        setTimeout(() => setMessage(null), 20000);
      } else if (response.ok) {
        // Display welcome message only after successful signup
        setMessage({
          text: "Signup Successfull. Welcome to Campanita Store",
          type: "success",
        });

        // Clear the welcome message after a delay
        setTimeout(() => {
          setMessage(null);
          // Redirect to the homepage on successful signup
          history.push("/");
        }, 10000);
      }
    } catch (error) {
      setMessage({ text: "An error occurred", type: "error" });
      setTimeout(() => setMessage(null), 20000);
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="signup-div">
      {message && (
        <div
          className={`message ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </div>
      )}

      <section id="Signup" className="signup-section">
        <span className="Span-Signup">Create Account</span>
        <form
          action="register"
          id="RegisterUser"
          className="register-user"
          onSubmit={handleSubmit}
        >
          <div className="special-inputs">
            <input
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              autoComplete="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="address-field">
            <textarea
              id="address"
              placeholder="Street Address"
              autoComplete="street-address"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            ></textarea>

            <div className="address-fields">
              <input
                type="text"
                placeholder="City"
                autoComplete="address-level2"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="State"
                autoComplete="address-level1"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="ZIP Code"
                autoComplete="postal-code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" id="Submit" className="submit-signup">
            Continue
          </button>
          <label htmlFor="CheckBox" className="label-terms">
            <input type="checkbox" id="CheckBox" name="Aceptar" required />
            By creating an account, you hereby accept the{" "}
            <a href="#"> conditions of use </a> and the
            <a href="#"> Private terms and privacy policy </a> from{" "}
            <a href="campnitastore.com">CampanitaStore.com </a>
          </label>
          <br />
          <p> Do you have an account already?</p>{" "}
          <a className="signin" href="http://localhost:5173/login">
            Sign in
          </a>
          <a className="forgot-a-password-signup" href="/forgotpassword">
            Forgot Password?
          </a>
        </form>
      </section>
    </div>
  );
}
