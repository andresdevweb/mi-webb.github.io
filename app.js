/**********************
 * 
 * Form
 * 
 **************************/

let user = document.getElementById('userName');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirPasword');
let spanError = document.querySelectorAll('error');
let btn = document.getElementById('sumit');
let form = document.querySelector('.form');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    let user = checkUser(),
        email = checkEmail(),
        password = checkPassword(),
        confirmPassword = checkConfirmPassword();

    if(user && email && password && confirmPassword){
        alert('funciona');
    }

});

const isRequired = value => value == '' ? false : true;

function isValid(length){
    const min = 8, max = 20;
    return length < min || length > max ? false : true;

};

function emailValid(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function passwordValid(password){
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");    
    return re.test(password);
};

const showError = (input, message) => {

    let parent = input.parentElement;

    parent.classList.remove('success');
    parent.classList.add('error');

    const error = parent.querySelector('span');
    error.textContent = message;

}

const showSuccess = (input) => {

    let parent = input.parentElement;

    parent.classList.remove('error');
    parent.classList.add('success');

    const success = parent.querySelector('span');

    success.textContent = '';

}

const checkUser = () => {

    let valid = false;

    if(!isRequired(user.value.trim())){
        showError(user, 'Ingresa el usuario');
    } else if(!isValid(user.value.length)){
        showError(user, 'Debe tener entre 8 y 20 caracteres');
    } else{
        showSuccess(user);
        valid = true;
    }

    return valid;

};

const checkEmail = () => {

    let valid = false;

    if(!isRequired(email.value.trim())){
        showError(email,'Ingresa el Email');
    } else if(!emailValid(email.value.trim())){
        showError(email, 'Hay problemas de escritura con tu email');
    } else{
        showSuccess(email);
        valid = true;
    }

    return valid;

}

const checkPassword = () => {
    let valid = false;

    if(!isRequired(password.value.trim())){
        showError(password, 'Ingrese la contraseña');
    } else if(!passwordValid(password.value.trim())){
        showError(password, 'Debe tener min 8 caracteres, 1 letra, 1 letra Mayuscula, un numero y algun caracter especial');
    } else{
        showSuccess(password);
        valid = true;
    }
    return valid;
}

const checkConfirmPassword = () => {

    let valid = true;

    let confirm = confirmPassword.value.trim(); 
    let same = confirm === password.value.trim();

    if(!isRequired(confirm)){
        showError(confirmPassword, 'Confirma la contraseña');
    } else if(!same){
        showError(confirmPassword, 'No coinciden las contraseñas');
    } else{
        showSuccess(confirmPassword);
        valid = true;
    }

    return valid;

}

const debounce = (fn, delay = 750) => {

    let time;

    return(...args) => {

        if(time){
            clearTimeout(time);
        }

        time = setTimeout(() => {
            fn.apply(null, args);
        }, delay);

    }

}

form.addEventListener('input', debounce(function(e){

    switch (e.target.id){
        case 'userName':
            checkUser();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirPasword':
            checkConfirmPassword();
            break;
    }

}));
