import React, { useState, useEffect } from 'react';
import './Service.css';

function Service() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://localhost:7046/api/BoxType/GetAlBoxTypeAsync')
      .then((response) => response.json())
      .then((data) => setBoxes(data.result))
      .catch((error) => console.error('Error fetching box data:', error));
  }, []);

  return (
    <div className="service-container">
      <h1 className="service-title">Koi Fish Services</h1>
      {/* New Package Services Section */}


      <section className="service-section">
        <h2 className="service-subtitle">Package Prices</h2>
        <p className="service-description">
          We offer various package services for different shipping needs. Choose from our range of box types based on your capacity and shipping cost requirements.
        </p>
        <div className="package-container">
          <div className="body-panel">
            {boxes.map((box) => (
              <div key={box.id} className="box-card">
                <img
                  src={`./box-${box.id}.png`}
                  alt={box.boxName}
                  className="box-image"
                />
                <h3 className="box-name">{box.boxName}</h3>
                <p className="box-price">
                  Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(box.shippingCost)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Existing sections */}
      <section className="service-section">
        <h2 className="service-subtitle">What is Koi Delivery Service?</h2>
        <p className="service-description">
          Koi Delivery Service specializes in the safe and efficient transportation of Koi fish to customers across the country. We understand the unique requirements of these beautiful ornamental fish and ensure that every shipment is handled with the utmost care and professionalism.
        </p>
        <p className="service-description">
          Our service guarantees the health and safety of your Koi during transit by using specially designed packaging and monitoring systems. With Koi Delivery Service, you can enjoy the convenience of having high-quality Koi fish delivered right to your doorstep, ready to bring beauty, prosperity, and serenity to your pond or garden.
        </p>
        <p className="service-description">
          At Koi Delivery Service, we offer various shipping options tailored to meet the needs of our customers, whether you're a seasoned Koi enthusiast or just starting your journey. From selecting the best Koi fish to ensuring proper packaging, our team is dedicated to delivering excellence.
        </p>
        <p className="service-description">
          Our logistics network is designed to minimize transit times and maintain ideal conditions for your fish. With real-time tracking and customer support, you can stay informed throughout the delivery process. We pride ourselves on reliability and quality, making sure that your Koi arrive in pristine condition.
        </p>
        <p className="service-description">
          Additionally, we provide detailed care instructions with every shipment to help you seamlessly transition your new Koi to their pond or tank. Trust Koi Delivery Service to bring these symbols of prosperity and beauty straight to your home.
        </p>
        <img src="/koi-1.png" alt="Koi Fish 1" className="service-image" />
      </section>



      <section className="service-section">
        <h2 className="service-subtitle">How to Care for Koi Fish</h2>
        <p className="service-description">
          Caring for Koi fish requires an ideal environment and a proper diet. One of the most critical factors in Koi fish care is water quality. The water should maintain a stable pH level and temperature to ensure the fish's healthy growth. Koi fish thrive in water with a pH level of 7 to 7.5 and a temperature of 15°C to 25°C.
        </p>
        <p className="service-description">
          A water filtration system is essential. Filtration helps remove impurities, bacteria, and pollutants, ensuring a clean and safe environment for the fish. If the pond water becomes polluted, the fish may become ill or die prematurely. Regular water changes and quality checks are crucial for maintaining a healthy habitat.
        </p>
        <p className="service-description">
          Another factor is the diet of Koi fish. They need a diverse and nutritious diet, including specialized Koi food containing proteins, vitamins, and essential minerals. Avoid overfeeding, as it can pollute the pond water.
        </p>
        <img src="/koi-2.png" alt="Koi Fish 2" className="service-image" />
      </section>



      <section className="service-section">
        <h2 className="service-subtitle">The Significance of Keeping Koi Fish</h2>
        <p className="service-description">
          Koi fish are not just ornamental fish but also hold spiritual and Feng Shui significance. In Japanese culture, Koi symbolize perseverance, strong will, and the ability to overcome challenges. The image of Koi swimming upstream is often used to represent determination and courage in life.
        </p>
        <p className="service-description">
          Koi fish are also believed to bring good fortune and wealth. In Feng Shui, Koi fish help attract positive energy and prosperity to their owners. Especially during festivals or religious ceremonies, Koi are often used to pray for health, happiness, and success.
        </p>
        <p className="service-description">
          Each color of Koi has its own meaning. Red Koi represents love and prosperity, yellow symbolizes wealth, while white stands for purity and clarity. Keeping Koi fish not only enhances the beauty of living spaces but also improves fortune and well-being for the owners.
        </p>
        <img src="/koi-3.png" alt="Koi Fish 3" className="service-image" />
      </section>
    </div>
  );
}

export default Service;
