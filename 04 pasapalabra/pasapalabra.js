import {alphabet, questions, playerFactory, ranking} from './data.js';

 
/**   FUNCIONES AUXILIARES   */
const chooseOption = (min, max) => {
    let option;
    do {
        option = parseInt(prompt(`Escoge una opcion (${min} - ${max})`));
    } while ( option < min || option > max || !option);

    return option;
}

const makeRosco = (alphabet, questions) => {
    const rosco = [];
    for (let letra of alphabet){
        const arrayletter = questions.filter(question => question.letter === letra);
        const indexselected =  Math.floor(Math.random()*arrayletter.length);
        rosco.push(arrayletter[indexselected]);
    };
    return rosco;  
}

const isRoscoCompleted = (rosco) =>{
    let roscocompleted = rosco.every(question => question.status > 0);
    return roscocompleted;
}


const throwQuestion = (pregunta) =>{
    let response;
    do {
        response = prompt(pregunta);
    } while (!response);
    return response;
}

const formatResponse= (texto) =>{
    // Quitar acentos y caracteres raros solucion copiada de : 
    // https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
    return texto
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize();
}


const checkResponse = (response, answer) =>{
    // El valor que retorna es para almacenar en el rosco.
    if (response === 'pasapalabra'){
        return 0; 
    }else if (response ===answer){
        // Es correcto
        alert('CORRECTO!!!!  '+ answer + ' es la respuesta');
        return 1;
    }else{
        // Es erroneo.
        alert('LO SIENTO !! la respuesta correcta es: '+ answer);
        return 2;
    }
}

const countAnswers = (rosco, status) => {
    let answers = rosco.reduce((acumulator, question) => {
        if (question.status === status){
            acumulator++;
        }else{
            acumulator;
        }
        return acumulator;
    },0);
    return answers;
}

/* Funciones de Estructura */ 

const pasapalabraGame = (player) =>{
    let rosco = makeRosco(alphabet, questions);
    let roscoIndex = 0;
    let status = null;
    let roscocompletado = false;
    let abandon = false;

    while(!roscocompletado){

        if (roscoIndex === rosco.length) {roscoIndex = 0};

        if (rosco[roscoIndex].status === 0){
            let response = throwQuestion(rosco[roscoIndex].question);
            response = formatResponse(response);
            
            if (response !== 'end'){
                status = checkResponse(response,rosco[roscoIndex].answer);
                rosco[roscoIndex].status = status;
               // console.log(rosco[roscoIndex]);
            }else{
                console.log('Has abandonado el pasapalabra');
                abandon = true;
                roscocompletado = true;
            }
        }
        roscocompletado = isRoscoCompleted(rosco);
        roscoIndex++;
    }; // fin while
    
    if (!abandon){
        let correctAnswers = countAnswers(rosco,1);
        let mistakes = countAnswers(rosco,2);
        console.log('Has completado el rosco');
        console.log('respuestas correctas: ' + correctAnswers);
        console.log('respuestas incorrectas: ' + mistakes);
        player._correctQuestions = correctAnswers;
        player._wrongQuestions = mistakes;
        ranking.push(player);
    }else{
        //let responses = countAnswers(rosco, 1);
        console.log(`${player.nameget}, estas son tus respuetas correctas ${countAnswers(rosco, 1)}, como has abandonado el rosco tu puntuacion no se registra`);
    }

} // pasapalabraGame 

const showMainMenu = (player) => {
    console.log(`-------- BIENVENIDO ${player.nameget} A PASAPALABRA!! --------
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
            console.log(
                `                       ---------- INSTRUCCIONES ----------
                    El juego te dar una definicion y deberas adivinar la palabra.
                    Si no la sabes escribes pasapalabra y pasaras a la siguiente pregunta.
                    Cuando termines con la Z te volvera a preguntar por aquellas que has pasado de responder.
                    Solo terminarás cuando respondas a todas las preguntas , y te dará un resumen de tu juego
                    y te resgistrará en el ranking.
                    Si quieres terminar escribe la palabra "end" como respuesta, te facilitará tus respuestas
                    acertadas pero no seras inscrito en el ranking.

                                            ¡¡¡¡¡¡ MUCHA SUERTE!!!!!!!
                `);
            showMainMenu(player);
            break;
        case 2:
            // Jugar a pasapalabra
            pasapalabraGame(player);
            showMainMenu(player);
            break;
        case 3:
            // Cambiar de jugador, se trata de un jugador nuevo
            player = playerFactory();
            player.playerName = '';
            //console.table(ranking ,['_name','_correctQuestions','_wrongQuestions']);
            showMainMenu(player);
            break;
        case 4:
            // Ranking de Jugadores - Aqui pondremos la funcion de ordenar el array por respuestas correctas.
            ranking.sort((playerA, playerB) => playerB.correctQuestionsget - playerA.correctQuestionsget );
            console.table(ranking ,['_name','_correctQuestions','_wrongQuestions']);
            showMainMenu(player);
            break;
        case 5:
            // Salir de Juego
            alert('Nos Vemos!!!');   
            break;
    }
} // pasapalabraMain


const pasapalabraMain = () => {
    let player = playerFactory();
    player.playerName = '';
    showMainMenu(player);
}



pasapalabraMain();













