import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CatImage } from '../../shared/interfaces/cat-image';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss',
})
export class CatCardComponent {
  @Input() public cat!: CatImage;
  @Input() public isFavorite: boolean = false;

  @Output() public toggleFavorite = new EventEmitter<CatImage>();

  public onToggleFavorite(): void {
    this.toggleFavorite.emit(this.cat);
  }
}
