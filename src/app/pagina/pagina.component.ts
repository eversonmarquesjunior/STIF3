import { Component, OnInit, Input } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ModalController} from '@ionic/angular';
import {NavController, NavParams} from '@ionic/angular';
@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {
@Input() remetente : string;
@Input() mensagem : string;
@Input() key : any;
  constructor(private modal : ModalController, private navParams : NavParams, private fire : AngularFireDatabase) { }

  ngOnInit() {}

  fechar(){
    this.fire.list('Mensagem').remove(this.key);
    this.modal.dismiss();
  }
}
