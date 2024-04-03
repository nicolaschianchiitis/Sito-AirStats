function login(){
    const form = document.getElementById("formLogin");
    const regexEmail = /.{1,}@(.{1,}\..{1,}){1,}/gmi
    const regexPassword = /.{1,}/gm

    form.addEventListener('submit', function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        
    });
}