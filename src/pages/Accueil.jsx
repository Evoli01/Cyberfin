import {useEffect, useState} from 'react';
import { tirage } from '../utils/tirage';
import CartePersonnage from '../components/CartePersonnage';
import BoutonTirage from '../components/BoutonTirage';
import {PITY_MAX } from "../data/personnages.js";
import { useGacha } from '../context/GachaContext.jsx';

function Accueil() {
    const [animation, setAnimation] = useState(false);
    const {ajouterTirage, pityCounter, setPityCounter, carteDuJour} = useGacha();
    const[cartesEnCours, setCartesEnCours] = useState([]);
    const [indexActuel, setIndexActuel] = useState(0);

    useEffect(() => {
        if (cartesEnCours.length === 0) return;
        if (indexActuel >= cartesEnCours.length - 1) return;

        const timer = setTimeout(() => {
            setIndexActuel(prev => prev + 1);
        }, 1500); // délai de 1.5 secondes entre chaque carte
        return () => clearTimeout(timer); // nettoyage du timer
    }, [indexActuel, cartesEnCours]);

    const lancerTirage = (nbTirages = 1) => {
        setAnimation(true);

        //petit délais pour effet drama
        setTimeout(() => {
            //1. calculer toutes les cartes en chaine
            let pity = pityCounter;
                const cartesCalculees = [];
                for(let i = 0; i < nbTirages; i++) {
                    const {personnage, nouveauPity} = tirage(pity);
                    pity = nouveauPity;
                    cartesCalculees.push(personnage);
                }
            //2. Tout sauvegarder d'un coup
            setPityCounter(pity);
                cartesCalculees.forEach(p => ajouterTirage(p));
            //3. Lancer l'affichage 1 par 1 
            setCartesEnCours(cartesCalculees);
            setIndexActuel(0);
            setAnimation(false);
            }, 1500);
        };

    return (
        <div className="page-accueil">
            <h1>Pêche du jour</h1>
            {/* Indication du pity */}
            <div className="pity-bar">
                <p> Pity: {pityCounter} / {PITY_MAX} </p>
                <div className="pity-bar__fond">
                    <div 
                        className="pity-bar__progress"
                        style={{ width: `${(pityCounter / PITY_MAX) * 100}%` }}
                    />
                </div>
                {pityCounter >= 18 && (
                    <p className="pity-alert">⚡legendaire très proche !</p>
                )}
            </div>
            <h1>Cyberfin</h1>
            <p>Auras-tu une bonne nageoire aujourd'hui?</p>

            <div>  
                <BoutonTirage onTirer={lancerTirage} />
  
            </div>

            {/* Affichage de la carte */}
            {cartesEnCours.length > 0 && !animation  && (
                <div className="resultat">
                    <h2> Vous avez pêché: </h2>
                    <CartePersonnage personnage={cartesEnCours[indexActuel]} estNouveau={true} />
                    <p> {indexActuel + 1} / {cartesEnCours.length} </p>
                </div>
            )}
        </div>
    );
}
export default Accueil;