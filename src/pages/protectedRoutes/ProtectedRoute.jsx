import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projectpage");
    }
  }, [isAuthenticated]);

  const location = useLocation();


  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;




