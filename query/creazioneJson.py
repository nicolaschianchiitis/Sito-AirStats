import mysql.connector
import json
def aggiornamentoJSON(username,password):
# Connessione al database
    cnx = mysql.connector.connect(
        host="",
        user="root",
        password="Admin_2006",
        database="airstats"
    )

    # Creazione di un cursore per eseguire le query
    cursor = cnx.cursor()

    # Esecuzione della query per ottenere i dati dell'utente
    query = "SELECT username, password FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    utente = cursor.fetchone()

    # Esecuzione della query per ottenere i dati delle macchine
    query = "SELECT id_device, name FROM devices WHERE id_user = %s"
    cursor.execute(query, (utente[0],))
    macchine = cursor.fetchall()

    # Creazione di un oggetto json superficiale
    json_output = {
        "nome": utente[0],
        "password": utente[1],
        "listaDispositivi": []
    }

    # Aggiunta dei dati delle macchine all'oggetto json
    for macchina in macchine:
        lista_dati = []
        query = "SELECT month, PM10, CO2 FROM data WHERE device_id = %s"
        cursor.execute(query, (macchina[0],))
        dati = cursor.fetchall()
        for dato in dati:
            lista_dati.append({
                "mese": dato[0],
                "polveriSottili": dato[1],
                "co2": dato[2]
            })
        json_output["listaDispositivi"].append({
            "name": macchina[1],
            "listaDati": lista_dati
        })

    # Stampa dell'oggetto json
    print(json.dumps(json_output, indent=4))

    # Chiusura della connessione
    cnx.close()
aggiornamentoJSON('utente','1234')