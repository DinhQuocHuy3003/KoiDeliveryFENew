import { useEffect } from "react";
import useStore from "../../../app/store";

export default function GetDomestic() {
  const getDomestic = useStore((state) => state.getDomestic);
  const domestic = useStore((state) => state.domestic);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const handleGetDomestic = async () => {
    await getDomestic();
  };

  return (
    <div>
      <button onClick={handleGetDomestic}>Get All Domestic Transport</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {domestic && (
        <>
          {Array.isArray(domestic.result) ? (
            <ul>
              {domestic.result.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          ) : (
            <pre>{JSON.stringify(domestic, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}
