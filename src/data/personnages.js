// Liste des personnages 
export const PERSONNAGES = [
    {
        id: 1,
        nom: "Bugfish",
        rarete : "Rare",
        pv : 100,
        attaque: 60,
        défense: 40,
        emoji: "🐟",
        couleur: "#901adf",
        description: "Un poisson plein de bug mais attachiant !"
    },
    {
        id: 2,
        nom: "Hangaraie",
        rarete : "Commun",
        pv : 80,
        attaque: 50,
        défense: 10,
        emoji: "🦈",
        couleur: "#b1b4b4",
        description: "Une raie pleine de ressources!"

    },
    {
        id: 3,
        nom : "Bloupcoups",
        rarete : "Commun",
        pv : 80,
        attaque: 50,
        défense: 10,
        emoji: "🐙",
        couleur: "#b1b4b4",
        description: "L'Insolourdo des mécafichies !"
    },
    {
        id: 4,
        nom: "Narvalve hydrolique",
        rarete : "Légendaire",
        pv : 120,
        attaque: 75,
        défense: 55,
        emoji: "🐋",
        couleur: "#4d472b",
        description: "Le robocops des narvales !"

    },
    {
        id: 5,
        nom: "Cétabot",
        rarete : "Rare",
        pv : 100,
        attaque: 60,
        défense: 40,
        emoji: "🐬",
        couleur: "#901adf",
        description: "Une baleine joyeuse et sociable !"
    },
];
// probabilité par rarete
export const PROBABILITIES = {
    Légendaire: 1,
    Rare: 35,
    Commun: 50,
};
// Pity = nombre de tirage qui garantie le légendaire
export const PITY_MAX = 20;