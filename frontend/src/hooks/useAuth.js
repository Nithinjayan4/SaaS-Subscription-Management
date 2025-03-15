import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return { user };
};

export default useAuth;
