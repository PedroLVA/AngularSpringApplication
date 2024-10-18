import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage: number = 0; 
  @Input() totalPages: number = 0;
  nextPage = output();
  previousPage = output()
  pageSelected = output<number>()

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.nextPage.emit();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.previousPage.emit();
    }
  }

  selectPage(page: number): void {
    this.pageSelected.emit(page);
  }
}


