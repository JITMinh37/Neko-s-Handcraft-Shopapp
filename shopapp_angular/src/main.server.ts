import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/components/home/home.component';
import { config } from './app/app.config.server';
import { ItemsComponent } from './app/components/items/items.component';
import { ItemDetailsComponent } from './app/components/item-details/item-details.component';
import { OrderComponent } from './app/components/order/order.component';
import { OrderConfirmComponent } from './app/components/order-confirm/order-confirm.component';
const bootstrap = () => bootstrapApplication(OrderConfirmComponent, config);

export default bootstrap;
