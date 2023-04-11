/* CASOS DE ERROR A CONTEMPLAR
    --> Cuando se pasa una cota que no tiene raíz en el medio -> Verificar por teorema del valor intermedio
    --> Se pasa un epsilon negativo
    --> Cuando se pasa al revés el orden de los límtes de la cota (primero el fin, después el principio)
    --> Cuando la derivada de la función retorne 0

La condición de parada de este ejercicio es el epsilon (#ver de agregar la cantidad de pasos, no recuerdo 
    cómo calcular el orden de convergencia en este caso)

*/

const funcionAEvaluar = x => Math.pow(x, 3) - 3; 
const derivadaPrimeraEquisCuboMenosTres = x => 3*x
const derivadaSegundaEquisCuboMenosTres = 3;

function newton() {
    return;
}

function funcionSecante(funcion, primerValorAnterior, segundoValorAnterior) {
    let p1 = funcion(primerValorAnterior);
    let p0 = funcion(segundoValorAnterior);
    let numerador = p1 * (primerValorAnterior - segundoValorAnterior);
    let denominador = p1 - p0;
    return primerValorAnterior - (numerador / denominador);
}

function errorRelativo(valorAproximado) {
    const raizEquisAlCuboMenosTres = Math.pow(3, 1/3);
    return Math.abs((raizEquisAlCuboMenosTres - valorAproximado)) / raizEquisAlCuboMenosTres;
}

function errorAbsoluto(valorAproximado) {
    return Math.abs(Math.pow(3, 1/3) - valorAproximado);;
}

function metodoSecante(primerValorAnterior, segundoValorAnterior, limitePasos, epsilon) {
    let raizAproximada = funcionSecante(funcionAEvaluar, primerValorAnterior, segundoValorAnterior);
    let cantidadPasos = 1;
    console.log(cantidadPasos, ": ", raizAproximada);
    let errorAlcanzado = errorAbsoluto(raizAproximada);
    console.log("Error primero: ", errorAlcanzado);

    while(cantidadPasos > limitePasos || errorAlcanzado > epsilon) {
        let nuevoPrimerValorAnterior = raizAproximada;
        let nuevoSegundoValorAnterior = primerValorAnterior;
        raizAproximada = funcionSecante(funcionAEvaluar, nuevoPrimerValorAnterior, nuevoSegundoValorAnterior);
        errorAlcanzado = errorAbsoluto(raizAproximada);
        console.log("Error alcanzado: ", errorAlcanzado);
        console.log("Raíz: ", raizAproximada);
        cantidadPasos += 1;
    }
    
    return  { 
        raizAproximada: raizAproximada,
        errorAlcanzado: errorAlcanzado,
        cantidadPasos: cantidadPasos
    };
}


metodoSecante(2, 1, 25, 0.0001);
