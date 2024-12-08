//=============== Global Variables ======================
const inputsArray = document.querySelectorAll("input")

let accountsArr ;
if(localStorage.getItem("accountsArr")){
    accountsArr = JSON.parse(localStorage.getItem("accountsArr"));
}
else {
    accountsArr = [];
}


//=============== Events ======================
document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault();
    registerNewAccount();
});

inputsArray[0].addEventListener("input",function(){
    validateName();
});

inputsArray[1].addEventListener("input",function(){
    validateEmail();
});

inputsArray[2].addEventListener("input",function(){
    validatePassword();
});


//=============== Functions ===================
function registerNewAccount(){
    console.log("hi");
    if(validateName() && validateEmail() && validatePassword){
        let account = {
            name: inputsArray[0].value,
            email: inputsArray[1].value,
            password: inputsArray[2].value 
        }

        accountsArr.push(account);
        localStorage.setItem("accountsArr", JSON.stringify(accountsArr));
        clearInputs();
        alert("Your Account Created Successfully!, We Wait you to login.");
        window.location.href = 'index.html';
    }
    else{
        console.log("error");
    }
}

function clearInputs(){
    for(let i = 0; i<inputsArray.length ;i++){
        inputsArray[i].value = "";
        inputsArray[i].classList.remove("is-valid","is-invalid");
    }
}

//=============== Validations =================
function validateName(){
    const regex = /^[a-zA-Z]{3}[a-zA-Z\s]*$/;

    if(regex.test(inputsArray[0].value)){
        inputsArray[0].classList.add("is-valid");
        inputsArray[0].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[0].classList.add("is-invalid");
        inputsArray[0].classList.remove("is-valid");
        return false;
    }

}


function validateEmail(){
    let flag = true;
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // ([\w]{3,}) the first name should contain only letters and of length 3 or more
    // +\s the first name should be followed by a space
    // +([\w\s]{3,})+ the second name should contain only letters of length 3 or more and can be followed by other names or not
    // /i ignores the case of the letters. Can be uppercase or lowercase letters

    //check if email match regex
    if(!emailRegex.test(inputsArray[1].value)){
        flag &= false;
        document.querySelectorAll(".email-validation li")[0].classList.add("text-danger");
        document.querySelectorAll(".email-validation li")[0].classList.remove("text-success");
        document.querySelectorAll(".email-validation li i")[0].classList.remove("fa-circle-check");
        document.querySelectorAll(".email-validation li i")[0].classList.add("fa-circle-xmark");

    }else{
        document.querySelectorAll(".email-validation li")[0].classList.remove("text-danger");
        document.querySelectorAll(".email-validation li")[0].classList.add("text-success");
        document.querySelectorAll(".email-validation li i")[0].classList.add("fa-circle-check");
        document.querySelectorAll(".email-validation li i")[0].classList.remove("fa-circle-xmark");
    }

    //check if email registered before
    for (let i = 0; i<accountsArr.length; i++){
        if(inputsArray[1].value === accountsArr[i].email){
            document.querySelectorAll(".email-validation li")[1].classList.add("text-danger");
            document.querySelectorAll(".email-validation li")[1].classList.remove("text-success");
            document.querySelectorAll(".email-validation li i")[1].classList.remove("fa-circle-check");
            document.querySelectorAll(".email-validation li i")[1].classList.add("fa-circle-xmark");

            flag &= false;
            break;
        } else{
            document.querySelectorAll(".email-validation li")[1].classList.remove("text-danger");
            document.querySelectorAll(".email-validation li")[1].classList.add("text-success");
            document.querySelectorAll(".email-validation li i")[1].classList.add("fa-circle-check");
            document.querySelectorAll(".email-validation li i")[1].classList.remove("fa-circle-xmark");

        }
    }

    if(flag){
        inputsArray[1].classList.add("is-valid");
        inputsArray[1].classList.remove("is-invalid");
    } else{
        inputsArray[1].classList.add("is-invalid");
        inputsArray[1].classList.remove("is-valid");
    }
    return flag;
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
        inputsArray[2].classList.add("is-valid");
        inputsArray[2].classList.remove("is-invalid");
        return true;
    }
    else{
        inputsArray[2].classList.add("is-invalid");
        inputsArray[2].classList.remove("is-valid");
        return false;
    }

    function validatePasswordItem (elementIndex, regexValue){
        if(regexValue.test(inputsArray[2].value)){
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
