//=============== Global ======================
const inputsArray = document.querySelectorAll("input");
const errorMsgElement = document.querySelector(".errormsg-alert");

let accountsArr ;
if(localStorage.getItem("accountsArr")){
    accountsArr = JSON.parse(localStorage.getItem("accountsArr"));
}
else {
    accountsArr = [];
}


let userName ;


//=============== Events ======================
document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault();
    checkLogin();
})


//=============== Functions ===================
function checkLogin(){
    if(validateEmail() && validatePassword()){
        if(checkDataAvailabilty()){
            window.location.href = './home.html';
            localStorage.setItem("uToken",userName);   
        }
    }
}


function checkDataAvailabilty(){
    let account = accountsArr.find((accountSearch) => accountSearch.email === inputsArray[0].value);
    if(account){
        if(account.password === inputsArray[1].value){
            errorMsgElement.classList.add("d-none");
            userName = account.name;
            return true;
        } else{
            errorMsgElement.innerHTML = "Password is not correct!";
            errorMsgElement.classList.remove("d-none");
            return false;
        }
        
    } else {
        errorMsgElement.innerHTML = "No account with this E-mail!";
        errorMsgElement.classList.remove("d-none");
        return false;
    }
}

//=============== Validations =================
//check validation of email and password before send a request to server
function validateEmail(){
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailRegex.test(inputsArray[0].value)){
        inputsArray[0].classList.add("is-valid");
        inputsArray[0].classList.remove("is-invalid");

        return true;
    }else{
        inputsArray[0].classList.add("is-invalid");
        inputsArray[0].classList.remove("is-valid");
        return false;
    }
}

function validatePassword(){
    let flag = true;
    let mainRegx= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    
    validatePasswordItem(0,/(?=.*[a-z])/);
    validatePasswordItem(1,/(?=.*[A-Z])/);
    validatePasswordItem(2,/(?=.*\d)/);
    validatePasswordItem(3,/(.*\W.*)/);
    validatePasswordItem(4,mainRegx);

    if(flag){
        inputsArray[1].classList.add("is-valid");
        inputsArray[1].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[1].classList.add("is-invalid");
        inputsArray[1].classList.remove("is-valid");
        return false;
    }

    function validatePasswordItem (elementIndex, regexValue){
        if(regexValue.test(inputsArray[1].value)){
            flag &=true;
            document.querySelectorAll(".password-validation li")[elementIndex].classList.remove("text-danger");
            document.querySelectorAll(".password-validation li")[elementIndex].classList.add("text-success");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.add("fa-circle-check");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.remove("fa-circle-xmark");
        }
        else {
            flag &= false;
            document.querySelectorAll(".password-validation li")[elementIndex].classList.add("text-danger");
            document.querySelectorAll(".password-validation li")[elementIndex].classList.remove("text-success");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.remove("fa-circle-check");
            document.querySelectorAll(".password-validation li i")[elementIndex].classList.add("fa-circle-xmark");
        }
    }
}


