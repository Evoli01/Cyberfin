import {useGacha} from "../context/GachaContext"

function AfficheListePerso () {

const {personnages} = useGacha(); 
return personnages.map(p => (
    <p key = {p.id}>{p.nom}</p> 
));
}
export default AfficheListePerso;