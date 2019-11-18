import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import {Adm} from '../adm/adm';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss'],
})
export class SolicitacaoComponent implements OnInit {
  @Input() remetente : string;
  @Input() mensagem : string;
  @Input() key : any;
  @Input() pai : string;
  @Input() filho : string;
  @Input() doc : string;
  @Input() curso : string;
  @Input() ano : string;
  @Input() grau : string;
  adm:Adm=new Adm()

  constructor(private banco : AngularFireDatabase, private modal : ModalController, private fire : AngularFireDatabase, private navparms : NavParams, private navctrl : NavController, private auth:AngularFireAuth) { }

  fechar(){

    this.adm.curso = this.curso;
    this.adm.pai = this.pai;
    this.adm.grau = this.grau;
    this.adm.ano = this.ano;
    this.adm.doc = this.doc;
    this.fire.list('RespostaSolicit').push(this.adm);
    this.banco.list("Mensagem").remove(this.key)
    this.modal.dismiss();
  }
  ngOnInit() {}

}
