import { Component, OnInit, Input } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ModalController} from '@ionic/angular';
import {NavController, NavParams} from '@ionic/angular';
import {Adm} from '../adm/adm';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {
@Input() remetente : string;
@Input() mensagem : string;
@Input() key : any;
@Input() pai : string;
@Input() filho : string;
adm:Adm=new Adm()

  constructor(private modal : ModalController, private navParams : NavParams, private fire : AngularFireDatabase, private auth:AngularFireAuth) { }

  ngOnInit() {}

  fechar(){
    let nome = this.auth.auth.currentUser.email
    let resposta = "estou ciente"

  this.adm.resposta=resposta
  this.adm.nome=nome
  this.adm.filho = this.filho;
  this.adm.pai = this.pai;
    this.fire.list('Resposta').push(this.adm);
    this.fire.list('Mensagem').remove(this.key)

    this.modal.dismiss();



  }
}
