import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMinikitComponent } from './edit-minikit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditMinikitComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditMinikitComponent
  ]
})
export class EditMinikitModule { }
