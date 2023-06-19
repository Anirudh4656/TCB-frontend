import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '@model/admin/category.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteCategory, GetAllCategory } from 'src/app/core/store/action/category.action';
import { CategoryState } from 'src/app/core/store/state/category.state';

@Component({
  selector: 'tcb-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private store: Store) { }
  @Select(CategoryState.getCategoryList) categoryList$: Observable<CategoryModel[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetAllCategory());
  }

  onDelete(id: string) {
    if(confirm('Are you sure to delete?')) {
      this.store.dispatch(new DeleteCategory(id));
    }
  }
}
