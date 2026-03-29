// Liste des personnages 
export const PERSONNAGES = [
    {
        id: 1,
         nom: "Bugfish",
          rarete : "Rare",
           attaque: 60,
           défense: 40,
    },
    {
        id: 2,
        nom: "Hangaraie",
        rarete : "Commun",
        attaque: 50,
        défense: 10,
    },
    {
        id: 3,
        nom : "Bloupcoups",
        rarete : "Commun",
        attaque: 50,
        défense: 10,
    },
    {
        id: 4,
        nom: "Narvalve hydrolique",
        rarete : "Légendaire",
        attaque: 75,
        défense: 55,
    },
    {
        id: 5,
        nom: "Cétabot",
        rarete : "Rare",
        attaque: 60,
        défense: 40,
    },
];
// probabilité par rarete
export const PROBALITIES = {
    Légendaire: 1,
    Rare: 35,
    Commun: 50,
};
// Pity = nombre de tirage qui garantie le légendaire
export const PITY_MAX = 20;