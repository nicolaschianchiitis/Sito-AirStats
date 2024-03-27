function resetContainerGrafico(){
    var containerGrafici = document.getElementById("containerGrafici");
    while (containerGrafici.firstChild) {
        containerGrafici.removeChild(containerGrafici.firstChild);
      }
}
function creazioneGraficoBarre(dati,indexMacchina){
        mediePolveri=[0,0,0,0,0,0,0,0,0,0,0,0];
        medieCO2=[0,0,0,0,0,0,0,0,0,0,0,0];
        mediecCO2=[0,0,0,0,0,0,0,0,0,0,0,0];//contatori
        mediecPolveri=[0,0,0,0,0,0,0,0,0,0,0,0];//contatori
        var listaDati=dati[indexMacchina].listaDati
        listaDati.forEach(dato => {    
            medieCO2[(dato.mese)-1]+=dato.co2;
            mediecCO2[(dato.mese)-1]+=1;
            mediePolveri[(dato.mese)-1]+=dato.polveriSottili;
            mediecPolveri[(dato.mese)-1]+=1;
        });
        for(let i=0;i<12;i++){
            if(medieCO2[i]!=0){
                medieCO2[i]=medieCO2[i]/mediecCO2[i];
            }
            if(mediePolveri[i]!=0){
                mediePolveri[i]=mediePolveri[i]/mediecPolveri[i];
            }
        }

        var data = {
            labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto","Settembre","Ottobbre","Novembre","Dicembre"],
            datasets: [
                {
                    label: "CO2",
                    backgroundColor: "rgba(0, 102, 204,1)",
                    borderColor: "rgba(99,240,220,1)",
                    data: medieCO2
                },
                {
                    label: "POLVERI SOTTILI",
                    backgroundColor: "rgba(128, 0, 128,1)",
                    borderColor: "rgba(205,99,151,1)",
                    data: mediePolveri
                }
            ]
        };
        var ctx = document.createElement("canvas");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: data
        });
        var divGravico= document.createElement('div');
        divGravico.style.border='black solid 2px'
        var labelNomeDispositivo= document.createElement('h1')
        var nomeDispositivo= dati[indexMacchina].name
        labelNomeDispositivo.textContent= nomeDispositivo
        var containerGrafici = document.getElementById("containerGrafici");
        divGravico.appendChild(ctx)
        containerGrafici.appendChild(labelNomeDispositivo)
        containerGrafici.appendChild(divGravico);
}
function gestoreGrafico(NM){
    let requesturl='./dati.json';
    let request= new XMLHttpRequest();
    request.open('GET',requesturl);
    request.responseType='json';
    request.send();

    request.onload = function(){
        dati=request.response;
        for(let i=0;i<dati.length;i++){
            var listaDispositivi= dati[i].listaDispositivi
            var indexMacchina=0;
            var nomeMacchina= NM;
            console.log(nomeMacchina);
            for(let i2=0;i2<listaDispositivi.length;i2++){
                if(listaDispositivi[i2].name == nomeMacchina){
                    indexMacchina = i2;
                }
            }
            resetContainerGrafico();
            creazioneGraficoBarre(listaDispositivi,indexMacchina)
        }
    }
}
setInterval(gestoreGrafico(""),600);