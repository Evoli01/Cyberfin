import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Aquabot from "./pages/Aquabot";
import Historique from "./pages/Historique";
import Arenaplouf from "./pages/Arenaplouf";
import Exploration from "./pages/Exploration";

function App() {

  return (
    <div className="App">
      <Navbar /> 
      <main className="contenu">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path= "/Arenaplouf" element ={<Arenaplouf />} />
          <Route path="/aquabot" element={<Aquabot />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/Exploration" element = {<Exploration />} />
          <Route path="*" element={<h1>Dédicace à Fishy</h1>} />
        </Routes>
      </main> 
    </div> 
  );
}
export default App;
