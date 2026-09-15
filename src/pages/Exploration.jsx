import {useState,useEffect} from "react";
import {useGacha} from "../context/GachaContext";
import CartePersonnage from "../components/CartePersonnage";
import "./Exploration.css";
import {MAPS} from "../data/maps";


function Exploration() {
    const [equipeActive , setEquipeActive] = useState ([null,null,null,null,null]);
    const [afficherEquipe, setAfficherEquipe] = useState (false);
    const {inventaire} = useGacha();
    const [emplacementEnEdition, setEmplacementEnEdition]=useState(null);
    const [pnjActif,setPnjActif] = useState(null);
    const [noeudActuel,setNoeudActuel]=useState("debut")
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
    )

    const avancerDialogue = (idSuivant) => {
    if (idSuivant === "combat") {
        // TODO : on gérera le déclenchement du combat à l'étape suivante
        console.log("Combat à venir !");
    } else {
        setNoeudActuel(idSuivant);
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
        <div className="carte-exploration">
            {mapActuelle.pnjs.map(pnj=>(
                <div
                    key={pnj.id}
                    className="marqueur-pnj"
                    style={{ left : `${pnj.position.x}%`, top:`${pnj.position.y}%`}}
                    onClick={()=>{
                        setPnjActif(pnj);
                        setNoeudActuel("debut");
                    }}
                >
                    {pnj.nom}
                </div>
            ))}
            {pnjActif && (
            <div className="boite-dialogue">
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
 )};
export default Exploration;