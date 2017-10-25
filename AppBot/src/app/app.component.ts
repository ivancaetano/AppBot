import { Component ,ViewChild,ElementRef,DoCheck } from '@angular/core';
import ConversationV1 from 'watson-developer-cloud/conversation/v1';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  DoCheck{
  ngDoCheck() {
    this.scroll();
    
    
}

public conversation = new ConversationV1({
  username: '7c1e36d7-8e19-4091-a78b-a6dcf869ca24',
  password: 'CrV5jyjLB83U',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

  public mensagens: Array<Entrada> = [];
  public dialogos: Array<DialogWatson> = [];
  public txMensagem: string;
  @ViewChild('chat') private chat: ElementRef;
  msgUsuario() {
    if (this.txMensagem.length > 0) {
        let entrada = new Entrada(true, this.txMensagem);

        this.mensagens.push(entrada);

        let that = this;
        this.conversation.message({
          input: { text: this.txMensagem },
          workspace_id: '7502e9b9-fcbf-4210-b6cf-6bd3492b6d2b'
         }, function(err, response) {
             if (err) {
               console.error(err);
             } else {
              let dialogo=response as DialogWatson;
              that.mensagens.push(new Entrada(false,dialogo.output.text[0])) ;
              that.dialogos.push(dialogo) ;
             }
        });
        


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
class  Intent {
  intent: string;
  confidence: number;
}

class Entity {
  entity: string;
  location: number[];
  value: string;
  confidence: number;
}

class Input {
  text: string;
}

class Output {
  text: string[];
  nodes_visited: string[];
  log_messages: any[];
}

class DialogStack {
  dialog_node: string;
}

class NodeOutputMap {
  node_1_1508153946939: number[];
}

class System {
  dialog_stack: DialogStack[];
  dialog_turn_counter: number;
  dialog_request_counter: number;
  _node_output_map: NodeOutputMap;
  branch_exited: boolean;
  branch_exited_reason: string;
}

class Context {
  conversation_id: string;
  system: System;
}

class DialogWatson {
  intents: Intent[];
  entities: Entity[];
  input: Input;
  output: Output;
  context: Context;
}