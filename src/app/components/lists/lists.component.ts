import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { List } from '../../models/list.model';
import { WishesService } from '../../services/wishes.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList, {static: false}) ionLista: IonList;
  @Input() completed: true;

  constructor(public wishesService: WishesService,
              public router: Router,
              private alertController: AlertController) { }

  ngOnInit() { }

  selectedList(list: List) {

    if (this.completed) {

      this.router.navigateByUrl(`/tabs/tab1/addList/${list.id}`);

    } else {

      this.router.navigateByUrl(`/tabs/tab2/addList/${list.id}`);

    }
  }

  removeItem(list: List) {
    this.wishesService.removeList(list);
  }

  async editList(list: List) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: list.title
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            list.title = data.titulo;
            this.wishesService.saveStorage();
            this.ionLista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
