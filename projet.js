//creer un tableau d'etudiant et effectuez les operations suivantes
var etudiants = [
    {
        id: 1,
        prenom: "Mariama",
        nom: "Balde",
        note:15,
        age: 22,
    },

    {
        id: 2,
        prenom: "Aissatou",
        nom: "Camara",
        note:12,
        age: 23,
    },

    {
        id: 3,
        prenom: "Mamadou",
        nom: "Doucoure",
        note:14,
        age: 25,
    },

    {
        id: 4,
        prenom: "Abdoul khoudouss",
        nom: "Mbacke",
        note:17,
        age: 20,
    },

    {
        id: 5,
        prenom: "Ndeye Awa",
        nom: "Sambe",
        note:20,
        age: 19,
    }

];


    let etudiant = etudiants.map(index =>
        `<tbody><tr><td>${index.id}</td><td>${index.prenom}</td><td>${index.nom}</td><td>${index.note}</td><td>${index.age}</td><td class="d-flex"><button class="btn btn-primary">Suprimer</button><button class="btn btn-success ms-2">Modifier</button></td></tr></tbody>`
       
    );
    
    document.querySelector(".tbody").innerHTML = etudiant;
    
    let exampleModal = document.querySelector('#exampleModal');
    document.getElementById("btn").addEventListener("click", function() {
       $(exampleModal).modal('show');
     });

     localStorage.setItem('nom','doucoure','prenom','mamadou');
