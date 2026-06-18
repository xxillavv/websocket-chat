import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  messages: Chat[] = [
    {
      name: 'vlad',
      text: 'hello'
    },
    {
      name: 'vlad',
      text: 'hello'
    },
    {
      name: 'vlad',
      text: 'hello'
    }
  ]

  clientToUser = {}

  create(createChatDto: CreateChatDto) {
    const message = { ...createChatDto }
    this.messages.push(message);

    return message
  }

  findAll() {
    return this.messages
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId]
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name

    return Object.values(this.clientToUser)
  }

  typing() {

  }
}
