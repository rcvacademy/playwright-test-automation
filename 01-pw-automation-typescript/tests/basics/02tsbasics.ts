let y: number = 10; //compile time
console.log(typeof(y));
y = 20;
console.log(typeof(y));
console.log(y);
let a: string = 'RCV';
console.log(a);
a = 'Academy';
console.log(a);

let isValid: boolean = true;

let country: null = null;
let city: undefined = undefined;

//any
let c: any = "RCV";
console.log(c);
c = 20;
console.log(c);
c = true;
console.log(c);

let arr1: number[] = [1, 2, 4, 5];
let arr2: Array<string> = ["apple", "mango"];
console.log(arr1[3]);
console.log(arr2[1]);

let arr_2: number[] = [1, 3, 4, 5];
let arr_3: Array<number> = [6,7,8,7];
console.log(arr_2[3]);

function add1(x: number, y: number): number{
    return(x+y);
}
console.log(add1(5,6));

//object

type Person = {
    name: string;
    address: string;
    code: number;
};

let person1: Person = {
    name: "RCV Academy",
    address: "test",
    code: 20
}
console.log(person1.name);

//class
class Addition1 {
    x: number;
    y: number;
    constructor(x:number, y: number){
        this.x = x;
        this.y = y;
    }
    add(): number{
        return this.x + this.y;
    }
}

let sum2 = new Addition1(10,20);
console.log(sum2.add());



















