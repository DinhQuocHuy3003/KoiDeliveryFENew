import useStore from "../../app/store";
import GetDomestic from "./getDomestic/GetDomestic";
import GetLocal from "./getLocal/GetLocal";
import GetInternational from "./getInternational/GetInternational";
import { useState } from "react";
import './ShippingOptions.css';

export default function ShippingOptions() {
    const [selectedOption, setSelectedOption] = useState("");

    return (
        <div className="shipping-container">
            <div className="button-group">
                <button
                    className={`option-button ${selectedOption === "international" ? "selected" : ""}`}
                    style={{fontSize:'30px'}}
                    onClick={() => setSelectedOption("international")}
                >
                    International
                </button>

                <button
                    className={`option-button ${selectedOption === "domestic" ? "selected" : ""}`}
                    style={{fontSize:'30px'}}
                    onClick={() => setSelectedOption("domestic")}
                >
                    Domestic
                </button>

                <button
                    className={`option-button ${selectedOption === "local" ? "selected" : ""}`}
                    style={{fontSize:'30px'}}
                    onClick={() => setSelectedOption("local")}
                >
                    Local
                </button>
            </div>

            <div className="shipping-page-content">
                {selectedOption === "international" && <GetInternational />}
                {selectedOption === "domestic" && <GetDomestic />}
                {selectedOption === "local" && <GetLocal />}
            </div>
        </div>
    );
}
