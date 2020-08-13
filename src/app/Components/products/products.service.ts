import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Product } from './product.model';

const BACKEND_URL = environment.apiUrl + '/product/';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{
    products: Product[];
    productCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((productData) => {
          return {
            products: productData.products.map((product) => {
              return {
                name: product.name,
                description: product.description,
                id: product._id,
                imagePath: product.imagePath,
                genre: product.genre,
                price: product.price,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
              };
            }),
            maxProducts: productData.maxProducts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedPostData.maxProducts,
        });
      });
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      description: string;
      imagePath: string;
      genre: string;
      price: number;
    }>(BACKEND_URL + id);
  }

  addProduct(
    title: string,
    description: string,
    genre: string,
    price: number,
    image: File
  ) {
    const productData = new FormData();
    productData.append('title', title);
    productData.append('description', description);
    productData.append('genre', genre);
    productData.append('price', price.toString());
    productData.append('image', image, title);
    this.http
      .post<{ message: string; post: Product }>(BACKEND_URL, productData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    genre: string,
    price: number,
    image: File | string
  ) {
    let productData: Product | FormData;
    if (typeof image === 'object') {
      productData = new FormData();
      productData.append('id', id);
      productData.append('title', title);
      productData.append('description', description);
      productData.append('genre', genre);
      productData.append('price', price.toString());
      productData.append('image', image, title);
    }
    else {
      productData = {
        id: id,
        title: title,
        description: description,
        genre: genre,
        price: price,
        imagePath: image,
      }
    }

    console.log(productData);

    this.http.put(BACKEND_URL + id, productData).subscribe((response) => {
      this.router.navigate(["/"]);
    });
  }

  // deletePost(postId: string) {
  //   return this.http.delete(BACKEND_URL + postId);
  // }
}
