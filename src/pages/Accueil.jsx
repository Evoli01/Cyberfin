import {useState} from 'react';
import { tirage } from '../utils/tirage';
import CartePersonnage from '../components/CartePersonnage';
import BoutonTirage from '../components/BoutonTirage';
import {PITY_MAX } from "../data/personnages.js";
import { useGacha } from '../context/GachaContext.jsx';

function Accueil() {
    const [animation, setAnimation] = useState(false);
    const { ajouterTirage, pityCounter, setPityCounter, carteDuJour} = useGacha();
    
    const lancerTirage = () => {
        setAnimation(true);

        //petit délais pour effet drama
        setTimeout(() => {
            const {personnage, nouveauPity} = tirage(pityCounter);
            setPityCounter(nouveauPity);
            ajouterTirage(personnage); //envoie dans le context global
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
                    <p className="pity-alert">⚡Légendaire très proche !</p>
                )}
            </div>
            <h1>Cyberfin</h1>
            <p>Auras-tu une bonne nageoire aujourd'hui?</p>

            <div>  
                <BoutonTirage onTirer={lancerTirage} />
  
            </div>

            {/* Affichage de la carte du jour avec animation */}
            {carteDuJour && !animation  && (
                <div className="resultat">
                    <h2> Vous avez pêché: </h2>
                    <CartePersonnage personnage={carteDuJour} estNouveau={true} />
                </div>
            )}
        </div>
    );
}
export default Accueil;