import { Component, OnInit } from "@angular/core";
import { ProductsService } from "@bluebits/products";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
@Component({
  selector: "admin-products-list",
  templateUrl: "./products-list.component.html",
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId) {
    this.confirmationService.confirm({
      message: "Do you want to delete this Product",
      header: "Delete Product",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Product is Deleted",
            });
          },
          () => {
            this.messageService.add({
              severity: "error",
              summary: "error",
              detail: "Product is Not Deleted",
            });
          }
        );
      },
    });
  }
}
