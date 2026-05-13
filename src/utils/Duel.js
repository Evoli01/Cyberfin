export function simulerDuel(carteJoueur, carteAdversaire) {
    //pvActuels de chaque combattant
    let pvJoueur = carteJoueur.pv;
    let pvAdversaire = carteAdversaire.pv;

    const rounds  = [];
    //boucle combat
    while (pvJoueur>0 && pvAdversaire>0) {
        
    
        //calcule des dégat
        const degatsJoueur= Math.max(carteJoueur.attaque - carteAdversaire.défense, 1 ) 
        const degatsAdversaire = Math.max(carteAdversaire.attaque - carteJoueur.défense, 1 )
        // constante pv temporaire
        pvJoueur = pvJoueur - degatsAdversaire;
        pvAdversaire -= degatsJoueur; //-= est un raccourcit de a=> a-b <=> a-=b 
        //sauvegarde de l'état apres dégat
        rounds.push ({
        pvJoueur :  pvJoueur,
        pvAdversaire : pvAdversaire,
        degatsJoueur : degatsJoueur,
        degatsAdversaire : degatsAdversaire,
        })
    }
    const gagnant = pvJoueur>0 ? "joueur" : "adversaire"

    let bullesGagnees = 0;
    if (gagnant === "joueur") {
        switch(carteAdversaire.rarete) {
            case "Commun" : bullesGagnees = 10 ; break;
            case "Rare" : bullesGagnees = 25 ; break;
            case "Légendaire" : bullesGagnees = 50; break;
        }
    }


    return { 
    rounds : rounds,
    gagnant : gagnant,
    bullesGagnees : bullesGagnees,
    }
}



