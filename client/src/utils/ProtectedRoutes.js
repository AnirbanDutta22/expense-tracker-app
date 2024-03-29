import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectorRoutes({ children }) {
  const user = useSelector((store) => store.app.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      return children;
    }
  }, []);
}
