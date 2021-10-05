const playerFactory = (name,score = 0) => {
    return {
        _name: name,
        _score: score,
        set playerName(nameplayer){
            do {
                nameplayer = prompt('¿Cúal es tu nombre?', 'Manu');
            } while (!nameplayer);
            this._name = nameplayer;
        },
        set scoreset(otherScore){
            this._score = otherScore;
        },
        get nameget(){
            return this._name;
        },
        get scoreget(){
            return this._score;
        }
    }
};




mainBingo();


function mainBingo(){
    let player = playerFactory('yo');
    player.playerName ='';
    const scores = [
        playerFactory('Pepe', 1000),
        playerFactory('Juan', 1250),
        playerFactory('Jose', 980),
        playerFactory('Jorge', 89),
        playerFactory('Andrés', 321),
        playerFactory('Francisco', 121),
        playerFactory('Adrian', 798),
        playerFactory('Antonio', 530),
    
    ];
    showMainMenuBingo(player,scores);
   
} // mainBingo


/** FUNCIONES   */

function showMainMenuBingo(player, scores){
    console.log(`-------- BIENVENIDO ${player.nameget} AAAL BIIINGOOOO!! --------
    ¿Que deseas realizar?
        1 - Reglas de puntuacion.
        2 - Ranking de Jugadores.
        3 - Cambiar el nombre del jugador.
        4 - Jugar al Bingo.
        5 - Salir del Juego.

    `);
    let option  = chooseOption(1,5);
    
    switch (option) {
        case 1:
            alert('Reglas de puntuacion.');
           console.log(`                        ----  REGLAS DE PUNTUACION ----
                El programa puntua en función de los turnos en los que has conseguido realizar Bingo.
                Cuantos menos turnos tardes en realizar el Bingo mas puntos obtendrás:
                        -------- B U E N A    S U E R T E ------`);
            showMainMenuBingo(player,scores);
            break;
        case 2:
            alert('Ranking de Jugadores');
            scores.sort((playerA, playerB) => playerB._score - playerA._score );
            console.table(scores,["_score","_name"]);
            showMainMenuBingo(player,scores);   
            break;
        case 3:
            alert('Cambiar el nombre del jugador.'); 
            player.playerName ='';
            showMainMenuBingo(player,scores);       
            break;
        case 4:
            alert('Juguemos al Bingo!!!!');
            bingoGame(player, scores);
            break;
        case 5:
            alert('Nos Vemos!!!');        
            break;
    }

}


function bingoGame(player, scores){
    let bingoCard;
    let bombo = generateValues(1,99);
    let turnos = [];
    let nextTurn = false;
    let finish = false;
    let isline = false;
    let lineCount = 0;

    // genera el carton del bingo si no esta de acuerdo genera otro.
    do {
        bingoCard = generateBingoCard(3,5);
        console.table (BingoCardtoTable(bingoCard));
        
    } while (!confirm( player.nameget + ' ¿Este es el carton con el que quieres jugar?'));
    
    // Aceptado el carton empezamos el juego.
    do {
        alert('Turno nº: ' + (turnos.length+1));
        let bingoNum = generateNumber(bombo);
        turnos.push(bingoNum);
        alert('El numero sacado es el ... '+ bingoNum);
        matchNumber(bingoNum, bingoCard);
        lineCount = countingLines(bingoCard);
        console.log('Numeros sacados:' + turnos);
        
        if (lineCount === bingoCard.length){
            alert('HAS CANTADO BINGO');
            finish = true;
            nextTurn = false;
        }else if( lineCount === 1 && !isline){
            alert('HAS CANTADO LINEA SEGUIMOS PARA BINGO');
            isline = true;
            nextTurn = confirm('¿Sigues jugando o lo dejas?');
        }else{
            nextTurn = confirm('¿Sigues jugando o lo dejas?');
        }
    } while (nextTurn);
   
    // Resumen de la partida
    if(finish){
        let score;
        console.log(`Has tardado en hacer bingo ${turnos.length} Turnos`);
        score = calculateScore(turnos.length , bingoCard);
        console.log('Tu puntuacion es :' + score );
        player.scoreset = score;
        scores.push(player);
        
    }else{
        alert('abandonaste la partida asi que no accedes al ranking')
    }
    alert('Fin de juego');
    showMainMenuBingo(player,scores);  
}

function matchNumber(num, bingoCard){
    let numberMatch = -1;
    
    for (line of bingoCard){
        numberMatch = line.findIndex(elem => elem.number === num);
        if (numberMatch !== -1){line[numberMatch].matched = true;}
    }
    console.table(BingoCardtoTable(bingoCard));
}

function countingLines(bingoCard){
    let lineCount = 0;
    let isLine = false;
    for (line of bingoCard){
        isLine = line.every(elem => elem.matched === true);
        if (isLine === true) { lineCount++;}  
    }
    //console.log('Lineas Realizadas' + lineCount);
    return lineCount;
}


function calculateScore(turnos, bingoCard){
    /** Se calcula mediante un indice que relaciona los turnos con el minimo numero de turnos 
     * que es la cantidad de numeros del carton , se parte de una base de puntuacion resultando
     * la puntuacion mayor cuando menos turnos se tarde en realizar Bingo */
    let minTurnos = bingoCard.length * bingoCard[0].length;
    let indice = (turnos/minTurnos)/3.5;
    let basePuntuacion = 870;
    let puntuacion = Math.round(basePuntuacion *(1-indice) + basePuntuacion -turnos);
    return puntuacion;
}

function sortForRanking(scores){
    scores.sort((playerA, playerB) => playerB._score - playerA._score );
}


function generateBingoCard( lines, numbersInline) {
    /* Genera un carton de bingo con las lineas que tenga y los numeros por linea
   */
    //valores a incorporar en el carton.(no repetidos)
    let values = generateValues(1 ,99);
    // 1 - Crear un array padre (el carton)
    
    let cardBingo = [];
    
       for (let i=0; i< lines; i++){
        cardBingo.push([]); // array linea
        for (let j=0; j < numbersInline; j++){
            const numberObj = new Object();
            numberObj.number = generateNumber(values);
            numberObj.matched = false;
            cardBingo[i].push(numberObj);
            }
        }
  
   return cardBingo;
} // Generate Bingo Card

function BingoCardtoTable(bingoCard){
    //let tablebingosample = [[12,24,34,'X',234] , [11,54,65,34,53]  ]
    let bingoTable = [];
    for(let lines= 0; lines < bingoCard.length;lines++){
        let lineArr = bingoCard[lines].map(linea =>{
            if (linea.matched === false){
                return linea.number;    
            }else{
                return 'X';
            }
        });
        bingoTable.push(lineArr);
    }
    ;
    return bingoTable;
}

function generateValues(min, max){
    //genera un array de valores consecutivos
    let values = [];
    for (let i=min; i <=max ; i++){
        values.push(i);
    }
    return values;
}


function generateNumber(valuesArray){
    let number;
    // Genera un numero aleatorio de un array y elimina ese valor del array para evitar repetidos.
    do{
        number = valuesArray[Math.floor( Math.random()*(valuesArray.length) + valuesArray[0])];
    }while (typeof number === 'undefined') 
    if (valuesArray.length === 0){
        alert("No quedan mas numeros que sacar")
    }else{
        // Quitamos el valor de la lista para que no se repita. ¡¡¡¡ OJO !!!! modificamos el array de origen
        valuesArray.splice(valuesArray.indexOf(number),1);
    return number;
    }
}


function chooseOption(min, max){
    let option;
    do {
        option = parseInt(prompt(`Escoge una opcion (${min} - ${max})`));
        //console.log(option);
    } while ( option < min || option > max || !option);

    return option;
}





/* OEJETO DE REFERENCIA PARA CONSTRUIR EL CARTON DEL BINGO
return [
    [   {number: Math.random() , matched: false},
        {number: 12 , matched: false},
        {number: 13 , matched: false},
        {number: 14 , matched: false},
        {number: 15 , matched: false}
    ],
    [   {number: 21 , matched: false},
        {number: 22 , matched: false},
        {number: 23 , matched: false},
        {number: 24 , matched: false},
        {number: 25 , matched: false}
    ],
    [   {number: 31 , matched: false},
        {number: 32 , matched: false},
        {number: 33 , matched: false},
        {number: 34 , matched: false},
        {number: 55 , matched: false}
    ] 
] ; */