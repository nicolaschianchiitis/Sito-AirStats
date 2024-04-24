function login(){
    const form = document.getElementById("formRegister");

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
    const regexUsername = /^([a-z](?:_?[a-z0-9]+)*)$/gm
    const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&,;\.:\-_<>^])[a-zA-Z\d@$!%*#?&,;\.:\-_<>^]{8,}$/gm;
    const regexEmail = /^([a-z]{1,}\.{0,1}){1,}[a-z0-9]{0,}@([a-z]{1,}\.{0,1}){1,}[a-z]{1,}$/gm;
    const regexNumTelefono = /^\d{10}$/gm;

    const boxUsername = document.getElementById("username");
    const boxPassword = document.getElementById("password");
    const boxPasswordCheck = document.getElementById("passwordCheck");
    const boxEmail = document.getElementById("email");
    const boxNumTelefono = document.getElementById("tel");

    const msgBoxUsername = document.getElementById("msgBoxUsername");
    const msgBoxPassword = document.getElementById("msgBoxPassword");
    const msgBoxPasswordCheck = document.getElementById("msgBoxPasswordCheck");
    const msgBoxEmail = document.getElementById("msgBoxEmail");
    const msgBoxNumTelefono = document.getElementById("msgBoxTel");
    const msgBoxErroreAccesso = document.getElementById("msgBoxErroreAccesso");
    const msgBoxRequired = document.getElementById("msgBoxRequired");

    const classeCampiForm = "form-control";

    if (boxUsername.value == "" || boxPassword.value == "" || boxPasswordCheck.value == ""){
        msgBoxRequired.style.display = "block";
        inputValido = false;
    } else{
        msgBoxRequired.style.display = "none";

        // Validazione nome utente
        if (!regexUsername.test(boxUsername.value)){
            boxUsername.className += " border-danger";
            msgBoxUsername.innerText = "Formato del nome utente non corretto";
            msgBoxUsername.style.display = "block";
            boxUsername.focus();
            inputValido = false;
        } else{
            boxUsername.className = classeCampiForm;
            msgBoxUsername.style.display = "none";
            msgBoxUsername.innerText = "";
            inputValido = true;
        }

        // Validazione password
        if (!regexPassword.test(boxPassword.value)){
            boxPassword.className += " border-danger";
            msgBoxPassword.innerText = "Formato della password non corretto";
            msgBoxPassword.style.display = "block";
            boxPassword.focus();
            inputValido = false;
        } else{
            boxPassword.className = classeCampiForm;
            msgBoxPassword.style.display = "none";
            msgBoxPassword.innerText = "";
            inputValido = true;
        }

        // Controllo ripetizione password
        if (boxPassword.value != boxPasswordCheck.value){
            boxPasswordCheck.className += " border-danger";
            msgBoxPasswordCheck.innerText = "La password è diversa da quella inserita in questo campo: reinseriscila";
            msgBoxPasswordCheck.style.display = "block";
            boxPasswordCheck.focus();
            inputValido = false;
        } else{
            boxPasswordCheck.className = classeCampiForm;
            msgBoxPasswordCheck.style.display = "none";
            msgBoxPasswordCheck.innerText = "";
            inputValido = true;
        }

        // Aggiungi i dati obbligatori al file JSON
        let data = dataToJSON();

        // Se la mail c'è, validala e aggiungila ai dati
        if (boxEmail.value == ""){
            data.email = boxEmail.value;
            boxEmail.className = classeCampiForm;
            msgBoxEmail.style.display = "none";
            msgBoxEmail.innerText = "";
            inputValido = true;
        } else if (boxEmail.value != null && !regexEmail.test(boxEmail.value)){
            boxEmail.className += " border-danger";
            msgBoxEmail.innerText = "Formato dell'email non corretto";
            msgBoxEmail.style.display = "block";
            boxEmail.focus();
            inputValido = false;
        } else{
            msgBoxEmail.style.display = "none";
            msgBoxEmail.innerText = "";
            boxEmail.className = classeCampiForm;
            inputValido = true;
        }

        // Se è stato indicato un numero di telefono, validalo e aggiungilo ai dati
        if (boxNumTelefono.value == ""){
            data.phone = boxNumTelefono.value;
            msgBoxNumTelefono.style.display = "none";
            msgBoxNumTelefono.innerText = "";
            boxNumTelefono.className = classeCampiForm;
            inputValido = true;
        } else if (boxNumTelefono.value != null && !regexNumTelefono.test(boxNumTelefono.value)){
            boxNumTelefono.className += " border-danger";
            msgBoxNumTelefono.innerText = "Formato del numero di telefono non corretto";
            msgBoxNumTelefono.style.display = "block";
            boxNumTelefono.focus();
            inputValido = false;
        } else{
            msgBoxNumTelefono.style.display = "none";
            msgBoxNumTelefono.innerText = "";
            boxNumTelefono.className = classeCampiForm;
            inputValido = true;
        }
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
    const msgBoxPasswordCheck = document.getElementById("msgBoxPasswordCheck");
    const msgBoxEmail = document.getElementById("msgBoxEmail");
    const msgBoxNumTelefono = document.getElementById("msgBoxTel");
    const msgBoxErroreAccesso = document.getElementById("msgBoxErroreAccesso");
    const msgBoxRequired = document.getElementById("msgBoxRequired");

    const boxUsername = document.getElementById("username");
    const boxPassword = document.getElementById("password");
    const boxPasswordCheck = document.getElementById("passwordCheck");
    const boxEmail = document.getElementById("email");
    const boxNumTelefono = document.getElementById("tel");

    const classeCampiForm = "form-control";

    msgBoxUsername.style.display = "none";
    msgBoxUsername.innerText = "";
    msgBoxPassword.style.display = "none";
    msgBoxPassword.innerText = "";
    msgBoxPasswordCheck.style.display = "none";
    msgBoxPasswordCheck.innerText = "";
    msgBoxEmail.style.display = "none";
    msgBoxEmail.innerText = "";
    msgBoxNumTelefono.style.display = "none";
    msgBoxNumTelefono.innerText = "";
    msgBoxErroreAccesso.style.display = "none";
    msgBoxErroreAccesso.innerText = "";
    msgBoxRequired.style.display = "none";

    boxUsername.className = classeCampiForm;
    boxPassword.className = classeCampiForm;
    boxPasswordCheck.className = classeCampiForm;
    boxEmail.className = classeCampiForm;
    boxNumTelefono.className = classeCampiForm;
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