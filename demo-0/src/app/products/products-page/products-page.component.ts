import { Component } from '@angular/core';
import { Product } from '../product.model';
import {Store} from "@ngrx/store";
import { ProductsPageActions} from "../state/products.actions";
import {Observable} from "rxjs";
import {
  selectProducts, selectProductsError,
  selectProductsLoading,
  selectProductsShowProductCode,
  selectProductsTotal
} from "../state/products.selectors";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$: Observable<Product[]> = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ =  this.store.select(selectProductsError);

  constructor(private store: Store) {
    this.store.subscribe(store => console.log(store))
  }

  ngOnInit() {
    this.store.dispatch(ProductsPageActions.loadProducts())
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode())
  }
}
