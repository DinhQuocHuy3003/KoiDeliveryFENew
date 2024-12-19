import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EmailVerification() {
    const [verificationCode, setVerificationCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // Extract userId from the route state
    const userId = location.state?.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://localhost:7046/api/Auth/Verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    verificationCode: verificationCode,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            setMessage("Verification successful!");

            // Navigate to the next page or dashboard after successful verification
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage("Verification failed. Please try again.");
            console.error("Error verifying code:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Email Verification</h1>
            <p>Please enter the verification code sent to your email:</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Verification Code:
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Verifying..." : "Verify"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}
