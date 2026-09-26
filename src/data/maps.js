import {PERSONNAGES} from "./personnages.js";

export const MAPS = [
    {
        id: 1,
        nom: "Citronnelle",
        image : "/maps/citronelle.png",
        pnjs: [ 
            {
                id: 1,
                nom: "Amiral",
                position: {x: 38, y: 48},
                equipe: [PERSONNAGES.find(p => p.nom === "Bloupcoups")],
                dialogue: {
                    debut : {
                        texte : "Bonjour, je suis Amiral! Bienvenue a Citronnelle, la seule ville au monde où l'on a le coup de foudre... et des aigreurs d'estomac en même temps ! ",
                        suivant : "phrase2"
                    },
                    phrase2 : {
                        texte : "Ici l'acide citrique ampli l'eau ambiante, heuresement le zinc dont on est renforcés nous permet de nous protégés !",
                        suivant : "phrase3"
                    },
                    phrase3 : {
                        texte : "Pour te laisser continuer, je me dois de verifiés si tu as la résitance nécéssaire pour t'aventurer dans notre ville ! *clins d'oeil* Tu es prêt ?!",
                        choix : [
                            { texte: "Prêt à en dissoudre avec toi ! ", suivant: "accepte"},
                            { texte: "La vie est elle agréable ici ?", suivant: "parler"},
                            { texte: "Pas tout à fais...", suivant: "quitter"},
                        ]
                    },
                    accepte : {
                        texte: "Alors c'est partit !!!",
                        suivant: "combat"
                    },
                    parler : {
                        texte: "Située près d'une cheminée d'acide, cette bourgade ne manque pas de piquant.",
                        suivant: "suitedescription"
                    },
                    suitedescription : {
                        texte : " Ici, l'air ambiant fait constamment plisser les yeux et le sol jaune fluo est si corrosif qu'il nettoie vos écailles en trois coup de nageoires",
                        suivant: "phrase3"
                    },
                    quitter: {
                        texte: "T'en fais pas, Citronnelle ne va pas s'enfuir, prends ton temps.",
                        fin : true
                    },
                    victoire: {
                        texte:"bien joué, tu peux maintenant entrer à Citronelle",
                        suivant : "victoire2",
                    },
                    victoire2: {
                        texte : "As-tu des question ?",
                        choix : [
                            {texte: "La vie est elle agréable ici ?", suivant: "parler"},
                            {texte: "Pas tout à fais...", suivant: "quitter"},
                        ]
                    },
                    defaite: {
                        texte: "Dommage... Veux tu réessayer?",
                        choix: [
                            { texte: "Oui !", suivant: "accepte"},
                            { texte: "Non...", suivant: "quitter"},
                        ]
                    }
                }
            },
        ]
    }

]