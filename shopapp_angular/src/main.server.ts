import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/home/home.component';
import { config } from './app/app.config.server';
import { ItemsComponent } from './app/items/items.component';
import { ItemDetailsComponent } from './app/item-details/item-details.component';
import { OrderComponent } from './app/order/order.component';
import { OrderConfirmComponent } from './app/order-confirm/order-confirm.component';
const bootstrap = () => bootstrapApplication(OrderConfirmComponent, config);

export default bootstrap;
