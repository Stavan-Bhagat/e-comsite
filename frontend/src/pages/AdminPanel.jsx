import React,{useEffect,useNavigate,useSelector} from "react";
import { UseSelector } from "react-redux";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "Admin") {
      navigate("/");
    }
  }, [user]);
  return <></>;
};
export default AdminPanel;
