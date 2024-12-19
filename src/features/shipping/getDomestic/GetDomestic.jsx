import { useState } from "react";
import useStore from "../../../app/store";
import { useNavigate } from "react-router-dom";
import "./GetDomestic.css"; // File CSS riêng để chỉnh sửa giao diện

export default function GetDomestic() {
  const getDomestic = useStore((state) => state.getDomestic);
  const domestic = useStore((state) => state.domestic);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleGetDomestic = async () => {
    await getDomestic();
  };

  const handleSubmit = () => {
    if (selectedItem) {
      navigate("/addressdetail", { state: { selectedItem } });
    }
  };

  return (
    <div className="get-domestic-container">
      {/* <button onClick={handleGetDomestic} className="get-domestic-button">
        Get All Domestic Transport
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}

      {domestic && Array.isArray(domestic.result) && (
        <div className="domestic-table-container">
          <table className="domestic-table">
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
              {domestic.result.map((item) => (
                <tr
                  key={item.id}
                  className={selectedItem?.id === item.id ? "selected-row" : ""}
                >
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.transportType}</td>
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
            <button
              onClick={handleSubmit}
              className="address-detail-button"
            >
              Address Detail
            </button>
          )}
        </div>
      )}
    </div>
  );
}
