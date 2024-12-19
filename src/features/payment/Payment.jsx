// import { useEffect } from "react";
// import useStore from "../../app/store";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Payment.css";

// export default function Payment() {
//     const orderDetail = useStore((state) => state.orderDetail);
//     const { id } = useParams();
//     const getOrderById = useStore((state) => state.getOrderById);
//     const postPayment = useStore((state) => state.postPayment);
//     const state = useStore();
//     useEffect(() => {
//         if(id) {
//         getOrderById(id);
//         }
//     }, [id, getOrderById]);

//     if (!orderDetail) {
//         return <p>Loading...</p>
//     }

//     const {
//         fromAddress,
//         toAddress,
//         distance,
//         notes,
//         orderStatus,
//         paymentMethod,
//         totalPrice,
//         receiverName,
//         receiverPhone,
//         transportService,
//         transportPrice,
//     } = orderDetail;

//     const handlePayment = async () => {
//         try {
//             const response = await postPayment(id); 
//             console.log("response in payment", response);
//             if (response) {
//                 window.location.href = response; 
//             } else {
//                 console.error("Payment URL not found in response");
//                 toast.error("Payment URL not found");
//             }
//         } catch (error) {
//             console.error("Error during payment:", error);
//             toast.error("Failed to process payment");
//         }
//     };

//     const handleChangePayment = async (id) => {
//         console.log("Change Payment:", id);
//         toast.success("Payment changed successfully");

//         const response = await state.updateCashToPayment(id);
        
//         if (state.error) {
//             console.error(state.error);
//         }
//         else {
//             console.log("Update payment successfully:", state.response);
//             toast.success("Method payment changed successfully");
//         }
//     };

//     const handleChangeCash = async (id) => {
//         console.log("Change Cash:", id);
//         toast.success("Cash changed successfully");

//         const response = await state.updatePaymentToCash(id);
//         if (state.error) {
//             console.error(state.error);
//         }
//         else {
//             console.log("Update cash successfully:", state.response);
//             toast.success("Method cash changed successfully");
//         }
//     };

//     return (
//         <div>
//             <h1>Order Details</h1>
//             <div>
//                 <strong>From Address:</strong> {fromAddress}
//             </div>
//             <div>
//                 <strong>To Address:</strong> {toAddress}
//             </div>
//             <div>
//                 <strong>Distance:</strong> {distance} km
//             </div>
//             <div>
//                 <strong>Notes:</strong> {notes}
//             </div>
//             <div>
//                 <strong>Order Status:</strong> {orderStatus === 0 ? "Pending" : "Completed"}
//             </div>
//             <div>
//                 <strong>Payment Method:</strong> {paymentMethod === 0 ? "Cash" : "Online"}
//             </div>
//             <div>
//                 <strong>Total Price:</strong> {new Intl.NumberFormat("vi-VN", {
//                     style: "currency",
//                     currency: "VND",
//                 }).format(totalPrice)}
//             </div>
//             <div>
//                 <strong>Receiver Name:</strong> {receiverName || "N/A"}
//             </div>
//             <div>
//                 <strong>Receiver Phone:</strong> {receiverPhone}
//             </div>
//             <div>
//                 <strong>Transport Service Description:</strong> {transportService?.description || "N/A"}
//             </div>
//             <div>
//                 <strong>Transport Price:</strong> {new Intl.NumberFormat("vi-VN", {
//                     style: "currency",
//                     currency: "VND",
//                 }).format(transportPrice || 0)}
//             </div>
//             <button
//                 onClick={() => handleChangePayment(id)}
//                 className="btn btn-primary"
//             >
//                 Change to Payment
//             </button>

//             <button
//                 onClick={() => handleChangeCash(id)}
//                 className="btn btn-secondary"
//             >
//                 Change to Cash
//             </button>

//             <button onClick={handlePayment} disabled={orderStatus !== 0}>
//                 {orderStatus === 0 ? "Make Payment" : "Payment Completed"}
//             </button>
//         </div>
//     );
// }




import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [result, setResult] = useState(null);
  const [showVerification, setShowVerification] = useState(false); // New state for verification
  const [verificationCode, setVerificationCode] = useState(""); // State for verification code
  const [userId, setUserId] = useState(null); // Store userId after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      confirmPassword,
      fistName,
      lastName,
      role: 0, // Always set role to 0
    };

    try {
      const response = await axios.post("https://localhost:7046/api/Auth/register", data);
      setStatusCode(response.status);
      setMessage(`Success: ${response.data.isSuccess ? "Registration successful!" : "Error occurred."}`);
      setResult(`Result: ${response.data.result}`);
      
      // Show verification form if registration is successful
      if (response.data.isSuccess) {
        setUserId(response.data.result); // Store the userId
        setShowVerification(true); // Show verification code input
      }
    } catch (error) {
      setStatusCode(error.response ? error.response.status : 500);
      setMessage(`Error: ${error.response ? error.response.data.errorMessage : "Server Error"}`);
      setResult(`Result: ${error.response ? error.response.data.result : "N/A"}`);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!userId || !verificationCode) {
      setMessage("Please provide both user ID and verification code.");
      return;
    }

    // Prepare the verification data
    const verificationData = {
      userId,
      verificationCode,
    };

    try {
      const response = await axios.post("https://localhost:7046/api/Auth/Verification", verificationData);
      setStatusCode(response.status);
      setMessage(`Verification Status: ${response.data.isSuccess ? "Code verified successfully!" : "Verification failed."}`);
      setResult(`Result: ${response.data.result}`);

      if (response.data.isSuccess) {
        // Navigate to login page or show a success message if verification is successful
        setMessage("Verification successful! You can now log in.");
        // Optionally, redirect to login page or do further actions here
      } else {
        setMessage(`Verification failed: ${response.data.result}`);
      }
    } catch (error) {
      setMessage(`Verification Error: ${error.response ? error.response.data.errorMessage : "Server Error"}`);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={fistName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {message && (
        <div className="response-message">
          <p>Status Code: {statusCode}</p>
          <p>{message}</p>
          <p>{result}</p>
        </div>
      )}

      {/* Show verification form if registration is successful */}
      {showVerification && (
        <div className="verification-form">
          <h3>Verify Code</h3>
          <form onSubmit={handleVerifyCode}>
            <div>
              <label>Enter Verification Code:</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button type="submit">Verify Code</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
