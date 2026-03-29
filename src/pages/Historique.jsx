import { useGacha } from "../context/GachaContext";

function Historique() {
    const { historique } = useGacha();

    const formatDate = (ISO) => {  
        const d = new Date(ISO);
        return d.toLocaleDateString( "fr-FR", {
         year: "numeric", month: "long", day: "numeric",
         hour: "2-digit", minute: "2-digit",
        });
    };

    return (
        <div className="page">
            <h1>Historique</h1>
            <p>Votre registre de pêche</p>
            {historique.length === 0 ? (
                <p className="vide">Feignant tu n'a rien fait ! Vas pêcher! </p>
            ) : (
                <ul className= "historique-liste">
                    {historique.map(entree => (
                        <li key={entree.id} className="historique-entree">
                            <span className="historique-nom">{entree.personnage.nom}</span>
                            <span className="historique-date">{formatDate(entree.date)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Historique;