import "./CartePersonnage.css";
function CartePersonnage({ personnage, estNouveau = false, tailleMini = false, copies = null, carteOuverteID, setCarteOuverteID }) {
  const { nom, rarete, attaque, defense, emoji, couleur, description } = personnage;
  const estOuverte = carteOuverteID === personnage.id;

  return (
    <div
      className={`carte carte--${rarete.toLowerCase()} ${
        tailleMini ? "carte--mini" : "" } ${estOuverte ? "carte--ouverte" : ""}`}
      style={{ "--couleur-rarete": couleur }}
      onClick={() => tailleMini && setCarteOuverteID(
        carteOuverteID === personnage.id ? null : personnage.id
      )}
    >
      {/* Badge NOUVEAU sur les cartes fraîchement tirées */}
      {estNouveau && <span className="carte__badge">✨ NOUVEAU</span>}

      {/*nombre de copie*/}
      {copies > 1 && <span className="carte__copies">x{copies}</span>}

      {/* Illustration (emoji en attendant de vraies images) */}
      <div className="carte__illustration">{emoji}</div>

      {/* Rareté */}
      <span className="carte__rarete">{rarete}</span>

      {/* Identité */}
      <h3 className="carte__nom">{nom}</h3>

      {/* Description (masquée en mode mini) */}
      <p className="carte__description">{description}</p>

      {/* Stats */}
      <div className="carte__stats">
        <div className="stat">
          <span className="stat__icone">⚔️</span>
          <span className="stat__value">{attaque}</span>
        </div>
        <div className="stat">
          <span className="stat__icone">🛡️</span>
          <span className="stat__value">{defense}</span>
        </div>
      </div>
    </div>
  );
}

export default CartePersonnage;