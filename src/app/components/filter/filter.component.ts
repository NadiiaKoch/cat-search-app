import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Breed } from '../../shared/interfaces/breed';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() public form!: FormGroup;
  @Input() public breeds$!: Observable<Breed[]>;

  @Output() private search = new EventEmitter<void>();

  public onSearch(): void {
    this.search.emit();
  }
}
