import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, NavParams, NavController } from '@ionic/angular';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss'],
})
export class SolicitacaoComponent implements OnInit {
  @Input() remetente : string;
  @Input() mensagem : string;
  @Input() key : any;
  constructor(private banco : AngularFireDatabase, private modal : ModalController, private navparms : NavParams, private navctrl : NavController) { }

  fechar(){
    this.banco.list("Mensagem").remove(this.key)
    this.modal.dismiss();
  }
  ngOnInit() {}

}
