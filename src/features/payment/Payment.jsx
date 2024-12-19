import { useEffect } from "react";
import useStore from "../../app/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Payment() {
    const orderDetail = useStore((state) => state.orderDetail);
    const { id } = useParams();
    const getOrderById = useStore((state) => state.getOrderById);
    const postPayment = useStore((state) => state.postPayment);
    const state = useStore();
    useEffect(() => {
        if(id) {
        getOrderById(id);
        }
    }, [id, getOrderById]);

    if (!orderDetail) {
        return <p>Loading...</p>
    }

    const {
        fromAddress,
        toAddress,
        distance,
        notes,
        orderStatus,
        paymentMethod,
        totalPrice,
        receiverName,
        receiverPhone,
        transportService,
        transportPrice,
    } = orderDetail;

    const handlePayment = async () => {
        try {
            const response = await postPayment(id); 
            console.log("response in payment", response);
            if (response) {
                window.location.href = response; 
            } else {
                console.error("Payment URL not found in response");
                toast.error("Payment URL not found");
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast.error("Failed to process payment");
        }
    };

    const handleChangePayment = async (id) => {
        console.log("Change Payment:", id);
        toast.success("Payment changed successfully");

        const response = await state.updateCashToPayment(id);
        
        if (state.error) {
            console.error(state.error);
        }
        else {
            console.log("Update payment successfully:", state.response);
            toast.success("Method payment changed successfully");
        }
    };

    const handleChangeCash = async (id) => {
        console.log("Change Cash:", id);
        toast.success("Cash changed successfully");

        const response = await state.updatePaymentToCash(id);
        if (state.error) {
            console.error(state.error);
        }
        else {
            console.log("Update cash successfully:", state.response);
            toast.success("Method cash changed successfully");
        }
    };

    return (
        <div>
            <h1>Order Details</h1>
            <div>
                <strong>From Address:</strong> {fromAddress}
            </div>
            <div>
                <strong>To Address:</strong> {toAddress}
            </div>
            <div>
                <strong>Distance:</strong> {distance} km
            </div>
            <div>
                <strong>Notes:</strong> {notes}
            </div>
            <div>
                <strong>Order Status:</strong> {orderStatus === 0 ? "Pending" : "Completed"}
            </div>
            <div>
                <strong>Payment Method:</strong> {paymentMethod === 0 ? "Cash" : "Online"}
            </div>
            <div>
                <strong>Total Price:</strong> {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(totalPrice)}
            </div>
            <div>
                <strong>Receiver Name:</strong> {receiverName || "N/A"}
            </div>
            <div>
                <strong>Receiver Phone:</strong> {receiverPhone}
            </div>
            <div>
                <strong>Transport Service Description:</strong> {transportService?.description || "N/A"}
            </div>
            <div>
                <strong>Transport Price:</strong> {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(transportPrice || 0)}
            </div>
            <button
                onClick={() => handleChangePayment(id)}
                className="btn btn-primary"
            >
                Change to Payment
            </button>

            <button
                onClick={() => handleChangeCash(id)}
                className="btn btn-secondary"
            >
                Change to Cash
            </button>

            <button onClick={handlePayment} disabled={orderStatus !== 0}>
                {orderStatus === 0 ? "Make Payment" : "Payment Completed"}
            </button>
        </div>
    );
}