import { PERSONNAGES, PROBALITIES, PITY_MAX} from "../data/personnages.js";

//Étape 1 :determine la rarete selon la probabilité
const determinerRarete = (pityCounter) => {
    //si compteurpity >= PITY alors on garantie un légendaire
    if (pityCounter >= PITY_MAX)
        return "Légendaire";
    const jet = Math.random() * 100;
    let cumul = 0;

    // on parcourt les raretés par ordre de rareté décroissante
    const ordreRarete = ["Légendaire", "Rare", "Commun"];
    for (const rarete of ordreRarete) {
        cumul += PROBALITIES[rarete];
        if (jet <= cumul) {
            return rarete;
        }
    }
    return "Commun"; // Fallback, should not happen if probabilities sum to 100
};

//Étape 2 : tirer un personnage de la rareté déterminée
const tirerPersonnage = (rarete) => {
    const candidats = PERSONNAGES.filter(p => p.rarete === rarete);
    return candidats[Math.floor(Math.random() * candidats.length)];
};

//fonction principale de tirage
export const tirage = (pityCounter) => {
    const rarete = determinerRarete(pityCounter);
    const personnage = tirerPersonnage(rarete);

    //Si légendaire est tiré, on reset le pity counter
    const nouveauPity = rarete === "Légendaire" ? 0 : pityCounter + 1;

    return {personnage, nouveauPity};
};