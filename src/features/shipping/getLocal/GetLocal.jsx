import { useState } from "react";
import useStore from "../../../app/store";
import { useNavigate } from "react-router-dom";
import "./GetLocal.css";

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
    <div className="get-local-container">
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      {local && Array.isArray(local.result) && (
        <table className="local-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price per Km (VND)</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {local.result.map((item) => (
              <tr key={item.id} className={selectedItem?.id === item.id ? "selected-row" : ""}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.pricePerKm.toLocaleString()}</td>
                <td>
                  <button 
                    className="select-button"
                    onClick={() => setSelectedItem(item)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedItem && (
        <button 
          onClick={handleSubmit} 
          className="address-detail-button"
        >
          Address Detail
        </button>
      )}
    </div>
  );
}
