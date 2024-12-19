import useStore from "../../app/store";
import GetDomestic from "./getDomestic/GetDomestic";
import GetLocal from "./getLocal/GetLocal";
import GetInternational from "./getInternational/GetInternational";
import { useState } from "react";

export default function ShippingOptions() {
    const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
        <div>
            <div>
                <button onClick={() => setSelectedOption("international")}
                style={{
                    backgroundColor: selectedOption === "international" ? "#007BFF" : "#ccc",
                    color: selectedOption === "international" ? "#fff" : "#000",
                }}
                >
                    International
                </button>

                <button onClick={() => setSelectedOption("domestic")}
                style={{
                    backgroundColor: selectedOption === "domestic" ? "#007BFF" : "#ccc",
                    color: selectedOption === "domestic" ? "#fff" : "#000",
                }}
                >
                    Domestic
                </button>

                <button onClick={() => setSelectedOption("local")}
                style={{
                    backgroundColor: selectedOption === "local" ? "#007BFF" : "#ccc",
                    color: selectedOption === "local" ? "#fff" : "#000",
                }}
                >
                    Local
                </button>
            </div>

            {selectedOption === "international" && <GetInternational /> }
            {selectedOption === "domestic" && <GetDomestic />}
            {selectedOption === "local" && <GetLocal />}
        </div>
      
    </>
  );
}
