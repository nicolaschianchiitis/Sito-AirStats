function aggiornaDropdown(dati){
    var dropdownCorrente=document.getElementById("elencoDispositivi");
    var value="";
    for(let i=0;i<dati.length;i++){
        var newLi=document.createElement("li");
        var newA=document.createElement("a");
        newA.className="dropdown-item";
        newA.href="#";
        newLi.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
              value = event.target.textContent;
              gestoreGrafico(value)
            }
        });
        newA.text=dati[i].name;
        newLi.appendChild(newA);
        dropdownCorrente.appendChild(newLi);
    }
}
function gestoreDropdown(){
    let requesturl='json/dati.json';
    let request= new XMLHttpRequest();
    request.open('GET',requesturl);
    request.responseType='json';
    request.send();

    request.onload = function(){
        dati=request.response;
        for(let i=0;i<dati.length;i++){
            let listaDispositivi= dati[i].listaDispositivi
            aggiornaDropdown(listaDispositivi)
        }
    }
}
setInterval(gestoreDropdown(),5000);