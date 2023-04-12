/* CASOS DE ERROR A CONTEMPLAR
    --> Cuando se pasa una cota que no tiene raíz en el medio -> Verificar por teorema del valor intermedio
    --> Se pasa un epsilon negativo
    --> Cuando se pasa al revés el orden de los límtes de la cota (primero el fin, después el principio)
    --> Cuando la derivada de la función retorne 0

La condición de parada de este ejercicio es el epsilon (#ver de agregar la cantidad de pasos, no recuerdo 
    cómo calcular el orden de convergencia en este caso)

*/
const raizEquisAlCuboMenosTres = Math.pow(3, 1 / 3);
const funcionAEvaluar = x => Math.pow(x, 3) - 3;
const derivadaPrimeraEquisCuboMenosTres = x => 3 * Math.pow(x, 2);
const derivadaSegundaEquisCuboMenosTres = 3;

function errorRelativo(valorAproximado) {
    return Math.abs((raizEquisAlCuboMenosTres - valorAproximado)) / raizEquisAlCuboMenosTres;
}

function errorAbsoluto(valorAproximado) {
    return Math.abs(Math.pow(3, 1 / 3) - valorAproximado);;
}

function funcionNewton(funcion, primeraDerivadaFuncion, primeraAproximacion) {
    return primeraAproximacion - (funcion(primeraAproximacion) / primeraDerivadaFuncion(primeraAproximacion));
}

function metodoNewton(primerValor, limitePasos, epsilon) {
    let raizAproximada = funcionNewton(funcionAEvaluar, derivadaPrimeraEquisCuboMenosTres, primerValor);
    let errorAlcanzado = errorRelativo(raizAproximada);
    let cantidadPasos = 0;

    while (cantidadPasos < limitePasos) {
        let nuevaRaizAproximada = funcionNewton(funcionAEvaluar, derivadaPrimeraEquisCuboMenosTres, raizAproximada);
        raizAproximada = nuevaRaizAproximada;
        errorAlcanzado = errorRelativo(raizAproximada);
        cantidadPasos += 1;
        if (errorAlcanzado <= epsilon) {
            break;
        }
    }

    return {
        raizAproximada: raizAproximada,
        errorAlcanzado: errorAlcanzado,
        cantidadPasos: cantidadPasos
    }
}

function funcionSecante(funcion, primerValorAnterior, segundoValorAnterior) {
    let p1 = funcion(primerValorAnterior);
    let p0 = funcion(segundoValorAnterior);
    let numerador = p1 * (primerValorAnterior - segundoValorAnterior);
    let denominador = p1 - p0;
    return primerValorAnterior - (numerador / denominador);
}

function metodoSecante(primerValorAnterior, segundoValorAnterior, limitePasos, epsilon) {
    let raizAproximada = funcionSecante(funcionAEvaluar, primerValorAnterior, segundoValorAnterior);
    let cantidadPasos = 1;
    let errorAlcanzado = errorAbsoluto(raizAproximada);

    while (cantidadPasos < limitePasos) {
        let nuevoPrimerValorAnterior = raizAproximada;
        let nuevoSegundoValorAnterior = primerValorAnterior;
        raizAproximada = funcionSecante(funcionAEvaluar, nuevoPrimerValorAnterior, nuevoSegundoValorAnterior);
        errorAlcanzado = errorAbsoluto(raizAproximada);
        cantidadPasos += 1;
        if (errorAlcanzado <= epsilon) {
            break;
        }
    }

    return {
        raizAproximada: raizAproximada,
        errorAlcanzado: errorAlcanzado,
        cantidadPasos: cantidadPasos
    };
}

function combinatoriaSecanteNewton(limiteInferior, limiteSuperior, limitePasos, epsilon) {
    const resultado = {};
    let fueAplicadaNewton = false;
    let raizAproximada = funcionSecante(funcionAEvaluar, limiteSuperior, limiteInferior);
    let fueAplicadaSecante = true;
    let cantidadPasos = 1;
    let errorAlcanzado = errorAbsoluto(raizAproximada);
    let nuevoPrimerValorAnterior = raizAproximada;
    let nuevoSegundoValorAnterior = limiteSuperior;

    while (cantidadPasos < limitePasos) {
        if (fueAplicadaSecante) {
            let nuevaRaizAproximada = funcionNewton(funcionAEvaluar, derivadaPrimeraEquisCuboMenosTres, raizAproximada);
            raizAproximada = nuevaRaizAproximada;
            errorAlcanzado = errorAbsoluto(raizAproximada);
            cantidadPasos += 1;
            if (errorAlcanzado <= epsilon) {
                break;
            }
            fueAplicadaNewton = true;
            resultado.raizAproximada = raizAproximada;
            resultado.errorAlcanzado = errorAlcanzado;
            resultado.cantidadPasos = cantidadPasos;
        }
        if (fueAplicadaNewton) {
            raizAproximada = funcionSecante(funcionAEvaluar, nuevoPrimerValorAnterior, nuevoSegundoValorAnterior);
            let aux = nuevoPrimerValorAnterior;
            nuevoPrimerValorAnterior = raizAproximada;
            nuevoSegundoValorAnterior = aux;
            errorAlcanzado = errorAbsoluto(raizAproximada);
            cantidadPasos += 1;
            if (errorAlcanzado <= epsilon) {
                break;
            }
            resultado.raizAproximada = raizAproximada;
            resultado.errorAlcanzado = errorAlcanzado;
            resultado.cantidadPasos = cantidadPasos;
            fueAplicadaSecante = true;
        }
        console.log(resultado);
    }
    return resultado;
}

// let resultado = metodoSecante(2, 1, 50, 0.000000000000000000000000000000000000001);
// let resultadoNewton = metodoNewton(1.2, 30, 0.0000000000000000000000000000001);

// console.log(resultadoNewton);

// console.log("---------------------------------------------------------------------------------");
// console.log("| RAÍZ               | ERROR                   | NÚMERO DE PASOS                |");
// console.log(`| ${resultado.raizAproximada} | ${resultado.errorAlcanzado} | ${resultado.cantidadPasos}                              |`);
// console.log("---------------------------------------------------------------------------------");
combinatoriaSecanteNewton(1, 2, 25, 0.000000000000000001);