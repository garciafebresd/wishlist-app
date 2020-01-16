import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  lists: List[] = [];


  constructor() {

    this.loadStorage();

  }

  getList(listId: string | number) {
    const id = Number(listId);

    return this.lists.find(dataList => dataList.id === id);
  }


  createList(title: string) {

    const newList = new List(title);

    this.lists.push(newList);
    this.saveStorage();

    return newList.id;
  }

  removeList(list: List) {

    this.lists = this.lists.filter( data => data.id !== list.id);
    this.saveStorage();
  }

  saveStorage() {

    localStorage.setItem('data', JSON.stringify(this.lists));

  }

  loadStorage() {

    if (localStorage.getItem('data')) {

      this.lists = JSON.parse(localStorage.getItem('data'));

    } else {

      this.lists = [];

    }

  }

}
