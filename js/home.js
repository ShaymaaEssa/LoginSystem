//=============== Global ======================
let userName;
if(localStorage.getItem("uToken")!== null){
    userName = localStorage.getItem("uToken");
    userNameItems = document.querySelectorAll(".user-name");
    for(item of userNameItems){
        item.innerHTML = userName;
    }
} else{
    location.href = "./index.html";
}
//=============== Events ======================
document.querySelector(".btn-login").addEventListener("click",function(){
    localStorage.removeItem("uToken");
    location.href="./index.html";
})
//=============== Functions ===================
//=============== Validations =================


