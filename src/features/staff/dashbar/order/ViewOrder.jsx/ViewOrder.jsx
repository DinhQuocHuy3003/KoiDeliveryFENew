import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../../../../../app/store";

export default function ViewOrder() {
    const { orderId } = useParams();
    const orderDetail = useStore((state) => state.orderDetail);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const getOrderById = useStore((state) => state.getOrderById);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (orderId) {
                    await getOrderById(orderId); 
                }
            } catch (err) {
                setError(err); 
            } finally {
                setLoading(false); 
            }
        };

        fetchOrder();
    }, [orderId, getOrderById]);

    const handleCreateFishDetail = (orderItemId) => {
        navigate(`/staff/fish-detail/${orderId}/${orderItemId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching order detail: {error.message}</p>;
    }

    return (
        <div>
            <h1>Order Details</h1>
            {orderDetail ? (
                <div>
                    <p><strong>From Address:</strong> {orderDetail.fromAddress || "N/A"}</p>
                    <p><strong>To Address:</strong> {orderDetail.toAddress || "N/A"}</p>
                    <p><strong>Status:</strong> {orderDetail.orderStatus || "N/A"}</p>
                    <p><strong>Total Price:</strong> {orderDetail.totalPrice || "N/A"}</p>
                    <p><strong>Notes:</strong> {orderDetail.notes || "N/A"}</p>
                    <p><strong>Receiver Name:</strong> {orderDetail.receiverName || "N/A"}</p>
                    <p><strong>Receiver Phone:</strong> {orderDetail.receiverPhone || "N/A"}</p>
                    <p><strong>Transport Service:</strong> {orderDetail.transportService?.name || "N/A"}</p>
                    <p><strong>Transport Description:</strong> {orderDetail.transportService?.description || "N/A"}</p>
    
                    <h3>Box Allocations</h3>
                    {orderDetail.boxAllocations?.length > 0 ? (
                        orderDetail.boxAllocations.map((box, index) => (
                            <div key={box.id || index}>
                                <p><strong>Box Type:</strong> {box.boxType?.boxName || "N/A"}</p>
                                <p><strong>Capacity:</strong> {box.boxType?.capacity || "N/A"}</p>
                                <p><strong>Shipping Cost:</strong> {box.boxType?.shippingCost || "N/A"}</p>
                            </div>
                        ))
                    ) : (
                        <p>No box allocations available.</p>
                    )}
    
                    <h3>Fish Items</h3>
                    {orderDetail.orderItems?.length > 0 ? (
                        orderDetail.orderItems.map((item, index) => (
                            <div key={item.id || index}>
                                <p><strong>Quantity:</strong> {item.quantity || "N/A"}</p>
                                <p><strong>Koi Size:</strong> {`${item.koiSize?.sizeCmMin || "N/A"} - ${item.koiSize?.sizeCmMax || "N/A"} cm`}</p>
                                <button onClick={() => handleCreateFishDetail(item.id)}>Create Fish Detail</button>
                            </div>
                        ))
                    ) : (
                        <p>No order items available.</p>
                    )}
                    
                </div>
            ) : (
                <p>No order details available.</p>
            )}
        </div>
    );    
}