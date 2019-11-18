import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { Adm } from '../adm/adm';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToastController} from '@ionic/angular';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  adm : Adm = new Adm();
  constructor(private banco : AngularFireDatabase, private router : Router, private autenticacao : AngularFireAuth, private mensagem : ToastController) { }

  ngOnInit() {
  }
  async mostrarMensagem(){
    const message = await this.mensagem.create({
      message : 'Ocorreu um erro, tente novamente',
      duration : 2000,
      buttons: ['Ok']
    });
    await message.present()
  }
  salvar(){
    this.autenticacao.auth.createUserWithEmailAndPassword(this.adm.email, this.adm.senha).then(
      () => {this.router.navigate(['home'])}).catch((erro) => this.mostrarMensagem());
    this.banco.list("Responsavel").push(this.adm);
    this.adm = new Adm();
    this.router.navigate(['cadastro']);
  }
}
