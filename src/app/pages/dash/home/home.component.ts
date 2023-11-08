import { Component } from '@angular/core';
import type { ICharacterCard } from './interface/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /**
   *searchCharacters
   *
   * Realiza uma busca por personagens com base nos filtros.
   */
  searchCharacters() {
    //
  }

  characters: ICharacterCard[] = [
    {
      name: 'Homem de Ferro',
      description:
        'Homem de Ferro é um personagem dos quadrinhos publicados pela Marvel Comics. Sua verdadeira identidade é o empresário e bilionário Tony Stark teste teste',
      thumb: './../../assets/images/characters/iron-man.png',
    },
    {
      name: 'Hulk',
      description:
        'Hulk, por vezes referido como O Incrível Hulk, é um personagem de quadrinhos/banda desenhada do gênero super-herói, propriedade da Marvel Comics, ...',
      thumb: './../../assets/images/characters/hulk.png',
    },
    {
      name: 'Homem-aranha',
      description:
        'O Homem-Aranha, o alter ego de Peter Parker, é um super-herói que aparece nas revistas em quadrinhos publicadas pela Marvel Comics. Criado pelo escritor...',
      thumb: './../../assets/images/characters/spider-man.png',
    },
    {
      name: 'Viúva Negra',
      description:
        'A Viúva Negra, alter-ego de Natasha Romanoff, é uma personagem das histórias em quadrinhos do Universo Marvel publicado pela Marvel Comics. ...',
      thumb: './../../assets/images/characters/black-widow.png',
    },
    {
      name: 'Deadpool',
      description:
        'Deadpool é um personagem fictício do universo Marvel, que atua geralmente como anti-herói e ocasionalmente como vilão.',
      thumb: './../../assets/images/characters/deadpool.png',
    },
    {
      name: 'Thanos',
      description:
        'Thanos é um supervilão fictício das histórias em quadrinhos publicadas pela editora norte-americana Marvel Comics inspirado em Thanatos. Com ...',
      thumb: './../../assets/images/characters/thanos.png',
    },
  ];
}
