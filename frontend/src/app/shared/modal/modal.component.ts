import { MConfig } from './models/modal.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Output() close = new EventEmitter();
    @Output() confirm = new EventEmitter();
    @Input() config!: MConfig;
    closeM(){
        this.close.emit();
    }

    confirmM(){
        this.confirm.emit();
    }
}
