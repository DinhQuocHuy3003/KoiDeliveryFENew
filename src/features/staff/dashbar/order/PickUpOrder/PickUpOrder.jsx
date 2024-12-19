import useStore from "../../../../../app/store";

export default function PickUpOrder() {
    const getAllPickUpOrder = useStore((state) => state.getAllPickUpOrder);
    const response = useStore((state) => state.response);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

}