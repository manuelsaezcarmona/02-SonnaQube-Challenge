import {alphabet, questions} from './data.js';


// const player_template = { name: 'Manu', correct_questions : 4, wrong_questions: 6};

const ranking = [];

const playerFactoryNew = {
    name: '',
    setPlayerName: () => {
        do {
            nameplayer = prompt('¿Cúal es tu nombre?', 'Manu');
        } while (!nameplayer);
        this.name = nameplayer;
    }
};


const playerFactory = (name = 'default', correctQuestions = 0,wrongQuestions = 0) => {
    return {
        _name: name,
        _correctQuestions: correctQuestions,
        _wrongQuestions: wrongQuestions,
        set playerName(nameplayer){ // por guevos tiene que tener un parametro.
            do {
                nameplayer = prompt('¿Cúal es tu nombre?', 'Manu');
            } while (!nameplayer);
            this._name = nameplayer;
        },
        set correctQset(correct_questions){
            this._score = correct_questions;
        },
        set wrongQset(wrong_questions){
            this._score = wrong_questions;
        },
        get nameget(){
            return this._name;
        },
        get correctQuestionsget(){
            return this._correctQuestions;
        },
        get wrongQuestionsget(){
            return this._wrongQuestions;
        }

    }
};

// const questions = require('./questions.js');
// en el archivo questions.js seria: 
// const questions =  [ ... ];
// export default questions;


 
/**   FUNCIONES AUXILIARES   */
const chooseOption = (min, max) => {
    let option;
    do {
        option = parseInt(prompt(`Escoge una opcion (${min} - ${max})`));
    } while ( option < min || option > max || !option);

    return option;
}

const preguntarNombre = () => {
    let nombre = prompt('x');

    if (nombre === null) {

    } else  {
        
    }
}

pasapalabraMain();
/* Funciones de Estructura */ 
const pasapalabraMainNew = () => {
    preguntarNombre();
    mostrarPreguntas();
    mostrarRanking();
}


function pasapalabraMain(){
    let player = playerFactory();
    player.playerName = '';
    console.log(player);
    showMainMenu(player);
}





function showMainMenu(player){
    console.log(`-------- BIENVENIDO ${player.nameget} AAAL BIIINGOOOO!! --------
    ¿Que deseas realizar?
        1 - Instrucciones.
        2 - Jugar a Pasapalabra
        3 - Cambiar de jugador.
        4 - Ranking de Jugadores.
        5 - Salir del Juego.

    `);
    let option  = chooseOption(1,5);
    
    switch (option) {
        case 1:
            // Mostrar instrucciones
            break;
        case 2:
            // Jugar a pasapalabra
            break;
        case 3:
            // Cambiar de jugador !No el nombre se trata de un jugador nuevo
            ranking.push(player);// Lo hago para probar que el objeto player es nuevo y el antiguo lo guardo
            player = playerFactory();
            player.playerName = '';
            showMainMenu(player);
            break;
        case 4:
            // Ranking de Jugadores
            console.table(ranking ,['_name','_correctQuestions','_wrongQuestions']);
            showMainMenu(player);
            break;
        case 5:
            // Salir de Juego
            alert('Nos Vemos!!!');   
            break;
    
    }
}

function pasapalabraGame(){
    let rosco = makeRosco(alphabet, questions);

} // pasapalabraGame


function makeRosco(alphabet, questions){
    const rosco = [];
    for (letra of alphabet){
        const arrayletter = questions.filter(question => question.letter === letra);
        const indexselected =  Math.floor(Math.random()*arrayletter.length);
        rosco.push(arrayletter[indexselected]);
    };
    return rosco;  
}





