import { Component, OnInit } from '@angular/core';
import { SubCategoryModel } from '@model/admin/sub-category.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteSubCategory, GetAllSubCategory } from 'src/app/core/store/action/sub-category.action';
import { SubCategoryState } from 'src/app/core/store/state/sub-category.state';

@Component({
  selector: 'tcb-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor(private store: Store) { }
  @Select(SubCategoryState.getSubCategoryList) subCategoryList$: Observable<SubCategoryModel[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetAllSubCategory());
  }

  onDelete(id: string) {
    if(confirm('Are you sure to delete?')) {
      this.store.dispatch(new DeleteSubCategory(id));
    }
  }
}
