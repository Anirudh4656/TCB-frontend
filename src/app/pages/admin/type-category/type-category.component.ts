import { Component, OnInit } from '@angular/core';
import { TypeCategoryModel } from '@model/admin/type-category.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteTypeCategory, GetAllTypeCategory } from 'src/app/core/store/action/type-category.action';
import { TypeCategoryState } from 'src/app/core/store/state/type-category.state';

@Component({
  selector: 'tcb-type-category',
  templateUrl: './type-category.component.html',
  styleUrls: ['./type-category.component.css']
})
export class TypeCategoryComponent implements OnInit {

  constructor(private store: Store) { }
  @Select(TypeCategoryState.getTypeCategoryList) typeCategoryList$: Observable<TypeCategoryModel[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetAllTypeCategory());
  }

  onDelete(id: string) {
    if(confirm('Are you sure to delete?')) {
      this.store.dispatch(new DeleteTypeCategory(id));
    }
  }
}
