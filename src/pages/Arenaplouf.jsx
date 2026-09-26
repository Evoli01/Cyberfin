import { useState, useEffect } from "react";
import {useGacha} from "../context/GachaContext"
import {simulerDuel} from "../utils/Duel";
import CombatMelee from "../components/CombatMelee";
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
    const [mode, setMode] = useState (null)
    const [equipeJoueur, setEquipeJoueur] = useState ([])
    const [equipeAdverse, setEquipeAdverse] = useState ([])
    const [vitesseRapide, setVitesseRapide] = useState(false)
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
        if (phase !== "combat" || mode !=="joute") return;
        if (!resultat) return;
         if (roundActuel >= resultat.rounds.length) {
            setBulles(prev => prev + resultat.bullesGagnees);
            setPhase ("resultat");
            return;
        }
        const delais = vitesseRapide ? 200 : 1500;
        const timer = setTimeout((timer) => {
        setRoundActuel(prev => prev + 1)
        }, delais);
    return() => clearTimeout(timer);
    } ,[phase, roundActuel]);

    const snapshot = resultat && roundActuel >=0 ? resultat.rounds[roundActuel] : null;

    const toggleSelection = (perso) => {
        const dejaChoisi = equipeJoueur.some(p=>p.id === perso.id);
        if (dejaChoisi){
            //retire perso equipe joueur
            setEquipeJoueur(equipeJoueur.filter(p=> perso.id !==p.id));
        } else {
            if (equipeJoueur.length >= 5) return;
            //ajoute perso a équipe
            setEquipeJoueur([...equipeJoueur, perso])
        }
    }
    const genererEquipeAdverse = () => {
        const equipe = [];
        for (let i = 0; i<5; i++){
            const indexAlea = Math.floor(Math.random() * PERSONNAGES.length);
            const bot = PERSONNAGES[indexAlea];
            equipe.push(bot);
        } 
        return equipe;

    }
    const lancerMelee = () =>{
        const adversaires = genererEquipeAdverse();
        setEquipeAdverse(adversaires);
        setPhase("preparation");
        setTimeout(() => setPhase("combat"),2000)
    };

    const gererFinMelee =( resultatFinal) =>{
        setBulles(prev => prev + resultatFinal.bullesGagnees);
        setResultat(resultatFinal);
        setPhase ("resultat");
    }

    return (
        <div className="page-arenaplou" >
            {!(phase === "combat" && mode === "melee") && <h1>L'Areneaplouf</h1>}
            <p>{bulles} bulles</p> {/* affiche le nombre de bulle*/}
            {phase === "combat" && mode === "melee" && (
                <button onClick={() => setVitesseRapide(v => !v)}>
                    {vitesseRapide ? " X1.0 " : " X2.0 "}
                </button>
            )}
        {/*choix mode*/}
        {mode === null && (
            <div className="choix-mode">
                <h2> Choisis ton mode de jeu : </h2>
                <button onClick = {()=>setMode ("joute")}>⚔️ Joute à la barrière </button>
                <button onClick = {() => setMode ("melee")}>🗡️ Mêlée</button>
            </div>
        )}
        {/*phase selection*/}
        {phase === "selection" && mode === "joute" && (
            <div className="selection">
             <h2>Choisis ton combattant ! </h2>
             <button onClick = {() => setMode(null)}>Retour</button>
                <div className = "grille-cartes">
                {carteUniques.map(p => (
                    <div key={p.id} onClick={() => lancerDuel (p)}>
                        <CartePersonnage personnage={p} tailleMini={true}/>
                    </div>
                ))}
                </div>
            </div>
        )}
        {phase === "selection"&& mode === "melee" && (
            <div className="selection-melee">
                <h2>Choisis tes combattants ! (5 max) </h2>
                <button onClick = {() => setMode (null)}>Retour</button>
                    <div className ="grille-cartes">
                        {carteUniques.map(p => (
                        <div
                            key={p.id}
                            onClick = {()=> toggleSelection(p)}
                            className={equipeJoueur.some(c=> c.id === p.id)? "carte-selectionnee" : ""}
                        >
                            <CartePersonnage personnage={p} tailleMini = {true}/>
                        </div>
                        ))}
                    </div>
                <button className="bouton-lancer-melee" disabled = {equipeJoueur.length ===0} onClick={()=> lancerMelee()}>
                    Lancer la Mélée
                </button>
            </div>
        )}
        {/*phase prépa*/}
        {phase === "preparation" && mode === "joute" && (
            <div className="preparation">
                <h2>⚔️ Le combat commence !</h2>
                <p>{carteChoisie?.nom} VS {carteAdversaire?.nom}</p>
            </div>
        )}
        {phase === "preparation" && mode === "melee" && (
            <div className="preparation">
                <h2>🗡️ La mêlée commence !</h2>
                <p>Ton équipe ({equipeJoueur.length}) VS l'équipe adverse (5)</p>
            </div>
        )}
        {/*phase combat*/}
        {phase === "combat" && mode === "joute" && resultat && (
            <div className="combat">
                {/* Joueur */}
                <div className="combattant">
                    <div
                        key={`joueur-${roundActuel}`}
                        className={!snapshot ? "" : (roundActuel % 2 === 0 ? "carte--attaque" : "carte--touche")}
                    >
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
                    <div
                        key={`adversaire-${roundActuel}`}
                        className={!snapshot ? "" : (roundActuel % 2 === 0 ? "carte--touche" : "carte--attaque")}
                    >
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
        {phase === "combat" && mode === "melee" && (
            <CombatMelee
                equipeJoueur={equipeJoueur}
                equipeAdverse={equipeAdverse}
                vitesseRapide={vitesseRapide}
                onTermine={gererFinMelee}
            />
        )}

        {/*resultat*/} 
        {phase === "resultat" && mode === "joute" && resultat && (
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
         {phase === "resultat" && mode === "melee" && resultat && (
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
                    setRoundActuel(0);
                    setEquipeJoueur([]);
                    setEquipeAdverse([]);
               }}>
                    Rejouer
                </button> 
            </div>
        )}
    </div>
    );
}


export default Arenaplouf
