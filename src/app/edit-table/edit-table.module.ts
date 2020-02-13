import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTableComponent } from './edit-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditTableComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditTableComponent, CommonModule
  ]
})
export class EditTableModule { }
