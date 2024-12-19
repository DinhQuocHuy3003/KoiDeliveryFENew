import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../../app/store";
import { useState } from "react";
import "./AddressDetail.css"; // Import CSS

export default function AddressDetail() {
  const postCreateOrder = useStore((state) => state.postCreateOrder);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedOption = location.state?.selectedItem;
  const [formData, setFormData] = useState({
    fromAddress: "",
    toAddress: "",
    receiverName: "",
    receiverPhone: "",
    notes: "",
    paymentMethod: 0,
    transportServiceId: selectedOption?.id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createOrder = await postCreateOrder(formData);
      const orderId = createOrder.result;
      alert("Order created successfully");
      navigate("/getestimate", {
        state: {
          orderId,
          transportServiceName: selectedOption.name,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order");
    }
  };

  if (!selectedOption) {
    return (
      <div className="no-option">
        <p>No transport option selected. Please go back and choose one.</p>
      </div>
    );
  }

  return (
    <div className="address-detail-container">
      <button
        className="back-button"
        onClick={() => navigate("/shippingoptions")}
      >
        Back
      </button>

      <div className="address-detail-header">
        <p>
          <strong>Selected Service:</strong> {selectedOption.name}
        </p>
        <p>
          <strong>Detail:</strong> {selectedOption.description}
        </p>
        <p>
          <strong>Price per Km:</strong> {selectedOption.pricePerKm.toLocaleString()}{" "}
          VND
        </p>
      </div>

      <div className="address-detail-content">
        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-group">
            <label htmlFor="fromAddress" className="form-label">
              From Address:
            </label>
            <input
              type="text"
              id="fromAddress"
              name="fromAddress"
              value={formData.fromAddress}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="toAddress" className="form-label">
              To Address:
            </label>
            <input
              type="text"
              id="toAddress"
              name="toAddress"
              value={formData.toAddress}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="receiverPhone" className="form-label">
              Receiver Phone:
            </label>
            <input
              type="text"
              id="receiverPhone"
              name="receiverPhone"
              value={formData.receiverPhone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Notes:
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-button">
            Next
          </button>
        </form>

        <div className="map-container">
          {/* Replace this div with the actual map implementation */}
          <p>Map placeholder (import free map service here).</p>
        </div>
      </div>
    </div>
  );
}
