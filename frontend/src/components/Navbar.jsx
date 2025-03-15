import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove auth token
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-white text-xl font-bold">
          SaaS Dashboard
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
