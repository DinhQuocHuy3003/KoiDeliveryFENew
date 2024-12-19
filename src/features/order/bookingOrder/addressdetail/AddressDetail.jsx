import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../../app/store";
import { useState } from "react";

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
    }
    catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order");
    }
  };

  if (!selectedOption) {
    return <p>No transport option selected. Please go back and choose one</p>
  }

  return (
    <div>
      <p>
        <strong>Selected Service:</strong> {selectedOption.name}
      </p>

      <p>
        <strong>Detail:</strong> {selectedOption.description}
      </p>

      <p>
        <strong>Price per Km:</strong> {selectedOption.pricePerKm.toLocaleString()} VND
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                From Address:
            </label>
            <input 
            type="text"
            name="fromAddress"
            value={formData.fromAddress}
            onChange={handleChange}
            required 
            />
        </div>

        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                To Address:
            </label>
            <input 
            type="text"
            name="toAddress"
            value={formData.toAddress}
            onChange={handleChange}
            required 
            />
        </div>

        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                Receiver Phone:
            </label>
            <input 
            type="text"
            name="receiverPhone"
            value={formData.receiverPhone}
            onChange={handleChange}
            required 
            />
        </div>

        <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
                Notes:
            </label>
            <textarea 
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            />
        </div>

        <button
         type="submit"
        >
            Next
        </button>
      </form>
    </div>
  );
}
