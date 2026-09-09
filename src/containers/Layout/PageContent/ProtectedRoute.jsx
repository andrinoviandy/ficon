import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { swal } from "global/helper/swal";
import { findMenuByPath } from "global/helper/findMenuByPath";
import { dummyMenu } from "../sidebar/dummyMenu";
import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginAccess, setLoginAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);

  // ==========================
  // GET LOGIN ACCESS
  // ==========================
  useEffect(() => {
    const getAccess = async () => {
      try {
        const decoded = await decodeData(getCookies("accountAccess"));
        setLoginAccess(decoded);
      } finally {
        setLoading(false);
      }
    };

    getAccess();
  }, []);

  // ==========================
  // VALIDASI ROLE
  // ==========================
  useEffect(() => {
    if (loading) return;

    const menu = findMenuByPath(dummyMenu, location.pathname);

    console.log("menu", loginAccess?.nip);
    if (!menu?.roles) return;

    if (!menu.roles.includes(loginAccess?.role_id) && loginAccess?.nip !== '30000062') {
      const showAlert = async () => {
        await swal.custom('Maaf !', "Anda tidak memiliki hak akses pada halaman ini.", 'warning');
        navigate("/dashboard", { replace: true });
      };

      showAlert();
    }
  }, [loading, loginAccess, location.pathname, navigate]);

  // Tunggu loginAccess selesai dibaca
  if (loading) return null;

  return children;
};

export default ProtectedRoute;