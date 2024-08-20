
import { Etudiant } from "./etudiants.js";

//le filtre pour l'id
let tmpId = document.querySelector("#idBtn")
tmpId.innerHTML = "&#9650;"
const changementDeSymboleId = async function(){
    let students = Etudiant.listEtudiants().then( response => {
        if(tmpId.innerHTML.includes("▲")){
            //alert("je suis la ")
            tmpId.innerHTML = "&#9660;"
            response.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            
            afficher(response)
        }else{
            tmpId.innerHTML = "&#9650;"
            response.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            
            afficher(response)
        }
    })
    
}

//le filtre pour le nom
let tmpNom = document.querySelector("#nomBtn")
tmpNom.innerHTML = "&#9650;"
const changementDeSymboleNom = function(){
    let students = Etudiant.listEtudiants().then( response => {
        if(tmpNom.innerHTML.includes("▲")){
            //alert("je suis la ")
            tmpNom.innerHTML = "&#9660;"
            response.sort((a, b) => b.nom.localeCompare(a.nom));
            
            afficher(response)
        }else{
            tmpNom.innerHTML = "&#9650;"
            response.sort((a, b) => a.nom.localeCompare(b.nom));
            
            afficher(response)
        }
    })
}

//le filtre pour la note
let tmpNote = document.querySelector("#noteBtn")
tmpNote.innerHTML = "&#9650;"
const changementDeSymboleNote = function(){
    let students = Etudiant.listEtudiants().then( response => {
        if(tmpNote.innerHTML.includes("▲")){
            //alert("je suis la ")
            tmpNote.innerHTML = "&#9660;"
            response.sort((a, b) => parseInt(b.note) - parseInt(a.note));
            
            afficher(response)
        }else{
            tmpNote.innerHTML = "&#9650;"
            response.sort((a, b) => parseInt(a.note) - parseInt(b.note));
            
            afficher(response)
    }
    })
}

const afficher = function(table){
    let  content = document.getElementById("content")
    
    let data =""
    table.forEach(element => {
        // alert(`${element.nom}`)
        
        data +=   `<tr class="table-primary">
                    <td scope="row">${element.id}</td>
                    <td>${element.nom}</td>
                    <td><span class="badge ${element.note>=10?'bg-success':'bg-danger'}">${element.note}/20</span></td>
                    <td><button class="btn btn-danger btn-sm delete"  data-id="${element.id}">Supprimer</button></td>
                </tr> `
    });
    content.innerHTML= data ;
    const delets = document.querySelectorAll(".delete");

    if (delets) {
        delets.forEach(delet=> delet.addEventListener('click', () => Etudiant.deletEtudiant(delet.dataset.id)));
        //delets.addEventListener("click", () => Etudiant.deletEtudiant())
    }
}
const table = Etudiant.listEtudiants().then( value=> {
    afficher(value)
} )

const add=document.querySelector("#add");
add.addEventListener('click', () => 
    Etudiant.addEtudiant()
)
tmpId.addEventListener('click',()=> changementDeSymboleId())
tmpNom.addEventListener('click',()=> changementDeSymboleNom())
tmpNote.addEventListener('click',()=> changementDeSymboleNote())
