import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { CateListComponent } from './cate-list/cate-list.component';
import { AddCateComponent } from './add-cate/add-cate.component';

const routes: Routes = [
  {
    path: "post",
    redirectTo: "post/all"
  },
  {
    path: "post/all",
    component: PostListComponent
  },
  {
    path: "post/add",
    component: CreatePostComponent
  },
  {
    path: "post/edit/:postId",
    component: UpdatePostComponent
  },
  {
    path: "category",
    redirectTo: "category/all"
  },
  {
    path: "category/all",
    component: CateListComponent
  },
  {
    path: "category/add",
    component: AddCateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
