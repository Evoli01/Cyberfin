export function simulerDuel(carteJoueur, carteAdversaire) {
    //pvActuels de chaque combattant
    let pvJoueur = carteJoueur.pv;
    let pvAdversaire = carteAdversaire.pv;

    const rounds  = [];
    //boucle combat
    while (pvJoueur>0 && pvAdversaire>0) {
        
    
        //calcule des dégat
        const degatsJoueur= Math.max(carteJoueur.attaque - carteAdversaire.defense, 1 ) 
        const degatsAdversaire = Math.max(carteAdversaire.attaque - carteJoueur.defense, 1 )
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
            case "legendaire" : bullesGagnees = 50; break;
        }
    }


    return { 
    rounds : rounds,
    gagnant : gagnant,
    bullesGagnees : bullesGagnees,
    }
}

export function simulerMelee (persosJoueur, persosBots) {
    let equipeJoueur = preparerCombattants(persosJoueur,"joueur");
    let equipeBots = preparerCombattants(persosBots,"bot");

    const rounds=[];
    while (equipeJoueur.some(c => c.vivant ===true)&&equipeBots.some(c => c.vivant === true)) {
        //ici chaque combattant vivant va attaquer
        const combattants = [...equipeJoueur,...equipeBots];

        for (const attaquant of combattants){
            if (!attaquant.vivant) continue; //si meur avant son tour il saute. 

            const ennemis = attaquant.equipe === "joueur" ? equipeBots : equipeJoueur;
            const ciblesVivantes = ennemis.filter(c => c.vivant);
            if (ciblesVivantes.length === 0) break; //plus de combattant vivant en face l'équipe est vaincu

            const indexAlea = Math.floor(Math.random() * ciblesVivantes.length);
            const cible = ciblesVivantes[indexAlea];

            const degats = Math.max(attaquant.attaque-cible.defense,1);
          console.log("attaquant:", attaquant, "cible:", cible);
            cible.pv -= degats;
            if (cible.pv <=0) {
                cible.pv = 0 ;
                cible.vivant = false;
            }
            rounds.push({
                combattants : combattants.map(c=>({id : c.id, pv: c.pv, vivant : c.vivant})),
                attaques : [{attaquantId : attaquant.id, cibleId : cible.id, degats}],
            });
        }
    }
    //determine le gagnant
    const gagnant = equipeJoueur.some(c => c.vivant)? "joueur" : "adversaire";

    let bullesGagnees = 0
    if (gagnant === "joueur") {
        for (const bot of equipeBots) {
            if (!bot.vivant) {
                switch (bot.rarete) {
                    case "Commun" : bullesGagnees += 10; break;
                    case "Rare" : bullesGagnees += 25; break;
                    case "legendaire" : bullesGagnees += 50; break;
                }
            }
        }
    }
    return {
        rounds,
        gagnant,
        bullesGagnees
    }
}

function preparerCombattants (equipe, nomEquipe) {
    return equipe.map((perso, index)=> ({
        id:`${nomEquipe} -${index}`,
        nom: perso.nom,
        rarete : perso.rarete,
        pv: perso.pv,
        attaque : perso.attaque,
        defense : perso.defense,
        equipe: nomEquipe,
        vivant : true, 
    }));
}