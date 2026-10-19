import {useState, useEffect} from "react";
import {useGacha} from "../context/GachaContext.jsx"

function Connexion () {
    const [pseudoInscription,setPseudoInscription] = useState ("");
    const [emailInscription, setEmailInscription] = useState ("");
    const [mdpInscription, setMdpInscription] = useState ("");
    const [messageInscription, setMessageInscription] = useState ("");
    const [pseudoConnexion, setPseudoConnexion] = useState ("");
    const [mdpConnexion, setMdpConnexion] = useState ("");
    const [messageConnexion, setMessageConnexion] = useState("");
    const {setJoueurConnecte} = useGacha();


    const gererInscription = (e) => {
        e.preventDefault()
        fetch("http://localhost:5080/Joueur/inscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudo: pseudoInscription, email: emailInscription, motdepasse: mdpInscription }),
        })
           .then((reponse) => {
        if (reponse.ok) {
            setMessageInscription("Inscription réussie !");
        } else {
            reponse.text().then((texte) => setMessageInscription(texte));
        }
    });
    };

    const gererConnexion = (e) => {
        e.preventDefault()
        fetch("http://localhost:5080/Joueur/connexion", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({pseudo: pseudoConnexion, motdepasse: mdpConnexion}),
        })
        .then((reponse) => {
            if (reponse.ok) {
                setMessageConnexion("Connexion réussie !");
                reponse.json().then((joueur) => setJoueurConnecte(joueur));
            } else {
                reponse.text().then((texte) => setMessageConnexion(texte))
            }
        });
    };

   return (
        <div>
            <div>
                <form onSubmit={gererInscription}>
                    <input
                        value={pseudoInscription}
                        onChange = {(e) => setPseudoInscription(e.target.value)}
                        placeholder = "Pseudo"
                    />

                    <input
                        value = {emailInscription}
                        onChange = {(e) => setEmailInscription(e.target.value)}
                        placeholder = "prenom.nom@gmail.com"
                    />

                    <input
                        type = "password"
                        value = {mdpInscription}
                        onChange = {(e) => setMdpInscription(e.target.value)}
                        placeholder = "motdepasse"
                    />

                    <button type ="submit">S'inscrire</button>

                </form>
                
                <p>{messageInscription}</p>
            </div>

            <div>
                <form onSubmit={gererConnexion}>
                    <input
                    value={pseudoConnexion}
                    onChange = {(e) => setPseudoConnexion(e.target.value)}
                    placeholder = "Pseudo"
                    />

                    <input
                        type="password"
                        value={mdpConnexion}
                        onChange= {(e) => setMdpConnexion(e.target.value)}
                        placeholder = "mot de passe"
                    />
                    <button type="submit">Connexion</button>
                </form>
                <p>{messageConnexion}</p>
            </div>
        </div>
    )
}

export default Connexion;