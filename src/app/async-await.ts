import {colores} from './datas';
import * as _ from 'lodash';
import { AsercionNoNula } from './asercion-no-nulo';

//  Notar esta forma de definir una interfaz,
interface Foo1 {
  readonly[x: number]: number;
}
const foo: Foo1 = { 0: 123, 2: 345 };
// console.log('--> ', foo);


interface Foo2 {
  bar: number;
  bas: string;
}
//#region Type guard personalizados para probar obj de tipo interfaz,
// si los datos a probar fueran primitivos o instancias de clase se usaria typeof o instanceOf
// pero cuando se trata de interfaces no se pueden instanciar objetos
interface Foo {
  foo: number;
  common: string;
}

interface Bar {
  bar: number;
  common: string;
}
function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined;
}
//#endregion


export class AsyncAwait {
  colores = colores.slice();

  // ASERCION DE TIPOS CON AS EN LUGAR DE USA <ALGO>
  constructor() {
    const foo = {} as Foo2;
    foo.bar = 123;
    foo.bas = 'carlos';
    console.log('el tipo personalizado es ', isFoo({ bar: 123, common: '123' }));

    new AsercionNoNula();

  }

  //#region trabajando con ASYNC AWAIT
  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
      setTimeout(() => {
        resolve(count);
      }, milliseconds);
    });
  }

  // async function always returns a Promise
  async dramaticWelcome(): Promise<void> {
    console.log('Hello');

    for (let i = 0; i < 5; i++) {
      // await is converting Promise<number> into number
      const count: number = await this.delay(1000, i);
      console.log(count);
    }
    console.log('World!');
  }
  //#endregion


  sortForColor() {
    return _.chain(this.colores)
    .tap(values => {
      console.log(' los valores son en crudo ', values);
      return values;
    })
    .groupBy('color')
    .tap(values => {
      console.log('  agrupados por color ', values);
      return values;
    })
    .toPairs()
    .tap(values => {
      console.log(' toPairs ', values);
      return [values];
    })
    .map(pair => _.zipObject(['color', 'users'], pair))
    .tap(values => {
      console.log(' toPairs ', values);
      return values;
    })
    .value();
  }



}
