import { createContext, useContext, useState, useEffect } from "react";
import { PERSONNAGES, PITY_MAX } from "../data/personnages";

const GachaContext = createContext();
export function GachaProvider({ children }) {
    //inventaire : personnages collectés (peut avoir des doublons)
    const [inventaire, setInventaire] = useState([]);

    //historique : tout tirages avec date
    const [historique, setHistorique] = useState([]);

    //PityCounter : nombre de tirage depuis le dernier légendaire
    const [pityCounter, setPityCounter] = useState(0);

    //Charger depuis localstorage au démarrage
    useEffect(() => {
        const inventaireFromStorage = localStorage.getItem("inventaire");
        const historiqueFromStorage = localStorage.getItem("historique");
        const pityCounterFromStorage = localStorage.getItem("pityCounter");

        if (inventaireFromStorage) {setInventaire(JSON.parse(inventaireFromStorage));}
        if (historiqueFromStorage) {setHistorique(JSON.parse(historiqueFromStorage));}
        if (pityCounterFromStorage) {setPityCounter(JSON.parse(pityCounterFromStorage));}
    }, []);

    //Sauvegarder inventaire dans localstorage à chaque changement
    useEffect(() => {
        localStorage.setItem("inventaire", JSON.stringify(inventaire));
    }, [inventaire]);

    //Sauvegarder historique dans localstorage à chaque changement
    useEffect(() => {
        localStorage.setItem("historique", JSON.stringify(historique));
    }, [historique]);

    //Sauvegarder la pity dans  localstorage à chaque changement
    useEffect(() => {
        localStorage.setItem("pityCounter", JSON.stringify(pityCounter));
    }, [pityCounter]);

    //ajouter un tirage depuis accueil
    const ajouterTirage = (personnage) => {
        const entree = {
            personnage ,
            date: new Date().toISOString(),
            Iid: Date.now(), //id unique basé sur timestamp POUR LA KEY REACT
        };
        setInventaire(prev => [...prev, personnage]);      
        setHistorique(prev => [...prev, entree]); // plus recent en premier
    };

    //statistique utiles
    const stats = {
        total: historique.length,
        legedaire: inventaire.filter(p => p.rarete === "légendaire").length,
        rare: inventaire.filter(p => p.rarete === "rare").length,
        commune: inventaire.filter(p => p.rarete === "commune").length,
    };

    return (
        <GachaContext.Provider value={{inventaire, historique, ajouterTirage, stats, pityCounter, setPityCounter}}>
            {children}
        </GachaContext.Provider>
    );
}

//hook personnalisé pour utiliser le contexte plus facilement
export function useGacha() {
    return useContext(GachaContext);
}

