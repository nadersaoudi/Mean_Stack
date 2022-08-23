import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  CategoriesService,
  Product,
  ProductsService,
} from "@bluebits/products";
import { MessageService } from "primeng/api";
import { timer } from "rxjs";

@Component({
  selector: "admin-products-form",
  templateUrl: "./products-form.component.html",
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      countInStock: ["", Validators.required],
      description: ["", Validators.required],
      richDescription: [""],
      image: ["", Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _createProduct(productData: FormData) {
    this.productService.createProducts(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: `Product ${product.name} is Created`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Product is not Create",
        });
      }
    );
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category._id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }
  get productForm() {
    return this.form.controls;
  }

  onCancel() {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._createProduct(productFormData);
    }
  }

  private _updateProduct(productFormData: FormData) {
    this.productService.updateProduct(productFormData, this.currentProductId).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: `Product ${product.name} is updated`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Product is not updated",
        });
      }
    );
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get("image").updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
