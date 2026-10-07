import {useState,useEffect} from "react";
import {useGacha} from "../context/GachaContext";
import CombatMelee from "../components/CombatMelee";
import CartePersonnage from "../components/CartePersonnage";
import "./Exploration.css";
import {MAPS} from "../data/maps";


function Exploration() {
    const [afficherEquipe, setAfficherEquipe] = useState (false);
    const [emplacementEnEdition, setEmplacementEnEdition]=useState(null);
    const [enCombat,setEnCombat]=useState(false);
    const [equipeActive , setEquipeActive] = useState ([null,null,null,null,null]);
    const {inventaire} = useGacha();
    const [noeudActuel,setNoeudActuel]=useState("debut");
    const [pnjActif,setPnjActif] = useState(null);
    const [progression, setProgression] = useState({})
    const [vitesseRapide, setVitesseRapide] = useState(false);
    const mapActuelle = MAPS[0];
    
    useEffect(() =>{
        const equipeActiveSauvegarder = localStorage.getItem("equipeSauvegarder");
        if (equipeActiveSauvegarder) {
            setEquipeActive(JSON.parse(equipeActiveSauvegarder));
        }
    }, []);
    
    useEffect (() => {
        localStorage.setItem("equipeSauvegarder", JSON.stringify(equipeActive));
    },[equipeActive]);   
    
    useEffect(() => {
        const progressionSauvegarder = localStorage.getItem("progressionSauvegarder");
        if (progressionSauvegarder) {
            setProgression(JSON.parse(progressionSauvegarder));
        }
     }, []);

     useEffect (() => {
        localStorage.setItem("progressionSauvegarder", JSON.stringify(progression));
     }, [progression]);
    
    const definirEmplacement = (index,perso) => {
        setEquipeActive(prev=>prev.map((caseActuelle, position) => {
            if (position !== index) {
                return caseActuelle;
            }
            return (caseActuelle === null ? perso : null);
            
        }));
    };

    const persoUnique =(
        inventaire.filter((perso,index) => inventaire.findIndex(p => p.id === perso.id) === index)
    );

    const avancerDialogue = (idSuivant) => {
        if (idSuivant === "combat") {
        // TODO : on gérera le déclenchement du combat à l'étape suivante
            return setEnCombat(true);
        } else {
            entrerDialogue(pnjActif,idSuivant);
        }
    };
    
    const gererFinCombat = (resultat) => {
        setEnCombat(false);
        entrerDialogue (pnjActif, resultat.gagnant === "joueur" ? "victoire" : "defaite");
    };

    const imageActuelle =(pnjActif ? pnjActif.dialogue[noeudActuel].image || mapActuelle.image  : mapActuelle.image );

    const noeudDeDepart = (pnj) => {
        if (!pnj.etapesDialogue) {
            return "debut";
        }
        const etape = pnj.etapesDialogue.find (e => progression[e.si]);
        return etape? etape.alors : "debut";
    };

    function entrerDialogue (pnj,idNoeud) {
        setPnjActif(pnj);
        setNoeudActuel(idNoeud);
        const noeud = pnj.dialogue[idNoeud];
        if (noeud.declenche) {
            setProgression (prev => ({...prev, [noeud.declenche]: true }));
        } 
    };
    

 return(
    <div>
        {afficherEquipe && 
            <div className = "grille-equipe">
                {emplacementEnEdition !== null && (
                    <div className="choix-perso">
                        {persoUnique.map(perso => (
                            <div key={perso.id} onClick={() => {
                                definirEmplacement(emplacementEnEdition,perso);
                                setEmplacementEnEdition(null);
                            }}>
                                <CartePersonnage personnage={perso} tailleMini={true}/>
                            </div>
                        ))}
                    </div>
                )}
                {equipeActive.map((perso,index) => (
                    <div key={index} className="emplacement" onClick={()=>{
                        if (perso) {
                            definirEmplacement(index,perso);
                        }
                        else {
                            setEmplacementEnEdition(index);
                        }
                    }}>
                        {perso ? (
                            <CartePersonnage personnage={perso} tailleMini={true}/>
                        ) : (
                            <span className = "emplacement-vide">+</span>
                        )}
                    </div>
                 ))} 
            </div>
        }
        <button className="bouton-equipe" onClick={()=> setAfficherEquipe(!afficherEquipe)}>Equipe</button>
        <div className={`scene-exploration ${progression.aAiderDameNoirel ? "scene-exploration--nuit" : ""}`}>
            <div className="scene-exploration__flou" style={{ backgroundImage:`url(${imageActuelle})`}}> </div>
            <div className = "carte-exploration">
                <img className={`carte-exploration__nette ${noeudActuel === "grosBruit" ? "carte-exploration__nette--secousse" : ""}`} src={imageActuelle} alt={mapActuelle.nom}/>
                {pnjActif && noeudActuel==="arriveeAmiral" && (
                    <img className="portrait-entree" src={pnjActif.image} alt = {pnjActif.nom}></img>
                )}
                {noeudActuel === "flashBack" && (
                    <div className="neige">
                        {[
                            { gauche: 2, taille: 3, delai: 0, duree: 4.2 },
                            { gauche: 5, taille: 5, delai: 1.4, duree: 3.1 },
                            { gauche: 9, taille: 2, delai: 2.6, duree: 5.4 },
                            { gauche: 13, taille: 6, delai: 0.6, duree: 2.8 },
                            { gauche: 17, taille: 3, delai: 3.1, duree: 4.6 },
                            { gauche: 21, taille: 4, delai: 1.9, duree: 3.6 },
                            { gauche: 25, taille: 2, delai: 0.2, duree: 5.1 },
                            { gauche: 29, taille: 7, delai: 2.3, duree: 2.6 },
                            { gauche: 33, taille: 3, delai: 0.9, duree: 4.4 },
                            { gauche: 37, taille: 5, delai: 3.4, duree: 3.3 },
                            { gauche: 41, taille: 2, delai: 1.1, duree: 5.6 },
                            { gauche: 45, taille: 4, delai: 2.8, duree: 3.9 },
                            { gauche: 49, taille: 6, delai: 0.4, duree: 2.9 },
                            { gauche: 53, taille: 3, delai: 1.7, duree: 4.8 },
                            { gauche: 57, taille: 2, delai: 3.6, duree: 5.2 },
                            { gauche: 61, taille: 5, delai: 0.8, duree: 3.4 },
                            { gauche: 65, taille: 4, delai: 2.1, duree: 4.1 },
                            { gauche: 69, taille: 7, delai: 1.3, duree: 2.7 },
                            { gauche: 73, taille: 3, delai: 3.9, duree: 4.7 },
                            { gauche: 77, taille: 2, delai: 0.5, duree: 5.3 },
                            { gauche: 81, taille: 5, delai: 2.5, duree: 3.2 },
                            { gauche: 85, taille: 4, delai: 1.6, duree: 4.3 },
                            { gauche: 89, taille: 6, delai: 3.2, duree: 2.9 },
                            { gauche: 93, taille: 3, delai: 0.1, duree: 4.9 },
                            { gauche: 97, taille: 2, delai: 2.9, duree: 5.5 },
                            { gauche: 7, taille: 4, delai: 1.2, duree: 3.7 },
                            { gauche: 19, taille: 2, delai: 3.3, duree: 5.0 },
                            { gauche: 31, taille: 5, delai: 0.7, duree: 3.0 },
                            { gauche: 43, taille: 3, delai: 2.4, duree: 4.5 },
                            { gauche: 55, taille: 6, delai: 1.5, duree: 2.5 },
                            { gauche: 67, taille: 2, delai: 3.7, duree: 5.7 },
                            { gauche: 79, taille: 4, delai: 0.3, duree: 3.8 },
                            { gauche: 91, taille: 3, delai: 2.2, duree: 4.0 },
                        ].map((flocon, index) => (
                            <div
                                key={index}
                                className="flocon"
                                style={{
                                    left: `${flocon.gauche}%`,
                                    width: `${flocon.taille}px`,
                                    height: `${flocon.taille}px`,
                                    animationDelay: `${flocon.delai}s`,
                                    animationDuration: `${flocon.duree}s`,
                                }}
                            ></div>
                        ))}
                    </div>
                )}
                {noeudActuel === "flashBack" && (
                    <>
                        <div className="lueur-yeux" style={{ left: "77.6%", top: "49%" }}></div>
                        <div className="lueur-yeux" style={{ left: "74.1%", top: "49.1%" }}></div>
                    </>
                )}
                {(!pnjActif || !pnjActif.dialogue[noeudActuel].image) && (mapActuelle.pnjs.filter(pnj => !pnj.visibleSi || progression[pnj.visibleSi]===true).map(pnj=>(
                    <div
                        key={pnj.id}
                        className="marqueur-pnj"
                        style={{ left : `${pnj.position.x}%`, top:`${pnj.position.y}%`}}
                        onClick={()=>{
                            entrerDialogue(pnj, noeudDeDepart(pnj));
                        }}
                    >
                       <img className="icone_pnj_map" style={{  width : `${pnj.tailleIcone}px`}} src={pnj.image} alt= {pnj.nom}/>
                    </div>
                ))
            )}
                {pnjActif && !enCombat && (
                <div className="boite-dialogue">
                    <div className="badge-dialogue">
                    
                    <p>{pnjActif.dialogue[noeudActuel].narrateur ? (
                       "Narrateur") : (
                        pnjActif.nom)
                        }
                    </p>
                    </div>
                    <p>{pnjActif.dialogue[noeudActuel].texte}</p>

                    {pnjActif.dialogue[noeudActuel].choix && (
                        pnjActif.dialogue[noeudActuel].choix.map((option,i)=>(
                            <button key={i} onClick = {()=> avancerDialogue(option.suivant)}>
                                {option.texte}
                            </button>
                        ))
                    )}

                    {pnjActif.dialogue[noeudActuel].fin && (
                        <button onClick={()=>setPnjActif(null)}> fermer </button>
                    )}

                    {pnjActif.dialogue[noeudActuel].suivant && !pnjActif.dialogue[noeudActuel].choix&& (
                        <button onClick = {()=> avancerDialogue(pnjActif.dialogue[noeudActuel].suivant)}>Suivant</button>
                    )}
                </div>
            )}

            
        </div>
        </div>
        {enCombat &&
        <div className="combat-overlay">
            {enCombat && (
                <CombatMelee
                    equipeJoueur={equipeActive.filter( p=> p !== null)}
                    equipeAdverse={pnjActif.equipe}
                    vitesseRapide={vitesseRapide}
                    onTermine={gererFinCombat}
                />
            )}
        </div>}
    </div>
 )};
export default Exploration;