document.addEventListener('DOMContentLoaded', () => {

    // 1. Meniul de mobil
    document.getElementById('hamburger-btn').addEventListener('click', () => {
        document.getElementById('main-nav').classList.toggle('active');
    });

    // 2. Exragem datele JSON
    fetch('data/resources.json')
        .then(response => response.json())
        .then(date => {
            afiseazaListaSimpla(date);           
            afiseazaDoarAsociatiile(date);       
            seteazaFiltrareEvenimente(date);     
            afiseazaToateTagurile(date);         
        })
        .catch(eroare => console.error('Eroare:', eroare));

    function afiseazaListaSimpla(date) {
        let html = '<ul style="margin-left: 20px; line-height: 1.6;">';
        date.forEach(item => {
            html += `<li><strong>${item.name}</strong> - <em>${item.type}</em></li>`;
        });
        html += '</ul>';
        document.getElementById('all-resources-container').innerHTML = html;
    }

    function afiseazaDoarAsociatiile(date) {
        const asociatii = date.filter(item => item.type === 'Asociație' || item.type === 'Club');
        
        let html = '';
        asociatii.forEach(club => {
            html += creazaCard(club); 
        });
        
        const container = document.getElementById('filtered-clubs-container');
        container.innerHTML = html;
        container.classList.add('grid-layout'); 
    }

    function seteazaFiltrareEvenimente(date) {
        const evenimente = date.filter(item => item.type === 'Eveniment');
        const containterButoane = document.getElementById('type-filters');
        const containerRezultate = document.getElementById('type-results');
        
        //tag-urile
        const taguri = ["Voluntariat", "Descopera", "Util"];
        
        //Creăm butoanele
        let butoaneHTML = '';
        taguri.forEach(tag => {
            butoaneHTML += `<button class="simplu-btn">${tag}</button> `;
        });
        containterButoane.innerHTML = butoaneHTML;

        //Punem acțiunea de click pe fiecare buton
        const butoane = containterButoane.querySelectorAll('button');
        butoane.forEach(buton => {
            buton.addEventListener('click', () => {
                const tagAles = buton.innerText;
                //Filtrăm evenimentele care conțin tag-ul pe care am dat click
                const filtrate = evenimente.filter(ev => ev.tags.includes(tagAles));
                
                //Le afișăm
                let html = '';
                filtrate.forEach(ev => { html += creazaCard(ev); });
                containerRezultate.innerHTML = html;
                containerRezultate.classList.add('grid-layout');
            });
        });

        //Afișăm toate evenimentele la început, ca să nu fie gol
        let htmlInitial = '';
        evenimente.forEach(ev => { htmlInitial += creazaCard(ev); });
        containerRezultate.innerHTML = htmlInitial;
        containerRezultate.classList.add('grid-layout');
    }

    //Afișăm toate tag-urile existente în josul paginii
    function afiseazaToateTagurile(date) {
        let toateTagurile = [];
        //Trecem prin toate elementele și le adunăm tag-urile într-o singură listă
        date.forEach(item => {
            if (item.tags) {
                item.tags.forEach(tag => toateTagurile.push(tag));
            }
        });
        
        //Eliminăm duplicatele folosind "trucul" de pe tablă
        const taguriUnice = [...new Set(toateTagurile)];
        
        let html = '';
        taguriUnice.forEach(tag => {
            html += `<span class="tag-badge">#${tag}</span> `;
        });
        document.getElementById('tags-container').innerHTML = html;
    }

    // functie ajutatoare
    function creazaCard(item) {
        return `
            <div class="resource-card">
                <h3 style="color: #273043;">${item.name}</h3>
                <p><strong>Locație:</strong> ${item.location}</p>
                <p><strong>Program:</strong> ${item.program}</p>
                <p style="margin-top: 10px; font-size: 0.9rem;">${item.description || ''}</p>
            </div>
        `;
    }
});