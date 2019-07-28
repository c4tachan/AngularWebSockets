import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs-compat/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://127.0.0.1:80';

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    ) as Subject<Message>;
  }
}
