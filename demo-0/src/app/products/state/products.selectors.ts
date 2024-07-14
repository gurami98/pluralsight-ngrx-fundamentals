import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductsState} from "./products.reducer";
import {sumProducts} from "../../utils/sum-products";

export const selectProductsSate = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsSate,
  (productsState) => productsState.products
)

export const selectProductsLoading = createSelector(
  selectProductsSate,
  (productsState) => productsState.loading
)

export const selectProductsError = createSelector(
  selectProductsSate,
  (productsState) => productsState.errorMessage
)

export const selectProductsShowProductCode = createSelector(
  selectProductsSate,
  (productsState) => productsState.showProductCode
)

export const selectProductsTotal = createSelector(
  selectProducts,
  (products) => sumProducts(products)
)
