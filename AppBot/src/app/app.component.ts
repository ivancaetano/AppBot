import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Hello World';
  public mensagens: Array<Entrada> = [];
  public txMensagem: string;
  msgUsuario() {
    if (this.txMensagem.length > 0) {
        let entrada = new Entrada(true, this.txMensagem);

        this.mensagens.push(entrada);
       



    }
    this.txMensagem = "";
};



}
class Entrada {
  user: Boolean;
  texto: string;
  intent: string;
  entity: string;
 
  constructor(user: Boolean, texto: string) {
      this.user = user;
      this.texto = texto;
  }

}