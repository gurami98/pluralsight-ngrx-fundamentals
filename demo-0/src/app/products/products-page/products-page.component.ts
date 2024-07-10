import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import {Store} from "@ngrx/store";
import {ProductsAPIActions, ProductsPageActions} from "../state/products.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$: Observable<Product[]> = this.store.select((state: any) => state.products.products);
  total = 0;
  loading$ = this.store.select((state: any) => state.products.loading);
  showProductCode$ = this.store.select((state: any) => state.products.showProductCode);
  errorMessage = '';

  constructor(private productsService: ProductsService, private store: Store) {
    this.store.subscribe(store => console.log(store))
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts())
    this.productsService.getAll().subscribe({
      next: (products) => {
        // this.products = products;
        this.store.dispatch(ProductsAPIActions.productsLoadedSuccess({products}))
        this.total = sumProducts(products);
        // this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode())
  }
}
