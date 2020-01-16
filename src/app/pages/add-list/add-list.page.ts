import { Component, OnInit } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {

  list: List;
  itemName: string;

  constructor(private wishesService: WishesService,
    private activatedRoute: ActivatedRoute) {

    const listId = this.activatedRoute.snapshot.paramMap.get('listId');

    this.list = this.wishesService.getList(listId);

  }

  ngOnInit() {
  }

  addItem() {

    if (this.itemName.length === 0) {
      return;
    }

    const newItem = new ListItem(this.itemName);

    this.list.items.push(newItem);

    this.itemName = '';

    this.wishesService.saveStorage();
  }

  toggleCheckbox(item: ListItem) {

    const pendings = this.list.items
      .filter(data => !data.completed);

    if (pendings.length === 0) {
      this.list.done = true;
      this.list.doneAt = new Date();
    } else {
      this.list.done = false;
      this.list.doneAt = null;
    }

    this.wishesService.saveStorage();
  }

  removeItem(index: number) {

    this.list.items.splice(index, 1);
    this.wishesService.saveStorage();
  }


}
