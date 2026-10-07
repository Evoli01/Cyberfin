import {PERSONNAGES} from "./personnages.js";

export const MAPS = [
    {
        id: 1,
        nom: "Citronnelle",
        image : "/maps/citronelle.png",
        pnjs: [
            {
                id : 1,
                nom: "Opisthon",
                position: {x: 26, y: 70},
                image: "/pnj/opisthon.png",
                tailleIcone: 40,
                dialogue : {
                    debut : {
                        texte : "*Opisthon s'affaire à reboucher le cratère, il semble concentré sur sa tâche.",
                        
                        choix: [
                            {texte: "je devrai le laisser travailler tranquille", suivant:"quitter"},
                            {texte: "Bonjour!", suivant: "reprimande"},
                        ]
                    },
                    quitter : {
                        texte : "vous continuez votre chemin vers les porte de Citronnelle",
                        fin : true,
                    },
                    reprimande : {
                        texte : "Nom d'un écrou rouillé, reculez ! Vous me faites perdre le fil de mes soudures ! Dégarpissez!",
                        declenche: "aParlerAOpisthon",suivant :"quitter" 
                    },
                }
            },
            {
                id: 2,
                visibleSi: "aParlerAOpisthon",
                etapesDialogue: [
                    {si: "aAiderDameNoirel", alors :"retourChasseCrevette"},
                ],
                nom: "Amiral",
                position: {x: 40, y: 48},
                image : "/pnj/amiral.png",
                tailleIcone: 140,
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
                    victoire2 : {
                        texte: "Mais avant, pourrais-tu aller voir Dame-Noirel, l'éleveuse au nord d'ici.",
                        suivant :"victoire3",
                    },
                    victoire3 : {
                        texte: "Avec ma garde de nuit je n'aurai pas le temps de voir si tout va bien pour elle.",
                        suivant:"victoire4",
                    },
                    victoire4: {
                        texte : "As-tu des question ?",
                        declenche : "queteRencontrerDameNoirel",
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
                    },
                    retourChasseCrevette: {
                        texte : "La nuit est tombée, l'eau fraiche cours sur mes écailles, je nage tranquillement le long du mur pour profiter de l'éclairage",
                        narrateur: true,
                        image : "/maps/mur_citronelle_Nuit.png",
                        suivant: "grosBruit",
                    },
                    grosBruit: {
                        texte : "*BOUM*", /*ecran qui tremble*/
                        narrateur : true,
                        image : "/maps/mur_citronelle_Nuit.png",
                        suivant: "arriveeAmiral"
                    },
                    arriveeAmiral: {
                        texte : "Aidez-moi !! il s'est passée quelque chose de terrible",
                        choix : [
                            {texte : "Amiral, calme toi et raconte moi ce qu'il s'est passée", suivant:"arriveeAmiral2"},
                            {texte : "Doucement l'ami, que s'est-il passé?", suivant : "arriveeAmiral2",}
                        ],
                        image : "/maps/mur_citronelle_Nuit.png",
                    },
                    arriveeAmiral2: {
                        texte: "Mon ami et moi étions en train de nous raconter notre patrouille, quand tout a d'un coup de la neige marine est tombée du ciel, et c'est la que ca à commencer...",
                        suivant: "flashBack",
                        image: "/maps/porte-flashback.png",
                    },
                    flashBack: {
                        texte: "lorsque ces flocons ont toucher mon ami, il a comme dijoncter! Ses yeux ont clignoter, puis ce sont eteins, comme s'il était deconnecter. puis il m'as sauter dessus ! je n'ai pas eu le..le choix! je vous en pris aider moi !!",
                         choix: [
                            {texte: "Nous devons prévenir les gardes, ils faut leur expliquer ce qu'il s'est passé", suivant: "arriveeGardes" },
                        ],
                        image: "/maps/porte-flashback.png",
                    },
                    arriveeGardes : {
                        texte : "Apres avoir prévenue les gardes, ils sont venus sur le lieux de l'accident puis nous ont ramener a la brigade pour nous interroger",
                        declenche : "arriveeBrigade",
                        narrateur : true,
                        fin : true,

                    },
                }
            },
            {
                id: 3,
                visibleSi:"queteRencontrerDameNoirel",
                nom: "Dame-Noirel",
                position: {x:18, y:15},
                image: "/pnj/dame-noirel.png",
                tailleIcone: 95,
                dialogue : {
                    debut : {
                        texte : "*Dame-Noirel s'affaire dans ses champs d'algue et de crevettes*",
                        choix : [
                            {texte: "Je devrai la laisser travailler", suivant: "quitter"},
                            {texte: "Bonjour, c'est Amiral qui m'envoie !", suivant: "parler"},
                        ]
                    },
                    quitter : {
                        texte : "Retourne vers les portes de Citronnelle",
                        fin : true,
                    },
                    parler : {
                        texte : "Bien l'bonjour étranger, quel est ton nom et que c'que tu viens faire là ?",
                        choix : [
                            {texte : "Je m'appelle XXX, Amiral m'envoie aux nouvelles, il n'aura pas le temps avant sa garde", suivant: "parler2"},
                            {texte : "Je m'appelle XXX et je viens vérifier que tout va bien.", suivant: "parler2"},
                        ]
                    },
                    parler2 : {
                        texte : "Et bien ecoutez, ca pourrait aller mieux. Voyez vous ces crevettes sont nouvelles ici et elle ne veulent pas quitter le champs.",
                        suivant: "parler3",
                    },
                    parler3 : {
                        texte : "Est ce que vous pourriez m'aider s'il vous plait ? ",
                        choix : [
                            {texte :"Bien-sur, allons a la chasse aux crevettes", suivant : "chasse",},
                        ]
                    },
                    chasse: {
                        texte : "vous partez chasser les crevette avec Dame-Noirel et en profitez pour faire plus amble connaissance... Plusieurs heures se sont écoulées maintenant... Vous devriez retourner aux portes de Citronnelle",
                        declenche : "aAiderDameNoirel",
                        narrateur: true,
                        image : "/maps/chasse-crevettes.png",
                        suivant: "partir",
                    },
                    partir : {
                        texte : "Vous saluez Dame-Noirel et repartez d'ou vous veniez",
                        fin : true,
                    },
                }
            },
        ]
    }

]