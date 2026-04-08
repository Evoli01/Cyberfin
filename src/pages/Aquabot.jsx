import { useState } from "react";
import { useGacha } from "../context/GachaContext";
import CartePersonnage from "../components/CartePersonnage";
import { PERSONNAGES } from "../data/personnages";
import { PROBABILITIES } from "../data/personnages";
import "./Aquabot.css";



const RARETE_OPTIONS = ["Tous", "Légendaire", "Rare", "Commun"];


function Aquabot () {
    const { inventaire, stats } = useGacha();
    const [filtre, setFiltre] = useState("Tous");
    const [possedes, setPossedes] = useState(true); //true = que les possédés, false = tous les personnages

    //Dédoublonner l'inventaire pour n'avoir que les personnages uniques
    const carteUniques = inventaire.filter(
        (p, index, self) => self.findIndex(c => c.id === p.id) === index
    );

    const cartesFiltrees = filtre === "Tous" 
    ? carteUniques 
    : carteUniques.filter(p => p.rarete === filtre);

    const personnagesFiltrees = filtre === "Tous" 
    ? PERSONNAGES 
    : PERSONNAGES.filter(p => p.rarete === filtre);

    return (
        <div className="page">
            <h1>Mes mécafishies </h1>
            <p> Tes mécafishies </p>

            {/*stats*/}
            <div className="stats-bande">
                <span>Total collecté: {stats.total} </span><br />
                <span>Légendaires: {stats.legendaire} </span><br /> 
                <span>Rares: {stats.rare} </span><br /> 
                <span>Communes: {stats.commune} </span>
            </div>

            {/*filtres*/}
            <div className = "filtres__possession">
                <button
                 onClick={() => setPossedes(true)} className={possedes ? "filtre--actif" : "filtre"}> Possédés </button>
                <button
                 onClick={() => setPossedes(false)} className={!possedes ? "filtre--actif" : "filtre"}> Tous </button>
            </div>

            <div className="filtres__rarete">
                {RARETE_OPTIONS.map(option => (
                    <button
                        key={option}
                        onClick={() => setFiltre(option)}
                        className={filtre === option ? "filtre--actif" : "filtre"}
                     >
                        {option}
                    </button>
                ))}
            </div>

            <div className="compteur-carte-decouverte"> 
                {possedes ? (
                    <p> {cartesFiltrees.length} mécafishies découverts / {PERSONNAGES.length} mécafishies !</p>
                ) : (
                    <p> {personnagesFiltrees.length} mécafishies au total </p>
                )}
            </div>

            {/*grille des cartes*/}
            {possedes ?
                    cartesFiltrees.length === 0 ? (
                        <p className="vide"> Aucun mécafish découvert, nage encore ! </p>
                    ) : (
                        <div className="grille-cartes">
                            {cartesFiltrees.map(p => (
                                <CartePersonnage key={p.id} personnage={p} tailleMini={true} />
                            ))}
                        </div>
                    )
                : 
                    personnagesFiltrees.length === 0 ? (
                        <p className="vide"> Aucun mécafish découvert, nage encore ! </p>
                    ) : (
                        <div className="grille-cartes">
                            {personnagesFiltrees.map(p => (
                                <CartePersonnage key={p.id} personnage={p} tailleMini={true} />
                            ))}
                        </div>
                    )
            }
            <div className="probabilite-rarete">
                <h2>Probabilités de pêche</h2>
                <ul class="liste-sans-puce">
                    <li>Légendaire : {PROBABILITIES.Légendaire}%</li>
                    <li>Rare : {PROBABILITIES.Rare}%</li>
                    <li>Commun : {PROBABILITIES.Commun}%</li>
                </ul>
            </div>
        </div>
    );
}

export default Aquabot;