function aggiornaDropdown(dati){
    var dropdownCorrente = document.getElementById("elencoDispositivi");
    var value = "";
    for(let i = 0; i < dati.length; i++){
        var newLi = document.createElement("li");
        var newA = document.createElement("a");
        newA.className = "dropdown-item";
        newA.href = "#";
        newLi.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
              value = event.target.textContent;
              gestoreGrafico(value);
            }
        });
        newA.text = dati[i].name;
        newLi.appendChild(newA);
        dropdownCorrente.appendChild(newLi);
    }
}

function evidenziaDispositivo(){
    // Evidenzia nel dropdown il dispositivo attualmente selezionato
    var labelNomeDispositivo = document.getElementById("nomeDispositivo");
    // Ottieni tutte le macchine
    var contenutoDropdown = document.querySelectorAll("ul#elencoDispositivi li a");
    const classeElementoNormale = "dropdown-item";
    const classeElementoAttivo = "dropdown-item active";

    for (let i = 0; i < contenutoDropdown.length; i++){
        if (contenutoDropdown[i].textContent == labelNomeDispositivo.textContent){
            contenutoDropdown[i].className = classeElementoAttivo;
        } else{
            contenutoDropdown[i].className = classeElementoNormale;
        }
    }
}

function gestoreDropdown(){
    let requesturl = 'json/dati.json';
    let request = new XMLHttpRequest();
    request.open('GET',requesturl);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        dati = request.response;
        let listaDispositivi = dati.listaDispositivi;
        aggiornaDropdown(listaDispositivi);
    }
}
setInterval(gestoreDropdown(),5000);