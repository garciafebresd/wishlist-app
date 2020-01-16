import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../models/list.model';
import { WishesService } from '../../services/wishes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() completed: true;

  constructor(public wishesService: WishesService,
              public router: Router) { }

  ngOnInit() { }

  selectedList(list: List) {

    if (this.completed) {

      this.router.navigateByUrl(`/tabs/tab1/addList/${list.id}`);

    } else {

      this.router.navigateByUrl(`/tabs/tab2/addList/${list.id}`);

    }
  }

  removeItem(list: List){
    this.wishesService.removeList(list);
  }

}
