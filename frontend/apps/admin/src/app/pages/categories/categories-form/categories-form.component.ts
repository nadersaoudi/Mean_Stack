import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CategoriesService, Category } from "@bluebits/products";
import { MessageService } from "primeng/api";
import { timer } from "rxjs";

@Component({
  selector: "admin-categories-form",
  templateUrl: "./categories-form.component.html",
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentCategoryId: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      _id: this.currentCategoryId,
      name: this.categoryFrom.name.value,
      icon: this.categoryFrom.icon.value,
      color: this.categoryFrom.color.value,
    };
    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._createCategory(category);
    }
  }

  private _createCategory(category: Category) {
    this.categoriesService.createCategories(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: `Category ${category.name} is Created`,
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
          detail: "Category is not Create",
        });
      }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: `Category ${category.name} is Updated`,
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
          detail: "Category is not Update",
        });
      }
    );
  }

  get categoryFrom() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe((category) => {
          this.categoryFrom.name.setValue(category.name);
          this.categoryFrom.icon.setValue(category.icon);
          this.categoryFrom.color.setValue(category.color);
        });
      }
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: ["", Validators.required],
      color: ["#fff"],
    });
  }

  onCancle() {
    this.location.back();
  }
}
