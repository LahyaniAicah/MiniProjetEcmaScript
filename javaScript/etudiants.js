import { URL } from "./url.js"

export class Etudiant{
    constructor(nom,note){
        this.nom=nom
        this.note=note
    }

    static listEtudiants = async function(){
        let etudiants = await fetch(URL)
                        .then(response => response.json())
        return etudiants
      
    }

    

    static addEtudiant = async function() {
        // Étape 1 : Récupérer la liste des étudiants existants
        const response = await fetch(URL);
        const data = await response.json();
        // Étape 2 : Trouver le plus grand ID
        const maxId = data.reduce((max, etudiant) => Math.max(max, etudiant.id), 0);
    
        // Étape 3 : Créer un nouvel étudiant avec un ID auto-incrémenté
        const nouvelEtudiant = {
            id: maxId + 1, // Incrémentation de l'ID
            nom: document.getElementById('nom').value, // Récupérer le nom depuis le formulaire
            note: parseFloat(document.getElementById('note').value) // Récupérer la note depuis le formulaire
        };
    
        // Étape 4 : Envoyer le nouvel étudiant au serveur
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nouvelEtudiant)
        });
    };

    static deletEtudiant = async function(id){
        const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
        if(confirmDelete){
        await fetch(URL+"/"+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });}else{
            alert("operation annulé")
        }
    }
    
    

}