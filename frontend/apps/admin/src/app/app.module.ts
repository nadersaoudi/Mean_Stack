import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CategoriesService, ProductsService } from "@bluebits/products";

//Components
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ShellComponent } from "./shared/shell/shell.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";

import { ToolbarModule } from "primeng/toolbar";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ColorPickerModule } from "primeng/colorpicker";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputSwitchModule } from "primeng/inputswitch";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { ConfirmationService, MessageService } from "primeng/api";

const UX_MODULE = [
  CardModule,
  InputTextModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextareaModule,
  DropdownModule,
  EditorModule,
];
const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "categories",
        component: CategoriesListComponent,
      },
      {
        path: "categories/form",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/form/:id",
        component: CategoriesFormComponent,
      },
      {
        path: "products",
        component: ProductsListComponent,
      },
      {
        path: "products/form",
        component: ProductsFormComponent,
      },
      {
        path: "products/form/:id",
        component: ProductsFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: "enabled" }),
    ...UX_MODULE,
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    ProductsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
