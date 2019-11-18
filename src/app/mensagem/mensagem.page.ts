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
@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {

  //tá meio feio daqui pra baixo, mas eu vou consertar :) -> Rafel

listaAvisos : Observable<Aviso[]>;
avisos : any;
aviso : Aviso = new Aviso();
listaFiltro : Aviso[];
filtro = {}
variavelFiltro : string;


 constructor(private fire: AngularFireDatabase, private rota : Router, private modal : ModalController, private alert : AlertController) {
  //this.filtrarInicio();
  this.listaAvisos = this.fire.list<Aviso>('Mensagem').snapshotChanges().pipe(
    map( lista => lista.map(linha => ({key : linha.payload.key, ... linha.payload.val()}))
  ))
  //this.filtrar(this.variavelFiltro);
 }
 /*async filtrarInicio(){
   const fill = await this.alert.create({
     header : 'Digite o seu Numero de telefone',
     inputs : [{
      placeholder : 'Insira Aqui',
      name : 'valorprompt',


     }],
     buttons : [{
        text : 'Ok',
        handler : (inputs : {valorprompt : string}) => {
          this.variavelFiltro = inputs.valorprompt;
          console.log(this.variavelFiltro);
        }
     }]
   });
   await fill.present();
 }*/
  excluir(aviso){
    this.fire.list('Mensagem').remove(aviso.key)
  }
 async expandirMensagem(aviso){
   if(aviso.tipo == "Aviso"){
  const expand = await this.modal.create({
    component : PaginaComponent, componentProps : {
      'remetente' : aviso.adm.nome,
      'mensagem' : aviso.mensagem,
      'key' : aviso.key,
      'pai' : aviso.adm.pai,
      'filho' : aviso.adm.filho
    }

  });
  await expand.present();
} else{
      const expand = await this.modal.create({
        component : SolicitacaoComponent, componentProps : {
          'remetente' : aviso.adm.nome,
          'mensagem' : aviso.mensagem,
          'key' : aviso.key
        }
      });
      await expand.present();
  }

  }
 ngOnInit() {
  /* this.listaAvisos.subscribe(
     aviso => {
       this.avisos = aviso;
       this.listaFiltro = _.filter(this.aviso, _.conforms(this.filtro));
       this.aplicarFiltro();
     }
   )*/
 }
 /*private aplicarFiltro() {
  this.listaFiltro = _.filter(this.aviso, _.conforms(this.filtro) )
}
*/

/*filtrar(variavelFiltro) {
  this.filtro['aa'] = val => val == variavelFiltro;
  this.aplicarFiltro();
}*/
}
