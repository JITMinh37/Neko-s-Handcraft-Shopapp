import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'item/:id', component: ItemDetailsComponent },
    { path: 'order', component: OrderComponent },
    { path: 'order-confirm', component: OrderConfirmComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}