import { Component, OnInit } from '@angular/core';
import type { ICharacterCard } from './interface/home.interface';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private marvelContentApi: MarvelContentApi) {}

  characters: ICharacterCard[] = [];
  pageNumber = 1;

  /**
   * serviceGetCharacters
   *
   * Adiciona personagens ao array 'characters' com base no número da página.
   * A cada página são exibidos 9 novos personagens
   *
   * @param page - Número da página a ser exibida os personagens.
   */
  serviceGetCharacters(page: number): void {
    this.marvelContentApi
      .getContentByCategorie(page)
      .then((response) => {
        this.characters = this.characters.concat(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * ngOnInit
   *
   * Inicializa o componente, chamando o serviço para carregar os personagens da página inicial.
   */
  ngOnInit(): void {
    this.serviceGetCharacters(this.pageNumber);
  }

  /**
   * seeMoreCharacters() {
   *
   * Exibe mais 9 personagens a cada vez que o botão "CONHECER MAIS" é clicado.
   */
  seeMoreCharacters(): void {
    this.pageNumber++;
    this.serviceGetCharacters(this.pageNumber);
  }

  /**
   *searchCharacters
   *
   * Realiza uma busca por personagens com base nos filtros.
   */
  searchCharacters() {
    //
  }
}
