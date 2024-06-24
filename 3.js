function bubbleSort(input,n){
    if(n==input.length){
    return input;
    }
    for (let i = 0; i < input.length; i++) {
      if (input[i] > input[i + 1]) {
        let newvar = input[i];
        input[i] = input[i + 1];
        input[i + 1] = newvar;
      }
    }
    console.log(input);
    return bubbleSort(input,n+1);
    
}

function sortArray(arr) {

    let sortedArray = bubbleSort(arr,0);

    let genap = [];
    let ganjil = [];

    sortedArray.forEach(num => {
        if (num % 2 === 0) {
            genap.push(num);
        } else {
            ganjil.push(num);
        }
    });

    console.log(
        "Array :",`${sortedArray}\n`,"Ganjil :",`${ganjil}\n`,"Genap :",`${genap}\n`);
}


let arr = [2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11];
console.log(sortArray(arr));
