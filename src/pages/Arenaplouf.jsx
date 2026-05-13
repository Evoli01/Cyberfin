import { useState, useEffect } from "react";
import {useGacha} from "../context/GachaContext"
import {simulerDuel} from "../utils/Duel";
import { PERSONNAGES } from "../data/personnages";
import CartePersonnage from "../components/CartePersonnage";
import "./Arenaplouf.css";

function Arenaplouf() {
    const {inventaire, bulles, setBulles } = useGacha();
    const carteUniques = inventaire.filter(
        (p,index, self) => self.findIndex(c => c.id === p.id) === index );
    const [carteChoisie , setCarteChoisie] = useState(null)
    const [carteAdversaire, setCarteAdversaire] = useState(null)
    const [resultat, setResultat] = useState(null)
    const [roundActuel, setRoundActuel] = useState(0)
    const [phase, setPhase] = useState("selection")  
    const lancerDuel = (carte) => {
        const indexAlea = Math.floor(Math.random() * PERSONNAGES.length);
        const Adversaire = PERSONNAGES[indexAlea];
        const resultatDuel = simulerDuel(carte, Adversaire);
        setCarteChoisie(carte);
        setCarteAdversaire(Adversaire);
        setResultat (resultatDuel);
        setRoundActuel (-1)
        setPhase("preparation");  // au lieu de "combat"
        setTimeout(() => setPhase("combat"),2000);
    }

    useEffect(()=>{
        if (phase !== "combat") return;
        if (!resultat) return;
         if (roundActuel >= resultat.rounds.length) {
            setBulles(prev => prev + resultat.bullesGagnees);
            setPhase ("resultat");
            return;
        }
        const timer = setTimeout((timer) => {
        setRoundActuel(prev => prev + 1)
        }, 1500);
    return() => clearTimeout(timer);
    } ,[phase, roundActuel]);

    const snapshot = resultat && roundActuel >=0 ? resultat.rounds[roundActuel] : null;

    return (
        <div className="page-arenaplou" >
            <h1>L'Areneaplouf</h1>
            <p>{bulles} bulles</p> {/* affiche le nombre de bulle*/}

        {/*phase selection*/}
        {phase === "selection" && (
            <div className="selection">
             <h2>Choisis ton combattant ! </h2>
                <div className = "grille-cartes">
                {carteUniques.map(p => (
                    <div key={p.id} onClick={() => lancerDuel (p)}>
                        <CartePersonnage personnage={p} tailleMini={true}/>
                    </div>
                ))}
                </div>
            </div>
        )}
        {/*phase prépa*/}
        {phase === "preparation" && (
    <div className="preparation">
        <h2>⚔️ Le combat commence !</h2>
        <p>{carteChoisie?.nom} VS {carteAdversaire?.nom}</p>
    </div>
)}
         {/*phase combat*/}
         {phase ==="combat" && resultat && (
            <div className="combat">
                {/*on recupeère les snapshot du round actuel*/}
                

                {/* carte du joueur*/}
{/* Joueur */}
<div className="combattant">
    <div key={`joueur-${roundActuel}`} className={roundActuel % 2 === 0 ? "carte--attaque" : "carte--touche"}>
        <CartePersonnage personnage={carteChoisie} tailleMini={true}/>
    </div>
    <div className="barre-pv">
        <div style={{ width: `${snapshot ? (snapshot.pvJoueur/carteChoisie.pv)*100 : 100}%`}}/>
    </div>
    <p key={`degats-joueur-${roundActuel}`} className="degats-texte">
    {snapshot?.degatsAdversaire ? `-${snapshot.degatsAdversaire} 💥` : ""}
    </p>

</div>

{/* Adversaire */}
<div className="combattant">
    <div key={`adversaire-${roundActuel}`} className={roundActuel % 2 === 0 ? "carte--touche" : "carte--attaque"}>
        <CartePersonnage personnage={carteAdversaire} tailleMini={true}/>
    </div>
    <div className="barre-pv">
        <div style={{width: `${snapshot ? (snapshot.pvAdversaire/carteAdversaire.pv)*100 : 100}%`}}/>
    </div>
    <p key={`degats-adversaire-${roundActuel}`} className="degats-texte">
        {snapshot?.degatsJoueur ? `-${snapshot.degatsJoueur} 💥` : ""}
    </p>
</div>
        </div>
        )}

        {/*resultat*/} 
        {phase === "resultat" && resultat && (
            <div className="resultat-duel">
               {resultat.gagnant === "joueur" ? (
                <h2>🏆 Victoire ! </h2>
               ):(
                <h2>💀 Défaite...</h2>
               )}
               <p>Bulles gagnées : {resultat.bullesGagnees}</p> 
               <button onClick={() =>{
                    setPhase("selection");
                    setResultat(null);
                    setCarteChoisie(null);
                    setCarteAdversaire(null);
                    setRoundActuel(0);
               }}>
                    Rejouer
                </button> 
            </div>
        )}
    </div>
    );
}

export default Arenaplouf
