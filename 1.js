function primaNumber(a) { 
    if (a == 1) return false;
    if (a <= 3) return true;
    if ( a == 5) return true;
    if (a % 2 === 0 || a % 3 === 0 || a % 5 ===0 ) return false;
    for (let i = 6; i * i <= a; i ++ ) {
        if (a % i === 0 ) return false;
    }
    return true;
}

function arrayPrima(totalprima) {
    const prima = [];
    let num = 1; 
    for (let i = 0; i <= totalprima; num++) { 
        if (primaNumber(num)) {
            prima.push(num); 
            i++;
            console.log(prima)
        }
    }
    return prima;
}

function drawSikuSiku (a) {
    if (a < 0 || a > 10){
        console.log("nilai harus diantara lebih dari 0 dan kurang dari 10");
    }else{
    const totalPrima = a*(a+1)/2;
    const primes = arrayPrima(totalPrima);
    let index = 0;
    let array = ""
    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= i; j++) {
            array += primes[index] + " ";
            index++
        }
       array += "\n"
    }
    console.log(array);}
}

drawSikuSiku(4)