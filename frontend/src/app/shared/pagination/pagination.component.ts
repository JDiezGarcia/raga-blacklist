import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    styleUrls: ['pagination.component.scss'],
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {
    @Output() pageSelect = new EventEmitter();
    @Input() set totalPages(totalPages: number) {
        this.maxPage = totalPages;
        this.setPages();
    };
    @Input() set currentPage(currentPage: number){
        this.actualPage = currentPage;
        this.setPages();
    };

    actualPage: number = 1;
    maxPage!: number;
    previousPage!: number;
    nextPage!: number;
    lastPage!: number;
    firstPage!: number;

    select(page: number) {
        this.pageSelect.emit(page);
    }

    setPages() {
        this.lastPage = this.maxPage;
        this.firstPage = 1;
        this.previousPage = this.actualPage - 1;
        this.nextPage = this.actualPage + 1;
    }
}
