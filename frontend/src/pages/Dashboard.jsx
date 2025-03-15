import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch dashboard data");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {data ? <p>Welcome, {data.user?.email}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
