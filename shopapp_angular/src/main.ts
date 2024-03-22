import { HomeComponent } from './app/components/home/home.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ItemsComponent } from './app/components/items/items.component';
import { ItemDetailsComponent } from './app/components/item-details/item-details.component';
import { OrderComponent } from './app/components/order/order.component';
import { OrderConfirmComponent } from './app/components/order-confirm/order-confirm.component';
import { AppComponent } from './app/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
