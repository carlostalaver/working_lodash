import { Component } from '@angular/core';
import { clients, banks, accounts, Client } from './datas';
import * as _ from 'lodash';
import { Dictionary } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'es6';
  clients = clients.slice();
  accounts = accounts.slice();


  constructor() {
    const ordenado = _.orderBy(this.accounts, ['clientId', 'bankId'], ['asc', 'asc']);
    console.log(this.sortClientsForBanck());
  }

  listClientsIds() {
    return clients.map((client) => client.id);
  }

  // 1 Arreglo con los ids de clientes ordenados por rut
  listClientsIdsSortByTaxNumber(): Client[] {

    return _.orderBy(this.clients, ['taxNumber'], ['asc']);
  }

  sortClientsForBanck() {
    const clienteBanco = [];

    const clientForAccount = this.groupClient();
    _.forEach(clientForAccount, (value, key) => {
      let a = 0, b = 0, c = 0;
      const bancos = [];

      _.forEach(value, (cuenta, keyCuenta) => {
        switch (cuenta.bankId) {
          case 1:
            a += cuenta.balance;
            break;
          case 2:
            b += cuenta.balance;
            break;
          default:
            c += cuenta.balance;
            break;
        }
      });

      if (a) {
        bancos.push({ 'bankId': 1, 'total': a });
      }
      if (b) {
        bancos.push({ 'bankId': 2, 'total': b });
      }
      if (c) {
        bancos.push({ 'bankId': 3, 'total': c });
      }
       clienteBanco.push({ 'clientId': key, 'bancos': bancos });
    });

    return clienteBanco;
  }

  groupClient(): _.Dictionary<any[]> {
    return _.groupBy(this.accounts, (account) => {
      return account.clientId;
    });
  }

  // 2 Arreglo con los nombres de cliente ordenados
  // de mayor a menor por la suma TOTAL de los saldos
  // de cada cliente en los bancos que participa.
  sortSaldosForBank() {
    return _.orderBy(this.accounts, ['balance'], ['desc'] );
  }


}
