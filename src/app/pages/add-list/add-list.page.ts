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


}
