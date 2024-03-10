import { HomeComponent } from './app/home/home.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ItemsComponent } from './app/items/items.component';
import { ItemDetailsComponent } from './app/item-details/item-details.component';
import { OrderComponent } from './app/order/order.component';
import { OrderConfirmComponent } from './app/order-confirm/order-confirm.component';
bootstrapApplication(OrderConfirmComponent, appConfig)
  .catch((err) => console.error(err));
