import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import './UserProfile.css';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
  const [ordersPerPage] = useState(10); // Số đơn hàng mỗi trang
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackStars, setFeedbackStars] = useState(0);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const token = Cookies.get('token'); // Token lưu trong cookie

  useEffect(() => {
    if (!token) {
      toast.error("No token found, please log in.");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://localhost:7046/api/UserAccount/GetUserProfile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        if (data.isSuccess) {
          setUserProfile(data.result);
        } else {
          toast.error("Failed to load user profile");
        }
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('https://localhost:7046/api/Order/Customer', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.result);
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchOrders();
  }, [token]);

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Processing';
      case 1: return 'Delivering';
      case 2: return 'Cancelled';
      case 3: return 'Complete';
      case 4: return 'Pending Pickup';
      default: return 'Unknown';
    }
  };

  const handleFeedbackClick = (orderId) => {
    setCurrentOrderId(orderId);
    setFeedbackVisible(true);
  };

  const handleFeedbackContentChange = (e) => {
    setFeedbackContent(e.target.value);
  };

  const handleFeedbackStarsChange = (stars) => {
    setFeedbackStars(stars);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackContent || feedbackStars === 0) {
      toast.error("Please provide feedback content and select a star rating.");
      return;
    }

    try {
      const response = await fetch('https://localhost:7046/api/Order/CreateFeedBackAsync', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentOrderId,
          feedbackContent: feedbackContent,
          feedbackStars: feedbackStars,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.result || "Failed to submit feedback.");
        return;
      }

      const data = await response.json();

      if (data.isSuccess) {
        toast.success("Feedback submitted successfully!");
        setFeedbackVisible(false);
        setFeedbackContent("");
        setFeedbackStars(0);
      } else {
        toast.error(data.result || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback.");
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!userProfile || !orders.length) {
    return <div className="no-profile">No user profile or orders found</div>;
  }

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-title">User Profile</h1>
      <div className="profile-details-container">
        {userProfile.imgUrl ? (
          <img src="./person.png" alt="User Profile" className="profile-img" />
        ) : (
          <div className="profile-img-placeholder">No Image</div>
        )}
        <div className="profile-info-container">
          <p className="profile-info"><strong>Full Name:</strong> {userProfile.firstName} {userProfile.lastName}</p>
          <p className="profile-info"><strong>Email:</strong> {userProfile.email}</p>
          <p className="profile-info"><strong>Phone Number:</strong> {userProfile.phoneNumber || "Not provided"}</p>
        </div>
      </div>

      <h2 className="orders-title">Your Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Total Price</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{getStatusText(order.orderStatus)}</td>
              <td>{order.fromAddress}</td>
              <td>{order.toAddress}</td>
              <td>{formatPrice(order.totalPrice)}</td>
              <td>
                {order.orderStatus === 3 ? (
                  <button className="feedback-btn" onClick={() => handleFeedbackClick(order.id)}>
                    Feedback
                  </button>
                ) : (
                  <span>Feedback not allowed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="pagination-btn" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button 
            key={pageNumber + 1} 
            className={`pagination-btn ${currentPage === pageNumber + 1 ? 'active' : ''}`} 
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button 
          className="pagination-btn" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Feedback Form */}
      {feedbackVisible && (
        <div className="feedback-modal">
          <div className="feedback-modal-content">
            <h3>Provide Feedback</h3>
            <textarea
              placeholder="Enter your feedback"
              value={feedbackContent}
              onChange={handleFeedbackContentChange}
            />
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${feedbackStars >= star ? 'selected' : ''}`}
                  onClick={() => handleFeedbackStarsChange(star)}
                >
                  ☆
                </span>
              ))}
            </div>
            <div className="feedback-buttons">
              <button onClick={handleFeedbackSubmit}>Submit</button>
              <button onClick={() => setFeedbackVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
