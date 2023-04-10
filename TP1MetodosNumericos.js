/* CASOS DE ERROR A CONTEMPLAR
    --> Cuando se pasa una cota que no tiene raíz en el medio -> Verificar por teorema del valor intermedio
    --> Se pasa un epsilon negativo
    --> Cuando se pasa al revés el orden de los límtes de la cota (primero el fin, después el principio)

La condición de parada de este ejercicio es el epsilon (#ver de agregar la cantidad de pasos, no recuerdo 
    cómo calcular el orden de convergencia en este caso)

*/

const functionEquisAlCuboMenosTres = (x) => Math.pow(x, 3) - 3; 

function errorRelativo(valorAproximado) {
    let raizEquisAlCuboMenosTres = Math.pow(3, 1/3);
    return (raizEquisAlCuboMenosTres - valorAproximado) / raizEquisAlCuboMenosTres;
}

function secanteNewton(limiteIntervaloInferior, limiteIntervaloSuperior, epsilon) {
    console.log(functionEquisAlCuboMenosTres(3));
    return ;
}

console.log(errorRelativo(1.44));

secanteNewton();