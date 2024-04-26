function resetContainerGrafico(){
    var containerGrafici = document.getElementById("containerGrafici");
    var containerGrafici2 = document.getElementById("containerGrafici2");
    while (containerGrafici.firstChild) {
        containerGrafici.removeChild(containerGrafici.firstChild);
    }
    if(containerGrafici2.childNodes[2]){
        containerGrafici2.removeChild(containerGrafici2.childNodes[2]);
    }
}

function calcolaMedia(dati,indexMacchina){
    var mediePolveri = [0,0,0,0,0,0,0,0,0,0,0,0];
    var medieCO2 = [0,0,0,0,0,0,0,0,0,0,0,0];
    var mediecCO2 = [0,0,0,0,0,0,0,0,0,0,0,0];//contatori
    var mediecPolveri = [0,0,0,0,0,0,0,0,0,0,0,0];//contatori
    var listaDati = dati[indexMacchina].listaDati;
    listaDati.forEach(dato => {    
        medieCO2[(dato.mese)-1] += dato.co2;
        mediecCO2[(dato.mese)-1] += 1;
        mediePolveri[(dato.mese)-1] += dato.polveriSottili;
        mediecPolveri[(dato.mese)-1] += 1;
    });
    for(let i = 0; i < 12; i++){
        if(medieCO2[i] != 0){
            medieCO2[i] = medieCO2[i] / mediecCO2[i];
        }
        if(mediePolveri[i] != 0){
            mediePolveri[i] = mediePolveri[i] / mediecPolveri[i];
        }
    }
    return [mediePolveri, medieCO2];
}
function creazioneGraficoBarre(dati,indexMacchina){
    var [mediePolveri, medieCO2] = calcolaMedia(dati, indexMacchina);
    var data = {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                "Luglio", "Agosto", "Settembre", "Ottobbre", "Novembre", "Dicembre"],
        datasets: [
            {
                label: "CO2",
                backgroundColor: "rgba(0, 102, 204, 1)",
                borderColor: "rgba(99, 240, 220, 1)",
                data: medieCO2
            },
            {
                label: "POLVERI SOTTILI",
                backgroundColor: "rgba(128, 0, 128, 1)",
                borderColor: "rgba(205, 99, 151, 1)",
                data: mediePolveri
            }
        ]
    };
    var ctx = document.createElement("canvas");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data
    });
    var divGrafico = document.createElement('div');
    divGrafico.style.width = '50%';
    divGrafico.style.height = '25%';
    divGrafico.className = 'col';
    var labelNomeDispositivo = document.createElement('h1');
    var nomeDispositivo = dati[indexMacchina].name;
    labelNomeDispositivo.id = "nomeDispositivo";
    labelNomeDispositivo.textContent = nomeDispositivo;
    labelNomeDispositivo.style.marginLeft = "1.25%";
    labelNomeDispositivo.style.marginBottom = "1.25%";
    var containerGrafici = document.getElementById("containerGrafici");
    divGrafico.appendChild(ctx);
    containerGrafici.appendChild(labelNomeDispositivo);
    containerGrafici.appendChild(divGrafico);
}

function creazioneGraficoDonut(dati,indexMacchina){
    var [mediePolveri, medieCO2] = calcolaMedia(dati, indexMacchina);
    var data1 = {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                "Luglio", "Agosto", "Settembre", "Ottobbre", "Novembre", "Dicembre"],
        datasets: [
            {
                label: 'CO2',
                data: medieCO2,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }, 
            {
                label: 'PM10',
                data: mediePolveri,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };
    var ctx = document.createElement("canvas");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data1
    });
    /*
    prova a vedere se va
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data1,
        'width': 400,
        'height': 400
    });
    */
    var divGrafico = document.createElement('div');
    divGrafico.style.margin = '1%';
    divGrafico.style.width = '50%';
    divGrafico.style.height = 'auto';
    divGrafico.className = 'col';
    var containerGrafici = document.getElementById("containerGrafici2");
    divGrafico.appendChild(ctx);
    containerGrafici.appendChild(divGrafico);
}

function creazioneGraficoPunti(dati, indexMacchina){
    var [mediePolveri, medieCO2] = calcolaMedia(dati, indexMacchina);
    var data = {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
                "Agosto", "Settembre", "Ottobbre", "Novembre", "Dicembre"],
        datasets: [
            {
                label: "CO2",
                fill: true,
                backgroundColor: "rgba(0, 102, 204, 1)",
                borderColor: "rgba(0, 102, 204, 1)",
                data: medieCO2
            },
            {
                label: "POLVERI SOTTILI",
                fill: true,
                backgroundColor: "rgba(128, 0, 128, 1)",
                borderColor: "rgba(128, 0, 128, 1)",
                data: mediePolveri
            }
        ]
    };
    var ctx = document.createElement("canvas");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    var divGrafico = document.createElement('div');
    divGrafico.style.width ='50%'
    divGrafico.style.height ='25%'
    divGrafico.className = 'col'
    var containerGrafici = document.getElementById("containerGrafici");
    divGrafico.appendChild(ctx)
    containerGrafici.appendChild(divGrafico);
}

function gestoreGrafico(NM){
    let requesturl = 'json/dati.json';
    let request = new XMLHttpRequest();
    request.open('GET', requesturl);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        dati = request.response;
            var listaDispositivi = dati.listaDispositivi
            var indexMacchina = 0;
            var nomeMacchina = NM;
            console.log(nomeMacchina);
            for(let i2 = 0; i2 < listaDispositivi.length; i2++){
                if(listaDispositivi[i2].name == nomeMacchina){
                    indexMacchina = i2;
                }
            }
            resetContainerGrafico();
            creazioneGraficoBarre(listaDispositivi, indexMacchina);
            creazioneGraficoPunti(listaDispositivi, indexMacchina);
            creazioneGraficoDonut(listaDispositivi, indexMacchina);
        }
}
setInterval(gestoreGrafico(""), 5000);