
let flights = [

    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },

    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },

    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },

    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },

    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },

    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },

    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },

    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },

    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },

    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },

    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false } ];

let username = "";
let usertype = "";

do {
    username = prompt('¿Cúal es tu nombre?', 'Manu');
} while (!username);
alert ('Bienvenido a airlines '+ username);

//airLines();


do {
    usertype = prompt('¿Eres Administrador (ADMIN) o Usuario (USER)', 'USER');
    if(usertype){usertype = usertype.toUpperCase()};
    
    // console.log('usertype donde '+usertype);
} while (usertype !== 'ADMIN' && usertype !== 'USER' || !usertype);


if (usertype ==='ADMIN'){
    airlinesAdmin();
}else if(usertype === 'USER'){
    airLinesUser();
}




function airlinesAdmin(){
    console.log(`¿Que deseas realizar?
        1 - Crear nuevos vuelos.
        2 - Eliminar un vuelo mediante su ID.
        3 - Salir.
    `);
    let option  = chooseOption(1,3);
    
        switch (option) {
        case 1:
            alert('Crear nuevos vuelos');
            createFlights(flights, 15);
            break;
        case 2:
            alert('Eliminar vuelos');
            deleteFlight(flights);        
            break;
        case 3:
            alert('Nos Vemos!!!');        
            break;
    }

}

function airLinesUser(){
    console.log(`¿Que deseas realizar?
        1 - Comprar o consultar vuelos.
        2 - Salir.
    `);
    
    let option = chooseOption(1,2);
    
    switch (option) {
        case 1:
           // alert('Comprar vuelos');  
            chooseFlights();      
            break;
        case 2:
            alert('Nos Vemos!!!');        
            break;
    }
}

function chooseFlights(){
    let budget; 
    let flightsFiltered = [];
    let allflights = flights.slice().sort((a,b)=> a.cost - b.cost);
    printFlights(allflights);
    do {
        budget = parseFloat(prompt('¿Cuanto te quieres gastar?'));
    } while (!budget );
    console.log(`VUELOS SEGUN TU PRESUPUESTO
        1 - Vuelos mas baratos 
        2 - Vuelos mas caros
        3 - Vuelos ajustados.
        4 - Volver
    `);
    let option = chooseOption(1,4);
    switch (option) {
        case 1:
            alert('Vuelos mas baratos');
            flightsFiltered = flights.filter( flight => {
                return flight.cost < budget;
            });
            purchaseFlight(flightsFiltered);
            break;
        case 2:
            alert('Vuelos mas caros');
            flightsFiltered = flights.filter( flight => flight.cost > budget); 
            purchaseFlight(flightsFiltered);
            break;
        case 3:
            alert('vuelos ajustados');
            flightsFiltered = flights.filter( flight => flight.cost === budget); 
            purchaseFlight(flightsFiltered);        
            break;
        case 4:
            airLinesUser();        
        break;
    }
}






/** -------    FUNCIONES   --------------------------- */

function airLines(){
    for (let i=0; i<flights.length;i++){
        console.log(`El vuelo con origen: ${flights[i].from} y destino ${flights[i].to} 
        tiene un coste de ${flights[i].cost} y ${isScale(flights[i].scale)}
        `);
    }
    console.log('El coste medio es: ' + averageCost(flights).toFixed(2));
    
    let flightsWithScale = flights.filter(flight => flight.scale === true);
    
    console.log('VUELOS CON ESCALA');
    
    flightsWithScale.forEach(flight => {
        console.log(`ID: ${flight.id}   DESTINO: ${flight.to}   COSTE: ${flight.cost}`);
    });
    
    
    
    // Ordenamos el array por id de manera ascendente, con este metodo el array cambia.
    flights.sort(function (a,b)  {
        return (a.id - b.id);
    });
    
    console.log('ULTIMOS 5 VUELOS REGISTRADOS');
    for (let i=flights.length-1; i > (flights.length-1) -5 ;i--){
        console.log(`El vuelo con origen: ${flights[i].from} y destino ${flights[i].to} 
        tiene un coste de ${flights[i].cost} y ${isScale(flights[i].scale)} ID: ${flights[i].id}
        `);
    }
    

}



function isScale(scale){
    if (scale){
        return 'realiza escala';
    }else{
        return 'no realiza ninguna escala';
    }
}

function averageCost(flights){
    let total = 0;
    for(let i=0; i < flights.length; i++){
        total += flights[i].cost;
    }
    console.log('total: '+total);
    return (total/flights.length)
}

function chooseOption(min, max){
    let option;
    do {
        option = parseInt(prompt(`Escoge una opcion (${min} - ${max})`));
        //console.log(option);
    } while ( option < min || option > max || !option);

    return option;
}

function printFlights(flightsArr){
     flightsArr.forEach(flight => {
        console.log(`ID: ${flight.id}  ORIGEN: ${flight.from} DESTINO: ${flight.to}   COSTE: ${flight.cost}`);
    });
}
    
function createFlights(flightsArr , limit = 15){
    if(flightsArr.length <= limit){
        let flight = {};
        //console.log(flightsArr);
        let questions = ['¿Cual es el Destino?', '¿Cual es su origen?', 'Precio de Coste', '¿Presenta escala (si / no)?'];
        let campos = ['to','from','cost','scale'];
        //Se asigna el ID sumando uno al ultimo registro
        flight.id = flightsArr[flightsArr.length-1].id + 1;
        for(let i =0; i<campos.length;i++){
            let dato = "";
            if (campos[i] === 'cost'){
                do {
                    dato = parseInt(prompt(questions[i]));
                } while (!dato);
            }else if(campos[i] === 'scale'){
                do {
                    dato = prompt(questions[i]);
                    dato = dato.toUpperCase();
                } while (!dato);
                dato = dato == 'SI' ? true : false;
            }else{
                do {
                    dato = prompt(questions[i]);
                } while (!dato);
            }
            flight[campos[i]] = dato;
        }
        console.log(flight);
        flightsArr.push(flight);
    }else{
        alert('Has alcanzado el limite de ' + limit + ' vuelos.');
    }
    printFlights(flightsArr);
    
    airlinesAdmin();
} // createFlights

function deleteFlight(flightsArr){
   
    printFlights(flightsArr);

    let flightDelete = parseInt(prompt('Introduce el ID del vuelo a borrar'));
    let indexflight = flightsArr.findIndex(flight => flight.id === flightDelete);

    if (indexflight !== -1){
        flightsArr.splice(indexflight, 1);
        alert('Se ha borrado el vuelo '+ flightDelete);
    }else{
        alert('El ID '+flightDelete+' que has solicitado borrar no existe');
    }
    airlinesAdmin();
}

function purchaseFlight(selectedFlights){
    let idFlight;
    printFlights(selectedFlights);
    do {
      idFlight  = parseInt(prompt('Introduce el ID del vuelo que quieres comprar'));
   } while (!selectedFlights.some(flight => flight.id === idFlight));
    
    let flight = selectedFlights.filter(flight => flight.id === idFlight);
    console.log('Gracias por comprar el siguiente vuelo:');
    printFlights(flight);
    airLinesUser();
}

