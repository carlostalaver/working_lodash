import {colores} from './datas';
import * as _ from 'lodash';

interface Foo {
  bar: number;
  bas: string;
}

export class AsyncAwait {
  colores = colores.slice();

  // ASERCION DE TIPOS CON AS EN LUGAR DE USA <ALGO>
  constructor() {
    const foo = {} as Foo;
    foo.bar = 123;
    foo.bas = 'carlos';
  }


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

  sortForColor() {
  return _.chain(this.colores)
    .tap(values =>{
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
