const allJuegos = [];
//Juego 1.
allJuegos.push({nombre: "Grand Theft Auto VI",
    descripcion: "Jason y Lucía quedan atrapados en una conspiración criminal en el lado más oscuro de Estados Unidos tras un golpe que sale mal, obligados a cuidarse el uno al otro.",
    imagen: "./Tfi_project_main/imagenes/gta-VI.jpg",
    alt: "Grand Theft Auto VI img"
});
//Juego 2.
allJuegos.push({nombre: "EA Sports FC 27",
    descripcion: "Lleva a tu equipo a la cima con un Modo Carrera completamente reconstruido. Disfruta del nuevo modo The Grounds!",
    imagen: "./Tfi_project_main/imagenes/EA-FC-27.jpg",
    alt: "EA Sports FC 27 img"
});
//Juego 3.
allJuegos.push({nombre: "The Last of Us Part II",
    descripcion: "Vive los crecientes conflictos morales creados por Ellie en su implacable búsqueda de venganza.",
    imagen: "./Tfi_project_main/imagenes/tlos2.jpg",
    alt: "The Last of Us Part II img"
});
//Juego 4.
allJuegos.push({nombre: "Star Wars: Galactic Racer",
    descripcion: "STAR WARS: Galactic Racer™ es una vuelta de tuerca a las carreras nacidas en el Borde Exterior!",
    imagen: "./Tfi_project_main/imagenes/Star-Wars-Galactic-Racer.webp",
    alt: "Galactic Racer img"
});
//Juego 5.
allJuegos.push({nombre: "Call of Duty Modern Warfare 4",
    descripcion: "La guerra estalla en la península de Corea cuando Corea del Norte lanza una invasión a gran escala que amenaza con desestabilizar el mundo",
    imagen: "./Tfi_project_main/imagenes/Mw4.jpg",
    alt: "Modern Warfare 4 img"
});
//Juego 6.
allJuegos.push({nombre: "Minecraft",
    descripcion: "Minecraft es un juego de construcción y supervivencia en un mundo abierto generado por procedimientos, donde los jugadores pueden explorar, recolectar recursos y crear estructuras.",
    imagen: "./Tfi_project_main/imagenes/minecraft.jpg",
    alt: "Minecraft img"
});


const imgCarrusel = document.getElementById("img-carru");
const nombreJuego = document.getElementById("nombre-juego");
const descripcionJuego = document.getElementById("descrip-juego");
const botonAnterior = document.getElementById("ant");
const contadorImg = document.getElementById("contador");
const botonSiguiente = document.getElementById("sig");

let cont = 0;

 const mostrarJuego = () => {
    const juegoPosicion = allJuegos[cont];

    nombreJuego.textContent = juegoPosicion.nombre;
    descripcionJuego.textContent = juegoPosicion.descripcion;
    imgCarrusel.src = juegoPosicion.imagen;
    imgCarrusel.alt = juegoPosicion.alt;
    contadorImg.textContent = (cont + 1) + " / " + allJuegos.length;
};

botonAnterior.addEventListener("click", () =>{
    cont--;
    if (cont < 0) {
        cont = allJuegos.length - 1;
    }
    mostrarJuego();
});

botonSiguiente.addEventListener("click", () => {
    cont++;
    if (cont >= allJuegos.length) {
        cont = 0;
    }
    mostrarJuego();
});

mostrarJuego();