export function validar (input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío" 
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido" 
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 8 caracteres, máximo 12, debe contener una letra mayúscula, un minúscula, un número y con caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing: "El campo de número de telefono no puede estar vacío",
        patternMismatch: "El formato requerido es: (XX)XXX-XXX-XX 10 números"
    },
    direccion:{
        valueMissing: "El campo de Dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "El campo de Ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
    },
    estado:{
        valueMissing: "El campo de Estado no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres"
    }
}

const validadores ={
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tiposDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]); 
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años";
    }

    input.setCustomValidity(mensaje);
}


function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
