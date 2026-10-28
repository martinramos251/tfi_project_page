/* Buscamos el formulario y sus campos. */
const formulario = document.getElementById("formulario-contacto");

const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoTelefono = document.getElementById("telefono");
const campoMensaje = document.getElementById("mensaje");

const estadoFormulario = document.getElementById("estado-formulario");
const resumenContenedor = document.getElementById("resumen-contenedor");

/* Expresiones regulares para validar email y teléfono. */
const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Acepta números, espacios, paréntesis, + y guiones. */
/* Luego comprobaremos que tenga entre 8 y 15 dígitos. */
const patronTelefono = /^[0-9+\s()-]+$/;

/* Muestra el error asociado a un campo. */
function mostrarError(campo, mensaje) {
    const elementoError = document.getElementById("error-" + campo.id);

    elementoError.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
}

/* Limpia el error asociado a un campo. */
function limpiarError(campo) {
    const elementoError = document.getElementById("error-" + campo.id);

    elementoError.textContent = "";
    campo.removeAttribute("aria-invalid");
}

/* Valida el nombre. */
function validarNombre() {
    const nombre = campoNombre.value.trim();

    campoNombre.value = nombre;

    if (nombre === "") {
        mostrarError(campoNombre, "Ingresá tu nombre.");
        return false;
    }

    if (nombre.length < 3) {
        mostrarError(
            campoNombre,
            "El nombre debe tener al menos 3 caracteres."
        );
        return false;
    }

    if (nombre.length > 60) {
        mostrarError(
            campoNombre,
            "El nombre no puede superar los 60 caracteres."
        );
        return false;
    }

    limpiarError(campoNombre);
    return true;
}

/* Valida el correo electrónico. */
function validarEmail() {
    const email = campoEmail.value.trim();

    campoEmail.value = email;

    if (email === "") {
        mostrarError(campoEmail, "Ingresá tu correo electrónico.");
        return false;
    }

    if (email.length > 100 || !patronEmail.test(email)) {
        mostrarError(
            campoEmail,
            "Ingresá un correo válido, por ejemplo usuario@gmail.com."
        );
        return false;
    }

    limpiarError(campoEmail);
    return true;
}

/* Valida el teléfono. */
function validarTelefono() {
    const telefono = campoTelefono.value.trim();

    campoTelefono.value = telefono;

    /* Quitamos los caracteres permitidos que no son dígitos. */
    const digitos = telefono.replace(/[\s()+-]/g, "");

    if (telefono === "") {
        mostrarError(campoTelefono, "Ingresá tu teléfono.");
        return false;
    }

    if (
        !patronTelefono.test(telefono) ||
        digitos.length < 8 ||
        digitos.length > 15
    ) {
        mostrarError(
            campoTelefono,
            "Ingresá un teléfono válido con entre 8 y 15 dígitos."
        );
        return false;
    }

    limpiarError(campoTelefono);
    return true;
}

/* Valida el mensaje. */
function validarMensaje() {
    const mensaje = campoMensaje.value.trim();

    campoMensaje.value = mensaje;

    if (mensaje === "") {
        mostrarError(campoMensaje, "Escribí tu consulta.");
        return false;
    }

    if (mensaje.length < 10) {
        mostrarError(
            campoMensaje,
            "La consulta debe tener al menos 10 caracteres."
        );
        return false;
    }

    if (mensaje.length > 500) {
        mostrarError(
            campoMensaje,
            "La consulta no puede superar los 500 caracteres."
        );
        return false;
    }

    limpiarError(campoMensaje);
    return true;
}

/* Comprueba los datos cuando se intenta enviar el formulario. */
formulario.addEventListener("submit", function (evento) {

    /* Evitamos el envío tradicional del formulario. */
    evento.preventDefault();

    /* Validamos todos los campos. */
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const telefonoValido = validarTelefono();
    const mensajeValido = validarMensaje();

    /* Si algún campo es incorrecto, no creamos el resumen. */
    if (
        !nombreValido ||
        !emailValido ||
        !telefonoValido ||
        !mensajeValido
    ) {
        estadoFormulario.textContent =
            "Revisá los campos marcados y corregí los errores.";

        resumenContenedor.replaceChildren();

        /* Llevamos el foco al primer campo incorrecto. */
        const primerCampoIncorrecto = formulario.querySelector(
            '[aria-invalid="true"]'
        );

        if (primerCampoIncorrecto) {
            primerCampoIncorrecto.focus();
        }

        return;
    }

    /* Todos los datos son válidos. */
    estadoFormulario.textContent = "¡Tu consulta fue preparada correctamente!";

    /* Creamos el resumen desde JavaScript. */
    const resumen = document.createElement("article");
    resumen.classList.add("resumen");

    const titulo = document.createElement("h2");
    titulo.textContent = "Resumen de tu consulta";

    const parrafoNombre = document.createElement("p");
    parrafoNombre.textContent = "Nombre: " + campoNombre.value;

    const parrafoEmail = document.createElement("p");
    parrafoEmail.textContent = "Correo electrónico: " + campoEmail.value;

    const parrafoTelefono = document.createElement("p");
    parrafoTelefono.textContent = "Teléfono: " + campoTelefono.value;

    const tituloMensaje = document.createElement("h3");
    tituloMensaje.textContent = "Mensaje";

    const parrafoMensaje = document.createElement("p");
    parrafoMensaje.textContent = campoMensaje.value;

    /* Agregamos los elementos creados al resumen. */
    resumen.appendChild(titulo);
    resumen.appendChild(parrafoNombre);
    resumen.appendChild(parrafoEmail);
    resumen.appendChild(parrafoTelefono);
    resumen.appendChild(tituloMensaje);
    resumen.appendChild(parrafoMensaje);

    /* Mostramos el resumen en la página. */
    resumenContenedor.replaceChildren(resumen);

    /* Dejamos el formulario preparado para una nueva consulta. */
    formulario.reset();

    /* Colocamos el foco en el resumen para facilitar su lectura. */
    resumen.querySelector("h2").setAttribute("tabindex", "-1");
    resumen.querySelector("h2").focus();

});

/* Si el usuario modifica un campo, borramos su error anterior. */
campoNombre.addEventListener("input", function () {
    limpiarError(campoNombre);
});

campoEmail.addEventListener("input", function () {
    limpiarError(campoEmail);
});

campoTelefono.addEventListener("input", function () {
    limpiarError(campoTelefono);
});

campoMensaje.addEventListener("input", function () {
    limpiarError(campoMensaje);
});