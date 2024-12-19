import { useParams } from "react-router-dom";
import useStore from "../../../app/store";
import { useState } from "react";
import { Modal, Input, Button } from "antd";
import "./FishDetail.css";

export default function FishDetail() {
    const { orderId, orderItemId } = useParams();
    const [fishName, setFishName] = useState("");
    const [length, setLength] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qualificationName, setQualificationName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [age, setAge] = useState(null);
    const [selectedFishId, setSelectedFishId] = useState(null);
    const orderDetail = useStore((state) => state.orderDetail);
    const postFishDetail = useStore((state) => state.postFishDetail);

    console.log("fish", orderDetail.orderItems.find(x => x.id == orderItemId));
    var item = orderDetail.orderItems.find(x => x.id == orderItemId);
    var fishList = item.fishDetails;
    console.log("fishList", fishList);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file);
        }
    };

    const callFishQualificationApi = async (name, fishDetailId, file) => {
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("FishDetailId", fishDetailId);
        formData.append("File", file);

        try {
            const response = await fetch(`https://localhost:7046/api/FishQualification/create-fishQualification?Name=${name}&FishDetailId=${fishDetailId}`, {
                method: "POST",
                headers: {
                    "accept": "*/*",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("API response:", result);
            return result;
        } catch (error) {
            console.error("Error calling API:", error);
            throw error;
        }
    };

    const handleQualificationSubmit = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        setIsSubmitting(true);
        try {
            await callFishQualificationApi(qualificationName, selectedFishId, selectedFile);
            setIsModalOpen(false);
            setQualificationName("");
            setSelectedFile(null);
        } catch (error) {
            console.error("Error submitting qualification:", error);
        } finally {
            setIsSubmitting(false);
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

        if (selectedFile) {
            formData.append("file", selectedFile);
            console.log("Image added to formData:", selectedFile);
        }

        try {  
            await postFishDetail(formData);  
        } catch (err) {  
            setError(err.message);  
        } finally {  
            setIsSubmitting(false);  
        }  
    };

    const openModal = (id) => {
        setIsModalOpen(true);
        setSelectedFishId(id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFishId(null);
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

            {fishList && fishList.length > 0 ? (
                <div>
                    <h3>Fish Details:</h3>
                    <ul className="fish-details-list">
                        {fishList.map((fish) => (
                            <li key={fish.id} className="fish-item">
                                <p><strong>Name:</strong> {fish.name}</p>
                                <p><strong>Age:</strong> {fish.age}</p>
                                <p><strong>Length:</strong> {fish.length}cm</p>
                                {fish.fishImgURL && (
                                    <img
                                        src={fish.fishImgURL}
                                        alt={fish.name}
                                        style={{ width: "150px", height: "auto" }}
                                    />
                                )}
                                <button className="add-qualification-btn" onClick={() => openModal(fish.id)}>Add Qualification</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No fish details available.</p>
            )}

            <Modal
                title="Add Fish Qualification"
                open={isModalOpen}
                onOk={handleQualificationSubmit}
                onCancel={closeModal}
                confirmLoading={isSubmitting}
            >
                <Input
                    placeholder="Enter Qualification Name"
                    value={qualificationName}
                    onChange={(e) => setQualificationName(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: "10px" }}
                />
            </Modal>
        </div>
    );
}
