
let a: number[]; // No assertion
let b!: number[]; // Assert

 initialize();

a.push(4); // TS ERROR: variable used before assignment
b.push(4); // OKAY: because of the assertion

function initialize() {
  a = [0, 1, 2, 3];
  b = [0, 1, 2, 3];
}

export class AsercionNoNula {
  foo!: number;
  // ^
  // Notice this exclamation point!
  // This is the "definite assignment assertion" modifier.

  constructor() {
    console.log('llamada desde la clase de asercion no nula');

    this.initialize();
  }
  initialize() {
    this.foo = 0;
  }
}
