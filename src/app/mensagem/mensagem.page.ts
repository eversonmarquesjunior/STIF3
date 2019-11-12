import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Aviso } from '../aviso/aviso';
import { map } from 'rxjs/operators'

import { Router, NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {


 listaDiario: Observable<Aviso[]>;
 constructor(private fire: AngularFireDatabase, private rota : Router) {
   this.listaDiario = this.fire.list<Aviso>('aviso').snapshotChanges().pipe(
     map(lista => lista.map(linha => ({
       key: linha.payload.key, ...linha.payload.val()
     })))
   );

 }
 ngOnInit() {
 }

}
