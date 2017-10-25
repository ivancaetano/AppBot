import { Component ,ViewChild,ElementRef,DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  DoCheck{
  ngDoCheck() {
    this.scroll();
    
    
}


  public title = 'Hello World';
  public mensagens: Array<Entrada> = [];
  public txMensagem: string;
  @ViewChild('chat') private chat: ElementRef;
  msgUsuario() {
    if (this.txMensagem.length > 0) {
        let entrada = new Entrada(true, this.txMensagem);

        this.mensagens.push(entrada);
       



    }
    this.txMensagem = "";
};

scroll(): void {
  try {

      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight - 20;
  } catch (err) { }
}

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