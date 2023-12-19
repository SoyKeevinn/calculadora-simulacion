// Obtener referencias a los botones y al elemento main
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const contenido1 = document.getElementById("contenido-1");
const contenido2 = document.getElementById("contenido-2");
const contenido3 = document.getElementById("contenido-3");
const mainContent = document.getElementById("main-content");

// Funciones para mostrar contenido según el botón clicado
function mostrarContenido1() {
  contenido1.style.display = "block";
  contenido2.style.display = "none";
  contenido3.style.display = "none";
}

function mostrarContenido2() {
  contenido1.style.display = "none";
  contenido2.style.display = "block";
  contenido3.style.display = "none";
}

function mostrarContenido3() {
  contenido1.style.display = "none";
  contenido2.style.display = "none";
  contenido3.style.display = "block";
}
    // Funciones para calcular los resultados y mostrarlos
function calcularResultado1() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;

    //Valores
  const lambda = Number(input1);
  const mu = Number(input2);
  const k = Number(input3);

    //Calcular P0
  const resultado = calcular_P0(lambda, mu, k);
  document.getElementById("P0").textContent = "P0 = " + resultado.toFixed(5);

    //Calcular Pk
  const resultado2 = calcularPk(lambda, mu, k, resultado);
  document.getElementById("Pk").textContent = "Pk = " + resultado2;

    //Calcular PNE
  const resultado3 = 1 - resultado2;
  document.getElementById("PNE").textContent = "PNE = " + resultado3.toFixed(5);

    //Calcular L 

    const clientesSistema = calcularL(lambda, mu, k, resultado);
    document.getElementById("L").textContent = "L = " + clientesSistema.toFixed(5);

    //Calcular Lq
    const clientesCola = calcularLq(lambda, mu, k, resultado);
    document.getElementById("Lq").textContent = "Lq = " + clientesCola.toFixed(5);


    //Calcular Ln
    const clientesColaNoVacia = clientesCola/resultado2;
    document.getElementById("Ln").textContent = "Ln = " + clientesColaNoVacia.toFixed(5); 

    //Calcular W
    const tiempoSistema = calcularW(lambda, mu, k, resultado);
    document.getElementById("W").textContent = "W = " + tiempoSistema.toFixed(5);


    //Calcular Wq
    const tiempoCola = calcularWq(lambda, mu, k, resultado);
    document.getElementById("Wq").textContent = "Wq = " + tiempoCola.toFixed(5);


    //Calcular Wn
    const tiempoColaNoVacia = tiempoCola/resultado2;
    document.getElementById("Wn").textContent = "Wn = " + tiempoColaNoVacia.toFixed(5);
}

function calcularResultado2() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;
  const input4 = document.getElementById("input4").value;

  //Valores
  const lambda = Number(input1);
  const mu = Number(input2);
  const k = Number(input3);
  const n = Number(input4);
  //Calcular Pn

  if (n < k) {
    const resultado4 = calcularPn(lambda, mu, k, n);
    document.getElementById("Pn").textContent =
      "Pn para n=0,1,2,...k = " + resultado4.toFixed(5);
  } else {
    const resultado4 = calcularPn2(lambda, mu, k, n);
    document.getElementById("Pn").textContent = "Pn para n>=k "+ resultado4.toFixed(5);
  }
}

/************************************************************************ */
function calcularResultado3() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;
  const input4 = document.getElementById("input4").value;

  const input5 = document.getElementById("input5").value;
  const input6 = document.getElementById("input6").value;
  const input7 = document.getElementById("input7").value;
  const input8 = document.getElementById("input8").value;
  const input9 = document.getElementById("input9").value;

  //Valores
  const lambda = Number(input1);
  const mu = Number(input2);
  const k = Number(input3);
  const n = Number(input4);

  //Costos
  const horas = Number(input5);
  const costoEsperaCola = Number(input6);
  const costoSistema = Number(input7);
  const costoServicio = Number(input8);
  const costoServidor = Number(input9);


  //Calcular CTTE
  const resultado = calcular_P0(lambda, mu, k);

  const tiempoCola = calcularWq(lambda, mu, k, resultado.toFixed(5));

  const ctte = lambda * horas * tiempoCola.toFixed(5) * costoEsperaCola.toFixed(3);
  document.getElementById("CTTE").textContent = "CTTE = " + ctte.toFixed(5);

  //Calcular CTTS
  
  const tiempoSistema = calcularW(lambda, mu, k, resultado);
  const ctts = lambda * horas * tiempoSistema.toFixed(2) * costoSistema;
  document.getElementById("CTTS").textContent = "CTTS = " + ctts.toFixed(3);

  //Calcularr CTTSer
  const tiempo = 1/mu;
  const cttserv = lambda * horas * tiempo.toFixed(3) * costoServicio;
  document.getElementById("CTTSer").textContent = "CTTSer = " + cttserv.toFixed(3);

  //Calcular CTS
  const cts = k * costoServidor * horas;
  document.getElementById("CTS").textContent = "CTS = " + cts.toFixed(3);

  //Calcular CT
  const ct = ctte + ctts + cttserv + cts;
  document.getElementById("CT").textContent = "CT = " + ct.toFixed(3);


}

function calcularResultado4() {
  const input1 = document.getElementById("inputM").value;
  const input2 = document.getElementById("inputL").value;
  const input3 = document.getElementById("inputU").value;
  const input4 = document.getElementById("inputK").value;
  const input5 = document.getElementById("inputN").value;

  //Valores
  const poblacion = Number(input1);
  const lambda = Number(input2);
  const mu = Number(input3);
  const k = Number(input4);
  const n = Number(input5);

  let pn =0;

  //Calcular P0
  const p0 = calcularP0F(lambda, mu, k, poblacion);
  document.getElementById("P0-F").textContent = "P0 = " + p0.toFixed(3);

  //Calcular Pn
  if(n < k){
     pn = calcularPnF(lambda, mu, n, poblacion, k);
    document.getElementById("Pn-F").textContent = "Pn = " + pn.toFixed(2);
    console.log("entro0");
  }else{
    pn = calcularPnF2(lambda, mu, k,n, poblacion);
    document.getElementById("Pn-F").textContent = "Pn = " + pn.toFixed(3);
  }

  //Calcular PE
  const pe = 1 - calcularPEF(k, lambda, mu, poblacion);
  document.getElementById("PE-F").textContent = "PE = " + pe.toFixed(3);

  //Calcular PNE
  const pne = 1 -pe;
  document.getElementById("PNE-F").textContent = "PNE = " + pne.toFixed(3);

  //Calcular L
  const l = calcularLF(k, lambda, mu, poblacion);
  document.getElementById("L-F").textContent = "L = " + l.toFixed(3);

  //Calcular Lq
  const lq = calcularLqF(k, lambda, mu, poblacion);
  document.getElementById("Lq-F").textContent = "Lq = " + lq.toFixed(3);

  //Calcular Ln
  const ln = lq / pe;
  document.getElementById("Ln-F").textContent = "Ln = " + ln.toFixed(3);

  //Calcular Wq
  const wq = lq / ((poblacion - l) * lambda);
  document.getElementById("Wq-F").textContent = "Wq = " + wq.toFixed(3); 

  //Calcular W
  const w = wq + (1 / mu);
  document.getElementById("W-F").textContent = "W = " + w.toFixed(3);

  //Calcular Wn
  const wn = wq / pe;
  document.getElementById("Wn-F").textContent = "Wn = " + wn.toFixed(3);


  




}
function calcularResultado5() {
  const input1 = document.getElementById("inputL").value;
  const input2 = document.getElementById("inputU").value;
  const input3 = document.getElementById("inputK").value;
  const input4 = document.getElementById("inputN").value;
  const inputM = document.getElementById("inputM").value;

  const input5 = document.getElementById("input10").value;
  const input6 = document.getElementById("input11").value;
  const input7 = document.getElementById("input12").value;
  const input8 = document.getElementById("input13").value;
  const input9 = document.getElementById("input14").value;

  //Valores
  const lambda = Number(input1);
  const mu = Number(input2);
  const k = Number(input3);
  const n = Number(input4);
  const poblacion = Number(inputM);

  //Costos
  const horas = Number(input5);
  const costoEsperaCola = Number(input6);
  const costoSistema = Number(input7);
  const costoServicio = Number(input8);
  const costoServidor = Number(input9);

  const pe = 1 - calcularPEF(k, lambda, mu, poblacion);

  //Calcular CTTE
  const lq = calcularLqF(k, lambda, mu, poblacion);
  const l = calcularLF(k, lambda, mu, poblacion);
  const wq = lq / ((poblacion - l) * lambda);

  const ctte = lambda * horas * wq * costoEsperaCola;
  document.getElementById("CTTE2").textContent = "CTTE = " + ctte.toFixed(3);

  //Calcular CTTS
  
  const tiempoSistema = lq + (1/mu);

  const ctts = lambda * horas * tiempoSistema * costoSistema;
  document.getElementById("CTTS2").textContent = "CTTS = " + ctts.toFixed(3);

  //Calcularr CTTSer
  const tiempo = 1/mu;
  const cttserv = lambda * horas * tiempo * costoServicio;
  document.getElementById("CTTSer2").textContent = "CTTSer = " + cttserv.toFixed(3);

  //Calcular CTS
  const cts = k * costoServidor * horas;
  document.getElementById("CTS2").textContent = "CTS = " + cts.toFixed(3);

  //Calcular CT
  const ct = ctte + ctts + cttserv + cts;
  document.getElementById("CT2").textContent = "CT = " + ct.toFixed(3);
}
/************************************************************************ */
//*************************************************************************Funciones PFCM************************************************************** */
function calcularLqF(k, lambda, mu, poblacion) {
  let sumatoria =0;

  for (let i = k; i <= poblacion; i++) {
    sumatoria += (i - k) * calcularPnF2(lambda, mu, k, i, poblacion);
  }
  return sumatoria;
}

function calcularLF(k, lambda, mu, poblacion) {
  let sumatoria1 =0;
  let sumatoria2 =0;
  let sumatoria3 =0;
  let n = k-1;
  let producto=0;
  let total2=0;

  for (let i = 0; i <= n; i++) {
    producto = i * calcularPnF(lambda, mu, i, poblacion, k);
    sumatoria1 += producto;
  }
  console.log(sumatoria1)
  for (let i = k; i <= poblacion; i++) {
      producto = (i - k) * calcularPnF2(lambda, mu, k, i, poblacion);
      sumatoria2 += producto;
  }
  console.log(sumatoria2)

  for (let i = 0; i <= n; i++) {
    sumatoria3 += calcularPnF(lambda, mu, i, poblacion, k);
  }
  total2 = sumatoria1 + sumatoria2 + k * (1 - sumatoria3);

  return total2;
}

function calcularPEF(k , lambda, mu, poblacion) {
  console.log("entro PE");
  let sumatoria = 0;
  for (let i = 0; i <= (k-1); i++) {
    if(i < k){
      sumatoria += calcularPnF(lambda, mu, i, poblacion, k);
    }else{

      sumatoria += calcularPnF2(lambda, mu, k, i,poblacion);
    }
  }
  console.log(sumatoria);
  return sumatoria;
}

function calcularPnF(l,mu,n,poblacion,k){
  let p0 = calcularP0F(l, mu, k, poblacion);
  let part2 = factorial(poblacion) / (factorial(poblacion - n) * factorial(n));
  let pn = p0 * part2 * exponenciacion(l, mu, n);
  return pn;
}

function calcularPnF2(l, m, k, n, poblacion) {
  let p0 = calcularP0F(l, m, k, poblacion);
  let part2 = factorial(poblacion) / ((factorial(poblacion - n)) * factorial(k) * exponenciacionSinFraccion(k, n - k));
  let pn = p0 * part2 * exponenciacion(l, m, n);
  return pn;
}


function calcularP0F(l, m, k, poblacion) {
  let n = k - 1;
  let mFactorial = factorial(poblacion);
  console.log(mFactorial)
  let fraccion1 = 0;
  let part1 = 0;
  let total1=0;


  //parte dos

  let total2 = 0;



  for(let i = 0; i <= n; i++){
    fraccion1 = mFactorial / (factorial(poblacion - i) * factorial(i));

    part1 = fraccion1 * exponenciacion(l, m, i);
    total1 += part1;
  }
  console.log(total1);

  for (let i = k; i <= poblacion; i++) {
    fraccion1 = mFactorial / ( factorial(poblacion - i) * factorial(k) * exponenciacionSinFraccion(k,i-k));
    part1 = fraccion1 * exponenciacion(l, m, i);
    total2 += part1;
  }
  console.log(total2);

  return  1/(total1 + total2) ;



}

//*************************************************************************Funciones PICM************************************************************** */
function calcularPk(l, m, k, p) {
  let nume = 0;
  let denominador = 0;
  let fraccionUno = 0;
  let fraccionDos = 0;

  let lambda = l;
  let mu = m;
  let numeroServidores = k;

  //primera parte de la formula
  fraccionUno = 1 / factorial(numeroServidores);
  fraccionDos = exponenciacion(lambda, mu, numeroServidores);
  fraccionDos = fraccionDos.toFixed(3);
  //segunda parte de la formula
  nume = m * k;
  denominador = k * m - l;

  return fraccionUno * fraccionDos * ((nume * p) / denominador);
}

function calcular_P0(l, m, k) {
  // l -> lambda  m -> mu  k -> numero de servidores
  let n = k - 1;
  let total = 0;
  let fraccionUno = 0;
  let fraccionDos = 0;
  let sumatoria = 0;
  let denominadorUno = 0;
  let denominadorDos = 0;

  for (let i = 0; i <= n; i++) {
    fraccionUno = 1 / factorial(i);
    fraccionDos = exponenciacion(l, m, i);
    sumatoria = fraccionUno * fraccionDos;
    total = total + sumatoria;
  }

  denominadorUno = total;

  //segunda parte de la formula

  fraccionUno = 1 / factorial(k);
  fraccionDos = exponenciacion(l, m, k);
  denominadorDos = (fraccionUno * fraccionDos * (k * m)) / (k * m - l);

  return 1 / (denominadorUno + denominadorDos);
}

//calcular Pn cuando n < k
function calcularPn(l, m, k, n) {
  let po = calcular_P0(l, m, k);
  po = po.toFixed(3);
  const denominador1 = factorial(n);
  const fraccion1 = po / denominador1;
  const fraccion2 = exponenciacion(l, m, n);
  const resultado = fraccion1 * fraccion2;

  return resultado;
}

//calcular Pn cuando n >= k
function calcularPn2(l, m, k, n) {
    const po = calcular_P0(l, m, k);
    const factorialK = factorial(k);

    const expo = n - k;
    const exponenciacionK = exponenciacionSinFraccion(k, expo);

    const fraccion1 = 1/(factorialK*exponenciacionK);

    const fraccion2 = exponenciacion(l,m,n);

    const resultado = po*fraccion1*fraccion2;
    
    return resultado;
}
//Numero esperado de clientes en el sistema
function calcularL(l, m, k, p) {

    const numerador = l*m*exponenciacion(l,m,k);
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = p*numerador/denominador + l/m;


    return resultado;
}
//Numero esperado de clientes en la cola
function calcularLq(l,m,k,p){

    const numerador = l*m*exponenciacion(l,m,k);
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = p*numerador/denominador;

    return resultado;
}
//Tiempo esperado de un cliente en el sistema
function calcularW(l,m,k,p){
    const numerador = m*exponenciacion(l,m,k)*p;
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = numerador/denominador + 1/m;
    return resultado;
}
//Tiempo esperado de un cliente en la cola
function calcularWq(l,m,k,p){
    const numerador = m*exponenciacion(l,m,k)*p;
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = numerador/denominador;
    return resultado;
}



//************************************************************************Funciones Complementarias ******************************************************//

function factorial(a) {
  if (a == 0) {
    return 1;
  } else {
    return a * factorial(a - 1);
  }
}
function exponenciacion(a, b, c) {
  let numerador = a;
  let denominador = b;

  if (c == 0) {
    return 1;
  }else{

    for (let i = 1; i < c; i++) {
      numerador *= a;
      denominador *= b;
    }
    return numerador / denominador;
  }

}
function exponenciacionSinFraccion(a,b){
    let resultado = a;
    if(b == 0){
        return 1;
    }
    for(let i = 1; i < b; i++){
        resultado *= a;
    }
    return resultado;
}
//******************************************************************************************************************************************************* */




// Asignar event listeners a los botones
btn1.addEventListener("click", mostrarContenido1);
btn2.addEventListener("click", mostrarContenido2);
btn3.addEventListener("click", mostrarContenido3);
