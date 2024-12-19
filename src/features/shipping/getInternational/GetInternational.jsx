import { useState } from "react";
import useStore from "../../../app/store";
import { useNavigate } from "react-router-dom";
import "./GetInternational.css"; // File CSS riêng để chỉnh sửa giao diện

export default function GetInternational() {
  const getInternational = useStore((state) => state.getInternational);
  const international = useStore((state) => state.international);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleGetInternational = async () => {
    await getInternational();
  };

  const handleSubmit = () => {
    if (selectedItem) {
      navigate("/addressdetail", { state: { selectedItem } });
    }
  };

  return (
    <div className="get-international-container">
      {/* <button onClick={handleGetInternational} className="get-international-button">
        Get All International Transport
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}

      {international && Array.isArray(international.result) && (
        <div className="international-table-container">
          <table className="international-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Transport Type</th>
                <th>Description</th>
                <th>Transport Price</th>
                <th>From Province</th>
                <th>To Province</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {international.result.map((item) => (
                <tr
                  key={item.id}
                  className={selectedItem?.id === item.id ? "selected-row" : ""}
                >
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.transportType === 1 ? "Domestic" : "International"}</td>
                  <td>{item.description}</td>
                  <td>{item.transportPrice.toLocaleString()} VND</td>
                  <td>{item.fromProvince}</td>
                  <td>{item.toProvince}</td>
                  <td>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="select-button"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedItem && (
            <button onClick={handleSubmit} className="address-detail-button">
              Address Detail
            </button>
          )}
        </div>
      )}
    </div>
  );
}
