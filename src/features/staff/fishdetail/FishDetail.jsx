import { useParams } from "react-router-dom";
import useStore from "../../../app/store"
import { useState } from "react";

export default function FishDetail() {
    const { orderId, orderItemId } = useParams();
    const [fishName, setFishName] = useState("");
    const [length, setLength] = useState(null);
    const postFishDetail = useStore((state) => state.postFishDetail);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [age, setAge] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log("Selected file:", file);
        }
    };

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setIsSubmitting(true);  
        const formData = new FormData();

        formData.append("name", fishName);
        formData.append("age", age);
        formData.append("length", length);
        formData.append("orderItemId", orderItemId);

        if (image) {
            formData.append("file", image);
            console.log("Image added to formData:", image);
        }

        try {  
            await postFishDetail(formData);  
        } catch (err) {  
            setError(err.message);  
        } finally {  
            setIsSubmitting(false);  
        }  
    };

    return (
        <div>
            <h1>Fish Detail for Order Item {orderItemId}</h1>
            
            <form onSubmit={handleSubmit}>
                <label>
                    Fish Name:
                    <input 
                        type="text" 
                        value={fishName} 
                        onChange={(e) => setFishName(e.target.value)} 
                    />
                </label>
                
                <label>
                    Age:
                    <input 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                    />
                </label>

                <label>
                    Length:
                    <input
                        type="number"
                        value={length} 
                        onChange={(e) => setLength(e.target.value)} 
                    />
                </label>

                {/* File input for image upload */}
                <label>
                    Upload Fish Image:
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </label>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}