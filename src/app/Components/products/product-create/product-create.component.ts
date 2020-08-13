import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  Genre: any = ['Vegetables', 'Fruits', 'Juice', 'Dried'];
  public mode = 'create';
  private productId: string;
  private authStatusSub: Subscription;

  constructor(
    public productsService: ProductsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      price: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      genre: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = "edit";
        this.productId = paramMap.get("productId");
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id: productData._id,
            title: productData.name,
            description: productData.description,
            imagePath: productData.imagePath,
            price: productData.price,
            genre: productData.genre
          };

          this.form.setValue({
            title: this.product.title,
            description: this.product.description,
            image: this.product.imagePath,
            genre: this.product.genre,
            price: this.product.price
          });
          this.imagePreview = this.product.imagePath;
          //console.log("img ", this.product.imagePath);
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

  // Choose city using select dropdown
  changeGenre(e) {
    this.form.value.genre.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      ///console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    console.log('invalid ', this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log('mode ', this.mode);
    if (this.mode === 'create') {
      this.productsService.addProduct(
        this.form.value.title,
        this.form.value.description,
        this.form.value.genre,
        this.form.value.price,
        this.form.value.image
      );
      } else {
        this.productsService.updateProduct(
          this.productId,
          this.form.value.title,
          this.form.value.description,
          this.form.value.genre,
          this.form.value.price,
          this.form.value.image
        );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
