import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Aquabot from "./pages/Aquabot";
import Historique from "./pages/Historique";
import Arenaplouf from "./pages/Arenaplouf";
import Exploration from "./pages/Exploration";
import AfficheListePerso from "./pages/TestApi";
import Connexion from "./pages/Connexion";
import RouteProtegee from "./components/RouteProtegee";

function App() {

  return (
    <div className="App">
      <Navbar /> 
      <main className="contenu">
        <Routes>
          <Route path = "/Connexion" element = {<Connexion />} />
          <Route path="*" element={<h1>Dédicace à Fishy</h1>} />
          
          <Route element={<RouteProtegee/>}>
            <Route path="/" element={<Accueil />} />
            <Route path= "/Arenaplouf" element ={<Arenaplouf />} />
            <Route path="/aquabot" element={<Aquabot />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/Exploration" element = {<Exploration />} />
            
            <Route path = "/test" element = {<AfficheListePerso />} />
          </Route> 
        </Routes>
      </main> 
    </div> 
  );
}
export default App;
