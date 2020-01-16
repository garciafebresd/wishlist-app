import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list.model';
import { WishesService } from '../../services/wishes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  constructor(public wishesService: WishesService,
              public router: Router) { }

  ngOnInit() { }

  selectedList(list: List) {

    this.router.navigateByUrl(`/tabs/tab1/addList/${list.id}`);

  }

}
