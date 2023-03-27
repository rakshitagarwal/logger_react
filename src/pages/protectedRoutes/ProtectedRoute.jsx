import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({  children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(
  (state) => state.user
  );
  useEffect(()=>{
    console.log(children,"++++++++++++++++++++++++")
    if(isAuthenticated){
      navigate("/projectpage");
    }
  },[isAuthenticated])
  const location = useLocation()
  console.log(isAuthenticated, location);
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }
  return children
}
export default ProtectedRoute;
