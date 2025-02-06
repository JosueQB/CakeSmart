import { useState, useEffect } from "react";

// Custom hook for fetching data with error handling
export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false)

    };
    fetchData();
  }, [url]);

  return { data, loading }; 
}