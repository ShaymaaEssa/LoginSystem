//so user can't open home page unless he logged.

if(localStorage.getItem("uToken") === null){
    location.href= "./index.html";
}