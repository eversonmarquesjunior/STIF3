import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Aviso } from '../aviso/aviso';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import { ModalController, AlertController } from '@ionic/angular';
import { PaginaComponent } from '../pagina/pagina.component';
import { SolicitacaoComponent } from '../solicitacao/solicitacao.component';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {


  listaAvisos: Observable<Aviso[]>;

  variavel_mestre: string;

  constructor(private fire: AngularFireDatabase, private rota: Router, private modal: ModalController, private alert: AlertController, private autenticacao: AngularFireAuth) {
    let email = autenticacao.auth.currentUser.email
    
    this.fire.database.ref('Responsavel').orderByChild('email').equalTo(email).on("value", dadosFire => {

      dadosFire.forEach(data => {
        console.log(data.val().telefone);
        this.variavel_mestre = data.val().telefone
        console.log(this.variavel_mestre)

        this.listaAvisos = this.fire.list<Aviso>('Mensagem', ref => ref.orderByChild('telefone').equalTo(this.variavel_mestre+"")).snapshotChanges().pipe(
          map(lista => lista.map(linha => ({
            key: linha.payload.key, ...
            linha.payload.val()
          }))));

      });
    });
    
   

  }

  excluir(aviso) {
    this.fire.list('Mensagem').remove(aviso.key)
  }
  async expandirMensagem(aviso) {
    if (aviso.tipo == "Aviso") {
      const expand = await this.modal.create({
        component: PaginaComponent, componentProps: {
          'remetente': aviso.adm.nome,
          'mensagem': aviso.mensagem,
          'key': aviso.key,
          'pai': aviso.adm.pai,
          'filho': aviso.adm.filho
        }

      });
      await expand.present();
    } else {
      const expand = await this.modal.create({
        component: SolicitacaoComponent, componentProps: {
          'remetente': aviso.adm.nome,
          'mensagem': aviso.mensagem,
          'key': aviso.key
        }
      });
      await expand.present();
    }

  }
  ngOnInit() {

  }
}
