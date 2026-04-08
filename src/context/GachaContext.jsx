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

    //carte du jour : résultat du dernier tirage pour affichage sur accueil
    const [carteDuJour, setCarteDuJour] = useState(null);

    //Charger depuis localstorage au démarrage
    useEffect(() => {
        const inventaireFromStorage = localStorage.getItem("inventaire");
        const historiqueFromStorage = localStorage.getItem("historique");
        const pityCounterFromStorage = localStorage.getItem("pityCounter");

        if (inventaireFromStorage) {setInventaire(JSON.parse(inventaireFromStorage));}
        if (historiqueFromStorage) {
            const historiqueParsed = JSON.parse(historiqueFromStorage);
            setHistorique(historiqueParsed);
            if (historiqueParsed.length >0 && historiqueParsed[0].date == new Date().toISOString()) {
                setCarteDuJour(historiqueParsed[0].personnage);
            }
        }
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
        setCarteDuJour(personnage);
    };

    //statistique utiles
    const stats = {
        total: historique.length,
        legendaire: inventaire.filter(p => p.rarete === "Légendaire").length,
        rare: inventaire.filter(p => p.rarete === "Rare").length,
        commune: inventaire.filter(p => p.rarete === "Commun").length,
    };

    return (
        <GachaContext.Provider value={{inventaire, historique, ajouterTirage, stats, pityCounter, setPityCounter,carteDuJour}}>
            {children}
        </GachaContext.Provider>
    );
}

//hook personnalisé pour utiliser le contexte plus facilement
export function useGacha() {
    return useContext(GachaContext);
}

