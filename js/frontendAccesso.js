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
            */
        } else{
            
        }
        
    });
}

function validaInput(){
    const regexUsername = /.{1,}/gm
    const regexPassword = /.{1,}/gm

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

    // Validazione nome utente
    if (!regexUsername.test(boxUsername.value)){
        msgBoxUsername.innerText = "Inserisci un nome utente";
        msgBoxUsername.style.display = "block";
        inputValido = false;
        boxUsername.focus();
    } else{
        msgBoxUsername.style.display = "none";
        msgBoxUsername.innerText = "";
        inputValido = true;
    }

    // Validazione password
    if (!regexPassword.test(boxPassword.value)){
        msgBoxPassword.innerText = "Inserisci una password";
        msgBoxPassword.style.display = "block";
        inputValido = false;
        boxPassword.focus();
    } else{
        msgBoxPassword.style.display = "none";
        msgBoxPassword.innerText = "";
        inputValido = true;
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
}