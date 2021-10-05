
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

let username;

do {
     username = prompt('¿Cúal es tu nombre?', 'Manu');
} while (!username);
alert ('Bienvenido a airlines '+ username);
    
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



/** -------    FUNCIONES   --------------------------- */
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
    
