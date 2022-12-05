import { useContext } from "react";
import AuthContext from "../layout/context/authcontext";

const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
