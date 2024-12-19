import useStore from "../../../app/store";

export default function GetInternational() {
  const getInternational = useStore((state) => state.getInternational);
  const international = useStore((state) => state.international);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const handleGetInternational = async () => {
    await getInternational();
  };

  return (
    <div>
      <button onClick={handleGetInternational}>
        Get All International Transport
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {international && (
        <>
          {Array.isArray(international.result) ? (
            <ul>
              {international.result.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          ) : (
            <pre>{JSON.stringify(international, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}
