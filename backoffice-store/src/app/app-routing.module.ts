import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './entities/category/category-list/category-list.component';
import { ItemListComponent } from './entities/item/item-list/item-list.component';
import { ItemFormComponent } from './entities/item/item-form/item-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemFavoriteComponent } from './entities/item/item-favorite/item-favorite.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'categories', component: CategoryListComponent},
  { path: 'items', component: ItemListComponent},
  { path: 'categories/:categoryId/items', component: ItemListComponent},
  { path: 'items/:itemId', component: ItemFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'listfavorites', component: ItemFavoriteComponent},
  { path: 'cart', component: CartComponent},
  { path: 'order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
