let x = 20;
console.log(typeof(x));
x = "five";
console.log(typeof(x));
console.log(x);

let arr = [1, 3, "apple", true];
console.log(arr[3]);

function add(a,b){
    return(a+b);
}

console.log(add(3,4));

//object
let person = {
    name: "RCV",
    address: "test",
    code: 10
};

console.log(person.name);


//Class

class Addition {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(){
        return this.x + this.y;
    }
}

let sum1 = new Addition(8,9);
console.log(sum1.add());









