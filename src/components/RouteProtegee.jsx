import { Navigate, Outlet } from "react-router-dom";
import { useGacha } from "../context/GachaContext";

function RouteProtegee() {
    const { joueurConnecte } = useGacha();

    if (!joueurConnecte) {
        return <Navigate to="/Connexion" />;
    }

    return <Outlet />;
}

export default RouteProtegee;