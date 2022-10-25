import { IconName } from '@fortawesome/free-solid-svg-icons';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'tableFieldPipe',
    standalone: true
})
export class TableFieldPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {}
    transform(value: any): SafeHtml | string{
        if (value === true || value === false) {
            const icon: IconName = value ? 'check' : 'xmark';
            const color = value ? 'success' : 'danger';
            return this._sanitizer.bypassSecurityTrustHtml(`<i class="fa-solid fa-${icon} text-${color}"></i>`);
        }
        else if (value !== '' && value) {
            return value + '';
        } else {
            return '-';
        }
    }
}  