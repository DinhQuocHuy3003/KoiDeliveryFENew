import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useStore from "../../../../../app/store";

export default function ViewOrder() {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const getOrderById = useStore((state) => state.getOrderById);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            if (!orderId) {
                setError(new Error("Order ID is missing"));
                setLoading(false);
                return;
            }

            try {
                console.log("order Id", orderId);
                await getOrderById(orderId);  
            } catch (error) {
                setError(error);  
            } finally {
                setLoading(false);  
            }
        };

        fetchOrderDetail();
    }, [getOrderById, orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching order detail: {error.message}</p>;
    }
}