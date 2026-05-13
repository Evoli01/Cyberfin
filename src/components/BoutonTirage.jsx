import { useState, useEffect } from "react";


function BoutonTirage( {onTirer} ) {
  const [peutTirer, setPeutTirer] = useState(false);
  const [tempsRestant, setTempsRestant] = useState("");
  const [pityCounter, setPityCounter] = useState(0);
  // chargement initial du pityCounter depuis le localStorage
  useEffect(() => {
    const sauvegarde = localStorage.getItem("pity");
    if (sauvegarde) setPityCounter(Number(sauvegarde));
  }, []); // <-- tableau vide = s'execute qu'une seule fois
    // SAUVEGARDE AUTOMATIQUE à chaque changement du pityCounter
    useEffect(() => {
      localStorage.setItem("pity", pityCounter);
    }, [pityCounter]); // <-- se déclenche à chaque fois que pityCounter change
    

  

  useEffect(() => {
    const verifierDisponibilite = () => {
    const dernierTirage = null//localStorage.getItem("dernierTirage");

      if (!dernierTirage) {
        //jamais tirer -> disponible
        setPeutTirer(true);
        setTempsRestant("");
        return;
      }

      const maintenant =  new Date();
      const derniere = new Date (dernierTirage);
      const memejour = 
        maintenant.getDate() === derniere.getDate() &&
        maintenant.getMonth() === derniere.getMonth() &&
        maintenant.getFullYear() === derniere.getFullYear();

      if (false /*memejour*/) {
        // Tiré aujourd'hui -> indisponible
        setPeutTirer(false);
        //calculer le temps avant minuit
        const minuit = new Date(maintenant);
        minuit.setHours(24, 0, 0, 0); // minuit du jour suivant
        const diffMs = minuit - maintenant;
        const heures = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        setTempsRestant(`${heures}h ${minutes}min`);
      } else {
        // pas tiré aujourd'hui -> disponible
        setPeutTirer(true);
        setTempsRestant("");
      }
    };

    verifierDisponibilite();
    //rechech chaque minute pour mettre à jour le bouton dès que minuit est passé
    const interval = setInterval(verifierDisponibilite, 60 * 1000); // vérifier toutes les minutes
    return () => clearInterval(interval); // nettoyage
  }, []); // <-- s'exécute une seule fois au montage du composant

  const handleTirer = () => {
    if (!peutTirer) return; // <-- sécurité supplémentaire
    localStorage.setItem("dernierTirage", new Date().toISOString());
    // setPeutTirer(false);
    onTirer(); //déclencher le tirage dans le composant parent
  };

  const handleTirer5 = () => {
    if (!peutTirer) return;
    onTirer(5); //tirer 5 cartes d'un coup
  }; 
  
  return (
    <div className = "bouton-tirage"> 
      <button
        onClick={handleTirer}
        disabled={!peutTirer}
        className={ peutTirer ? "btn--actif" : "btn--inactive" }
      >
        {peutTirer ? "Tirer ma carte du jour" : "⏳ Déjà tiré aujourd'hui"}
      </button>
      <button
        onClick={handleTirer5}
        disabled={!peutTirer}
        className={ peutTirer ? "btn--actif" : "btn--inactive" }
      >
        {peutTirer ? "Tirer 5 cartes" : "⏳ Déjà tiré aujourd'hui"}
      </button>
      {tempsRestant && (
        <p className="timer">Prochain tirage dans : {tempsRestant} </p>
      )}
    </div>
  );
}
export default BoutonTirage;