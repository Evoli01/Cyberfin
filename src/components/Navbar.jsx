import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
        <span className="navbar__logo"> 🎴 Cyberfin </span>
        <div className="navbar__liens">
            <NavLink to="/" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            🎲 Tirage
            </NavLink>
            <NavLink to="/aquabot" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            🖼️ Aquabot
            </NavLink>
            <NavLink to="/historique" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            🕒 Historique
            </NavLink>
        </div>
    </nav>
  );
}

export default Navbar;
