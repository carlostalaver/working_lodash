import { Component } from '@angular/core';
import { clients, banks, accounts, Client, AccountBank } from './datas';
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
  banks = banks.slice();

  constructor() {
    console.log(this.sortSaldosForBank());
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
   let clientForBank = [];
    _.forEach(this.banks, (bank) => {
     clientForBank.push(this.getClientesPorBanco(this.accountReducer(), bank.id));
    });

    return clientForBank;
  }

  getClientesPorBanco(cuentas: AccountBank[], idBanco: number): AccountBank[] {
    const clientList = _.filter(cuentas, (cuenta) => {
      return (cuenta.bankId === idBanco);
    });
    const saldos =  _.orderBy(clientList, ['total'], ['desc']);
    _.forEach(saldos,  (cuenta) => {
       const findCliente = _.find(this.clients, (client ) => {
          return (cuenta.clientId === client.id);
        });
        cuenta.nameCliente = findCliente.name;
    });
    return saldos;
  }

  accountReducer() {
    return _.reduce(this.accounts, function(result, value, key) {
        const cliente = value.clientId;
        const banco =  value.bankId;
        const rs: AccountBank[] = result;
        let elementMatch: AccountBank = null;

         if (result && result.length > 0) {
             elementMatch = _.find(rs, (o) => {
               return (o['clientId'] === cliente && o['bankId'] === banco);
           });
         }

        if (!elementMatch) {
           const add ={};
           add['clientId'] = value.clientId;
           add['bankId'] = value.bankId;
           add['total'] = value.balance;
           result.push(add);
        } else {
          elementMatch['total'] += value.balance;
        }
       return result;
     }, []);
   }

}
