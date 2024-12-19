import { useState } from "react";
import useStore from "../../../app/store";
import { useNavigate } from "react-router-dom";

export default function GetLocal() {
  const getLocal = useStore((state) => state.getLocal);
  const local = useStore((state) => state.local);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const handleGetLocal = async () => {
    await getLocal();
  };

  const handleSubmit = () => {
    if (selectedItem) {
        navigate("/addressdetail", { state: { selectedItem } });
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {local && Array.isArray(local.result) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {local.result.map((item, index) => (
            <button
              key={item.id}
              style={{
                padding: "15px",
                width: "250px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                textAlign: "left",
              }}
              onClick={() => setSelectedItem(item)}
            >
              <h3 style={{ margin: "0", fontSize: "18px", color: "#333" }}>
                {item.name}
              </h3>
              <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                {item.description}
              </p>
              <p
                style={{ margin: "5px 0", color: "#007bff", fontSize: "14px" }}
              >
                Price per Km: {item.pricePerKm.toLocaleString()} VND
              </p>
            </button>
          ))}
        </div>
      )}

      {selectedItem && (
        <button onClick={handleSubmit}
        style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
            Address Detail
          </button>
      )}
    </div>
  );
}
