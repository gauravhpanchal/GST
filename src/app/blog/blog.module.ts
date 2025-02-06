import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { BlogRoutingModule } from './blog-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { CateListComponent } from './cate-list/cate-list.component';
import { AddCateComponent } from './add-cate/add-cate.component';

import { BlogService } from './blog.service';

@NgModule({
  declarations: [CreatePostComponent, UpdatePostComponent, PostListComponent, CateListComponent, AddCateComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  providers: [BlogService]
})
export class BlogModule { }
