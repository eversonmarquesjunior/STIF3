import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PaginaComponent} from './pagina/pagina.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'destino', loadChildren: './destino/destino.module#DestinoPageModule' },
  { path: 'mensagem', loadChildren: './mensagem/mensagem.module#MensagemPageModule' },
  { path: 'pagina', component : PaginaComponent },
  { path : 'solicitacao', component : SolicitacaoComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
