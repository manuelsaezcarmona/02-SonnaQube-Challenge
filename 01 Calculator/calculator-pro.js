/*
- CALCULATOR PRO
*/

let again;

do {
  calculatorPro();
  again = confirm("¿Quieres realizar otro calculo?");
} while (again);

alert("Nos vemos!");

/** -----------------------------------  */
function calculatorPro() {
  let newNumber;
  let numberList = [];
  const descripcionoperaciones = [
    "suma",
    "resta",
    "multiplicacion",
    "division",
  ];
  do {
    newNumber = prompt("Introduce un numero o presiona Cancel para parar");
    if (!isNaN(newNumber) && newNumber !== null) {
      numberList.push(parseFloat(newNumber));
      console.log(
        `Has instroducido el número ${newNumber} como numero ${numberList.length}`
      );
    } else if (newNumber !== null) {
      console.log("Lo que has introducido NO es un número");
    }
  } while (newNumber !== null);

  let resultados = calculoGlobal(numberList);

  for (let i = 0; i < resultados.length; i++) {
    console.log(
      "El resultado de la " +
        descripcionoperaciones[i] +
        " es: " +
        resultados[i].toFixed(3)
    );
  }
}

function calculoGlobal(arrayNumbers) {
  let totalSuma = 0;
  let totalResta = 0;
  let totalMultiplicacion = 1;
  let totalDivision = 1;
  let resultados = [];

  for (let number of arrayNumbers) {
    totalSuma += number;
    totalResta -= number;
    totalMultiplicacion *= number;
    totalDivision /= number;
  }

  resultados[0] = totalSuma;
  resultados[1] = totalResta;
  resultados[2] = totalMultiplicacion;
  resultados[3] = totalDivision;
  return resultados;
}
