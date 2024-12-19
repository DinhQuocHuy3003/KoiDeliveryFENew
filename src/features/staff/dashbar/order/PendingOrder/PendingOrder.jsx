import { useEffect, useState } from "react";
import useStore from "../../../../../app/store"
import { useNavigate } from "react-router-dom";

export default function PendingOrder () {
    const getAllPendingOrder = useStore((state) => state.getAllPendingOrder);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const response = useStore((state) => state.response);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingOrders = async () => {
            setLoading(true);
            try {
                await getAllPendingOrder(); 
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); 
            }
        };

        fetchPendingOrders();
    }, [getAllPendingOrder]);

    const handleViewDetail = (orderId) => {
        navigate(`/staff/orderdetail/${orderId}`);  
    };

    if (loading) {
        return <p>Loading...</p>; 
    }

    if (error) {
        return <p>Error fetching pending orders: {error.message}</p>; 
    }

    return (
        <div>
            <h2>Pending Orders</h2>
            {response && response.length > 0 ? ( 
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>From Address</th>
                            <th>To Address</th>
                            <th>Status</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.fromAddress}</td>
                                <td>{order.toAddress}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.totalPrice.toLocaleString()} VND</td>
                                <td>
                                    <button
                                        onClick={() => handleViewDetail(order.id)} 
                                    >
                                        View Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pending orders available.</p>
            )}
        </div>
    );
}