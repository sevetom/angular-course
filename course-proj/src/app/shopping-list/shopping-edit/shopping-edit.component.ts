import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppigListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppigListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppigListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAddIngredient() {
    const ingName = this.form.value.name;
    const ingAmount = this.form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppigListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppigListService.addIngredient(newIngredient);
    }
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppigListService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
