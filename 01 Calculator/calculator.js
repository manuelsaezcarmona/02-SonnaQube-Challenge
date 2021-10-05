
/*
AVISO: Para hacer la calculadora no se puede usar bajo ningún caso, el metodo eval()

● CALCULATOR

Haz una calculadora. Un único programa al que le pasarás uno o dos parámetros mediante "prompt". 
Los resultados deberían ser mostrados con 3 decimales como mucho (En caso que hubieran). 
El programa debe contemplar e informar al usuario en el caso de que este introduzca cualquier cosa que no sean números.

● Si el usuario introduce UN solo número, deberá mostrar SOLO su raíz cuadrada.

● Si introduce DOS números se mostrarán los resultados de la suma, resta, multiplicación y división de dichos valores.

● Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.

// Output>
Results:
The result of the sum is resultSum
The result of the rest is resultRe
*/ 

let resultados = [];
const descripcionoperaciones = ['suma', 'resta','multiplicacion', 'division'];
let numeros = 2;

let num1 = prompt('Introduce el PRIMER número');
esNumero(num1);
let num2 = prompt('Introduce el SEGUNDO número');
esNumero(num2);

switch(numeros){
    case 0:
        alert('No has introducido ningún Numero');
        break;
    case 1:
        if (isNaN(num1)){
            console.log('La raiz cuadrada de '+num2+' es : '+ Math.sqrt(parseFloat(num2)));
        }else{
            console.log('La raiz cuadrada de '+num1+' es : '+ Math.sqrt(parseFloat(num1)));
        }
        break;
    case 2:
        operaciones(num1 , num2);
        for (let i=0; i<resultados.length; i++){
            console.log('El resultado de la '+ descripcionoperaciones[i]+' es: '+ resultados[i].toFixed(3));
        }
        break;
}

function esNumero(numero){
    if(isNaN(numero) || numero === null || !numero){
        alert('Lo que has introducido NO es un numero');
        numeros--;
    };
}

function operaciones(numero1, numero2){
    numero1 = parseFloat(numero1);
    numero2 = parseFloat(numero2);
    resultados[0] = numero1 + numero2;
    resultados[1] = numero1 - numero2;
    resultados[2] = numero1 * numero2;
    resultados[3] = numero1 / numero2;
}



