/* CASOS DE ERROR A CONTEMPLAR
    --> Cuando se pasa una cota que no tiene raíz en el medio -> Verificar por teorema del valor intermedio
    --> Se pasa un epsilon negativo
    --> Cuando se pasa al revés el orden de los límtes de la cota (primero el fin, después el principio)
    --> Cuando la derivada de la función retorne 0

La condición de parada de este ejercicio es el epsilon (#ver de agregar la cantidad de pasos, no recuerdo 
    cómo calcular el orden de convergencia en este caso)

*/
const raizEquisAlCuboMenosTres = Math.pow(3, 1/3);
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
    return Math.abs((raizEquisAlCuboMenosTres - valorAproximado)) / raizEquisAlCuboMenosTres;
}

function errorAbsoluto(valorAproximado) {
    return Math.abs(Math.pow(3, 1/3) - valorAproximado);;
}

function metodoSecante(primerValorAnterior, segundoValorAnterior, limitePasos, epsilon) {
    let raizAproximada = funcionSecante(funcionAEvaluar, primerValorAnterior, segundoValorAnterior);
    let cantidadPasos = 1;
    let errorAlcanzado = errorAbsoluto(raizAproximada);

    while(cantidadPasos > limitePasos || errorAlcanzado > epsilon) {
        let nuevoPrimerValorAnterior = raizAproximada;
        let nuevoSegundoValorAnterior = primerValorAnterior;
        raizAproximada = funcionSecante(funcionAEvaluar, nuevoPrimerValorAnterior, nuevoSegundoValorAnterior);
        errorAlcanzado = errorAbsoluto(raizAproximada);
        cantidadPasos += 1;
    }
    
    return  { 
        raizAproximada: raizAproximada,
        errorAlcanzado: errorAlcanzado,
        cantidadPasos: cantidadPasos
    };
}


let resultado = metodoSecante(2, 1, 25, 0.0001);

console.log("-----------------------------------------------------");
console.log("| RAÍZ               | ERROR                   | NÚMERO DE PASOS                |");
console.log(`| ${resultado.raizAproximada} | ${resultado.errorAlcanzado} | ${resultado.cantidadPasos}                              |`);
console.log("-----------------------------------------------------");

