import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../../app/store";
import { useState, useEffect } from "react";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
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
  const [map, setMap] = useState(null); // State for map instance
  const [fromMarker, setFromMarker] = useState(null); // State for 'From Address' marker
  const [toMarker, setToMarker] = useState(null); // State for 'To Address' marker

  useEffect(() => {
    // Initialize Leaflet map
    const mapInstance = L.map("map").setView([10.8231, 106.6297], 12); // Default location: Hồ Chí Minh, Việt Nam

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove(); // Cleanup map when component unmounts
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getAddressLocation = (address, markerType) => {
    // Assuming you have a geocoding API or service to get coordinates from an address.
    // This can be done using Nominatim, Google Maps Geocoding API, or any other geocoding service.
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0]) {
          const { lat, lon, display_name } = data[0];
          const latLon = [lat, lon];
  
          // Remove previous marker if exists
          if (markerType === "from" && fromMarker) {
            map.removeLayer(fromMarker);
          } else if (markerType === "to" && toMarker) {
            map.removeLayer(toMarker);
          }
  
          // Create new marker
          const newMarker = L.marker(latLon).addTo(map);
          newMarker.bindPopup(display_name).openPopup();
  
          if (markerType === "from") {
            setFromMarker(newMarker);  // Update the state with new marker
          } else if (markerType === "to") {
            setToMarker(newMarker);    // Update the state with new marker
          }
  
          // Center the map on the selected location
          map.setView(latLon, 12); 
        } else {
          alert("Address not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching address location:", error);
        alert("Failed to get location.");
      });
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
      <div className="left-panel">
        <button
          className="back-button"
          onClick={() => navigate("/shippingoptions")}
        >
          Back To Select Shipping Option
        </button>

        <div className="address-detail-header">
          <p style={{fontSize:'20px'}} >
            <strong>Selected Service:</strong> {selectedOption.name}
          </p>
          <p style={{fontSize:'20px'}}>
            <strong>Detail:</strong> {selectedOption.description}
          </p>
          <p style={{fontSize:'20px'}}>
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
              <button
                type="button"
                className="get-location-button"
                onClick={() => getAddressLocation(formData.fromAddress, "from")}
              >
                Get Location
              </button>
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
              <button
                type="button"
                className="get-location-button"
                onClick={() => getAddressLocation(formData.toAddress, "to")}
              >
                Get Location
              </button>
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
              Finishing Create Order Information
            </button>
          </form>
        </div>
      </div>

      <div className="right-panel">
        <div id="map"></div>
      </div>
    </div>
  );
}
