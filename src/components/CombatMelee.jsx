import { useState, useEffect } from "react";
import { simulerMelee } from "../utils/Duel";
import CartePersonnage from "./CartePersonnage";
import "./CombatMelee.css";

function CombatMelee({ equipeJoueur, equipeAdverse, vitesseRapide, onTermine }) {
    const [resultat, setResultat] = useState(null);
    const [roundActuel, setRoundActuel] = useState(-1);

    // lance la simulation une seule fois, au montage du composant
    useEffect(() => {
        const res = simulerMelee(equipeJoueur, equipeAdverse);
        setResultat(res);
    }, []);

    // avance les rounds au fil du temps (copie-colle depuis Arenaplouf.jsx, adapte la fin)
    useEffect(() => {
        if (!resultat) return;
        if (roundActuel >= resultat.rounds.length) {
            onTermine(resultat);   // au lieu de setBulles/setPhase, on prévient le parent
            return;
        }
        const delais = vitesseRapide ? 200 : 1500;
        const timer = setTimeout(() => setRoundActuel(prev => prev + 1), delais);
        return () => clearTimeout(timer);
    }, [resultat, roundActuel, vitesseRapide]);

    const snapshot = resultat && roundActuel >= 0 ? resultat.rounds[roundActuel] : null;

    // trouverCombattant et classeAnimation : copie-colle depuis Arenaplouf.jsx, inchangées

    const trouverCombattant = (id) => {
        if (!snapshot) return null;
        return snapshot.combattants.find(c => c.id === id);
    };

    const classeAnimation = (id) => {
        if (!snapshot) return "";
        const aEteTouche = snapshot.attaques.some(a => a.cibleId === id);
        const aAttaque = snapshot.attaques.some(a => a.attaquantId === id);
        if (aEteTouche) return "carte--touche";
        if (aAttaque) return "carte--attaque";
        return "";
    };

    // return (...) : copie-colle le bloc JSX .combat-melee depuis Arenaplouf.jsx (lignes 197-242), inchangé
    return (
        <div className="combat-melee">
            {/* Joueur */}
            <div className="equipe">
                {equipeJoueur.map((perso, index) => {
                    const id = `joueur -${index}`;
                    const etat = trouverCombattant(id);
                    const pvActuel = etat ? etat.pv : perso.pv;
                    const estMort = etat ? !etat.vivant : false;
                    return (
                        <div className="combattant" key={id}>
                            <div key={`${id}-${roundActuel}`} className={classeAnimation(id)}>
                                <CartePersonnage personnage={perso} tailleMini={true}/>
                            </div>
                            <div className="ligne-vie">
                                <div className="barre-pv">
                                    <div style={{width: `${(pvActuel/perso.pv)*100}%`}}/>
                                </div>
                                {estMort && <p className="emoji-mort">💀</p>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Adversaire */}
            <div className="equipe equipe--adversaire">
                {equipeAdverse.map((perso, index) => {
                    const id = `bot -${index}`;
                    const etat = trouverCombattant(id);
                    const pvActuel = etat ? etat.pv : perso.pv;
                    const estMort = etat ? !etat.vivant : false;
                    return (
                        <div className="combattant" key={id}>
                            <div key={`${id}-${roundActuel}`} className={classeAnimation(id)}>
                                <CartePersonnage personnage={perso} tailleMini={true}/>
                            </div>
                            <div className="ligne-vie">
                                <div className="barre-pv">
                                    <div style={{width: `${(pvActuel/perso.pv)*100}%`}}/>
                                </div>
                                {estMort && <p className="emoji-mort">💀</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default CombatMelee;