import { NavLink } from "react-router-dom";
import { useGacha } from "../context/GachaContext";
import "./Navbar.css";

function Navbar() {
  const { bulles } = useGacha();
  return (
    <nav className="navbar">
        <span className="navbar__logo"> 🎴 Cyberfin </span>
        <div className="navbar__liens">
            <span className="navbar__bulles"> 🟠 {bulles} </span>
            <NavLink to="/Arenaplouf" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"}>
            ⚔️ Arenaplouf
            </NavLink>
            <NavLink to="/" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            🎲 Tirage
            </NavLink>
            <NavLink to="/aquabot" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            🖼️ Aquabot
            </NavLink>
            <NavLink to="/historique" className={({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            🕒 Historique
            </NavLink>
            <NavLink to ="/Exploration" className = {({isActive}) => isActive ? "lien--actif" : "lien--inactif"} >
            📜 Exploration
            </NavLink>
        </div>
    </nav>
  );
}

export default Navbar;
