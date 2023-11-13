// React Router and Redux
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
// import component
import Payment from "../Payment";

const ProtectRoute = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  return user ? (
    <Payment />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectRoute;
