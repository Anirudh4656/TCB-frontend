import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './material/angular-material.module';
// Guard
import { AuthGuard } from '@guard/auth.guard';
// Interceptor
import { AdminInterceptor } from '@interceptor/admin.interceptor';
import { LoaderInterceptor } from '@interceptor/loader.interceptor';
// State
import { CategoryState } from '@store/state/category.state';
import { PostTypeState } from '@store/state/post-type.state';
import { PostsState } from '@store/state/posts.state';
// Pipe
import { DateAgoPipe } from '@pipe/date-ago.pipe';
import { NumSuffixPipe } from './core/pipes/num-suffix.pipe';
import { SafePipe } from '@pipe/safe.pipe';
// Component
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { PostComponent } from './pages/post/post.component';
import { SearchBoxComponent } from './pages/search-box/search-box.component';
import { CategoryPostComponent } from './pages/category-post/category-post.component';
import { SubCategoryState } from '@store/state/sub-category.state';

@NgModule({
  declarations: [
    AppComponent, CarouselComponent, FooterComponent,
    HeaderComponent, LoaderComponent, PostComponent, IndexComponent, DateAgoPipe, SearchBoxComponent, CategoryPostComponent, SafePipe, NumSuffixPipe
  ],
  imports: [
    FormsModule, BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule,
    AngularMaterialModule, NgxsModule.forRoot([PostsState, CategoryState, PostTypeState,SubCategoryState]),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
