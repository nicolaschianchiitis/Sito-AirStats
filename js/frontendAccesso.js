function login(){
    const form = document.getElementById("formLogin");

    form.addEventListener('submit', function(event){
        event.preventDefault();
        event.stopImmediatePropagation();

        if (validaInput()){
            // Da aggiungere..... trasmetti i dati e controlla se sono nel database
            /*
                trasmetti();
                if (utente nel database e credenziali giuste){
                    reindirizza all'area personale;
                    imposta il nome utente nel nome account;
                } else{
                    mostra il messaggio di errore di accesso (message box);
                }

                trasmetti al server usando il dataToJSON()
            */
        } else{
            
        }
        
    });
}

function validaInput(){
    const regexUsername = /^.{1,}$/gm
    const regexPassword = /^.{1,}$/gm

    const boxUsername = document.getElementById("username");
    const boxPassword = document.getElementById("password");

    const msgBoxUsername = document.getElementById("msgBoxUsername");
    const msgBoxPassword = document.getElementById("msgBoxPassword");
    const msgBoxErroreAccesso = document.getElementById("msgBoxErroreAccesso");

    let inputValido = true;

    // Reset message boxes prima dei controlli
    msgBoxUsername.style.display = "none";
    msgBoxUsername.innerText = "";
    msgBoxPassword.style.display = "none";
    msgBoxPassword.innerText = "";
    msgBoxErroreAccesso.style.display = "none";

    const classeCampiForm = "form-control";

    // Validazione nome utente
    if (!regexUsername.test(boxUsername.value)){
        boxUsername.className += " border-danger";
        msgBoxUsername.innerText = "Inserisci un nome utente";
        msgBoxUsername.style.display = "block";
        inputValido = false;
    } else{
        boxUsername.className = classeCampiForm;
        msgBoxUsername.style.display = "none";
        msgBoxUsername.innerText = "";
    }

    // Validazione password
    if (!regexPassword.test(boxPassword.value)){
        boxPassword.className += " border-danger";
        msgBoxPassword.innerText = "Inserisci una password";
        msgBoxPassword.style.display = "block";
        inputValido = false;
    } else{
        boxPassword.className = classeCampiForm;
        msgBoxPassword.style.display = "none";
        msgBoxPassword.innerText = "";
    }

    // Determinazione del campo da mettere in evidenza (focus)
    if (!regexPassword.test(boxUsername.value)){
        boxUsername.focus();
    } else{
        boxPassword.focus();
    }

    return inputValido;
}

function resetForm(){
    // Reset campi input
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Reset message boxes
    const msgBoxUsername = document.getElementById("msgBoxUsername");
    const msgBoxPassword = document.getElementById("msgBoxPassword");
    const msgBoxErroreAccesso = document.getElementById("msgBoxErroreAccesso");

    msgBoxUsername.style.display = "none";
    msgBoxUsername.innerText = "";
    msgBoxPassword.style.display = "none";
    msgBoxPassword.innerText = "";
    msgBoxErroreAccesso.style.display = "none";
    msgBoxErroreAccesso.innerText = "";

    const boxUsername = document.getElementById("username");
    const boxPassword = document.getElementById("password");

    const classeCampiForm = "form-control";

    boxUsername.className = classeCampiForm;
    boxPassword.className = classeCampiForm;
}

function dataToJSON(){
    const boxUsername = document.getElementById("username");
    const boxPassword = document.getElementById("password");

    let data = {
        "username": boxUsername.value,
        "password": boxPassword.value
    };

    return data;
}