import { SafeHtml } from '@angular/platform-browser';
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
    @Input() set config(conf: MConfig) {
        if(typeof conf.msg === 'string'){
            this.msg = conf.msg;
        }else {
            this.html = conf.msg;
        }
        this.conf = conf;
    };

    html!: SafeHtml;
    msg!: string;
    conf!: MConfig;

    closeM(){
        this.close.emit();
    }

    confirmM(){
        this.confirm.emit();
    }
}
