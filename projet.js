// const students = [ 
//     {prenom: "Mariama", nom: "Balde", note: 18, age: 14 },
//     {prenom: "mamadou", nom: "Doucoure", note: 11, age: 19 },
// ];

const students = JSON.parse(localStorage.getItem('students'));

const NbreEtudiantsPage = 6;
let PageCurrent = 1;

function Moyenne() {
    let Total = 0;
    for (const student of students) {
        Total += student.note;
    }
    return Total / students.length;
}

// FONCTION SOMME DES NOTES
function SommeNote() {
    let totalNote = 0
    for (const chaqueNote of students){
        totalNote += chaqueNote.note
    }
    return  totalNote
}

// FONCTION SOMME DES AGES 
function SommeAge() {
    let totalAge = 0
    for (const chaqueAge of students) {
        totalAge += chaqueAge.age
    }
    return totalAge
}

// FONCTION NOMBRE DE NOTES 
function compterNotes() {
    return students.length;
}

// FONCTION NOMBRE D'AGES
function compterAge() {
    return students.length;
}

// Fonction pour afficher les étudiants
function AfficheEtudiant(EtudiantAffiche) {
    const tbody = document.getElementById('Tbody');
    tbody.innerHTML = '';

    const startIndex = (PageCurrent - 1) * NbreEtudiantsPage;

    // utiliser la boucle for pour afficher
     for (let i = 0; i < EtudiantAffiche.length; i++) {
        const student = EtudiantAffiche[i];
        // Calculer l'index global de l'étudiant
        const globalIndex = startIndex + i; 
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${student.prenom}</td>
        <td>${student.nom}</td>
        <td>${student.note}</td>
        <td>${student.age}</td>
        <td>
            <button type="button" class="btn  btn-outline-danger me-2" onclick="deleteStudent(${globalIndex})">
                <i class="fa-solid fa-trash m-auto"></i>
            </button> 
            <button type="button" class="btn btn-outline-primary" onclick="modifier(${globalIndex})">
                <i class="fa-solid fa-pen m-auto"></i>
            </button>
        </td>`;
        tbody.appendChild(tr);
     }
}

function Pagination(EtudiantPagination) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(EtudiantPagination.length / NbreEtudiantsPage);
        
    // parcourir le nombre de page (=2) et mettre les liens de switch entre les paginations
    for (let i = 1; i <= pageCount; i++) {
        //creer le lien
        const pageItem = document.createElement('a'); 
        // lui mettre le href à #
        pageItem.href = "#"; 
        //lui ajouter une classe
        pageItem.className = "page-link"; 
        //changer le contenu pour le mettre à i 
        pageItem.innerText = i; 
        //afficher la page correspondante au click du lien
        pageItem.onclick = function (event) { 
            event.preventDefault();
            PageCurrent = i;
            filtre();
        };
        const pageLi = document.createElement('li');
        pageLi.className = "page-item";
        pageLi.appendChild(pageItem);
        pagination.appendChild(pageLi);
    }
}

function filtre() {
    const  searchInput = document.getElementById('searchInput').value.toLowerCase();
    const EtudiantFiltres = students.filter(student =>
        student.nom.toLowerCase().includes(searchInput) || student.prenom.toLowerCase().includes(searchInput)
    );

    const startIndex = (PageCurrent - 1) * NbreEtudiantsPage;
    const EtudiantAffiche = EtudiantFiltres.slice(startIndex, startIndex + NbreEtudiantsPage);

    AfficheEtudiant(EtudiantAffiche);
    Pagination(EtudiantFiltres);

    document.getElementById('MoyGen').innerText = Moyenne().toFixed(2);
    document.getElementById('card1').innerText = SommeNote();
    document.getElementById('card2').innerText = "La somme des ages est égale à " + SommeAge();
    document.getElementById('card3').innerText = "Le nombre de note est égal à " + compterNotes(students);
    document.getElementById('card4').innerText = "Le nombre des ages est égal à " + compterAge(students);
}

document.getElementById('searchInput').addEventListener('input', () =>{
    PageCurrent = 1;
    filtre();
});

window.onload = filtre();

// Afficher le modal
let bouttonAjout = document.getElementById('bouttonAjout')
let modal = document.getElementById('modal')

//vider les champs
function viderChamp() {
    let formulaire = document.getElementById('formulaire')
    formulaire.reset()
}

// evenement pour afficher le modal à partir du boutton ajouter
bouttonAjout.addEventListener('click', () =>{
    modal.style.display='block';
    
})

   // un autre evenement pour fermer le modal à partir du bouton fermer 
   document.getElementById('closeModal').addEventListener('click', () =>{
    modal.style.display='none';
    viderChamp()
})

document.getElementById('envoyerModal').addEventListener('click', () => {
    let ajoutPrenom = document.getElementById('ajoutPrenom').value;
    let ajoutNom = document.getElementById('ajoutNom').value;
    let ajoutNote = parseFloat(document.getElementById('ajoutNote').value);
    let ajoutAge = parseInt(document.getElementById('ajoutAge').value);

    if (ajoutPrenom === '' || ajoutNom === '' || isNaN(ajoutNote) || isNaN(ajoutAge)) {
        alert('Veuillez remplir tous les champs.');
    } else {
        const nouveauEtudiant = {
            prenom: ajoutPrenom,
            nom: ajoutNom,
            note: parseFloat(ajoutNote),
            age: parseInt(ajoutAge)
        };
        students.push(nouveauEtudiant);
        localStorage.setItem('students', JSON.stringify(students));

        viderChamp();
        filtre();
        modal.style.display = 'none';
        // modal.hide();
    }
});

// Modifier un étudiant

function modifier(index) {
    var modalModifier = new bootstrap.Modal(document.getElementById('modalModifier'),{

        keyboard: false
    })
    modalModifier.show();

    var boutonModifier = document.getElementById('boutonModifier');
    const student = students[index];

    document.getElementById('modifierPrenom').value = student.prenom;
    document.getElementById('modifierNom').value = student.nom;
    document.getElementById('modifierNote').value = student.note;
    document.getElementById('modifierAge').value = student.age;

boutonModifier.onclick = () => {

    var modifierPrenom =  document.getElementById('modifierPrenom').value;
    var modifierNom = document.getElementById('modifierNom').value;
    var modifierNote = parseFloat(document.getElementById('modifierNote').value);
    var modifierAge = parseInt(document.getElementById('modifierAge').value);

    if (modifierPrenom === '' || modifierNom === '' || isNaN(modifierNote) || isNaN(modifierAge)) {
                alert('Veuillez remplir tous les champs.');
            } else {
                const modifierEtudiant = {
                    prenom: modifierPrenom,
                    nom: modifierNom,
                    note: modifierNote,
                    age: modifierAge
                };
                students[index] = modifierEtudiant;
                localStorage.setItem('students', JSON.stringify(students));
        
                viderChamp();
                filtre();
                modalModifier.hide();
            }
        };
    
    }   

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    filtre();
}