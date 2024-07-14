import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductsService} from "../products.service";
import {ProductsAPIActions, ProductsPageActions} from "./products.actions";
import {catchError, concatMap, exhaustMap, map, mergeMap, of} from "rxjs";

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private productsService: ProductsService) {
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() => this.productsService.getAll().pipe(
        map((products) => ProductsAPIActions.productsLoadedSuccess({products})),
        catchError((err) => of(ProductsAPIActions.productsLoadedFail({message: err})))
      ))
    )
  )

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({product}) => this.productsService.add(product).pipe(
        map((newProduct) => ProductsAPIActions.productAddedSuccess({product: newProduct})),
        catchError((err) => of(ProductsAPIActions.productAddedFail({message: err})))
      ))
    )
  )

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({product}) => this.productsService.update(product).pipe(
        map((updatedProduct) => ProductsAPIActions.productUpdatedSuccess({product: updatedProduct})),
        catchError((err) => of(ProductsAPIActions.productUpdatedFail({message: err})))
      ))
    )
  )

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({id}) => this.productsService.delete(id).pipe(
        map(() => ProductsAPIActions.productDeletedSuccess({id})),
        catchError((err) => of(ProductsAPIActions.productDeletedFail({message: err})))
      ))
    )
  )
}
