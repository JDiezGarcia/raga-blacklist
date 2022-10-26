import { SafeHtml } from '@angular/platform-browser';

export interface MConfig {
    title: string;
    msg: string | SafeHtml;
    close?: MConfigButton;
    confirm?: MConfigButton;
}

export interface MConfigButton {
    text: string;
    colorT: string;
    colorB: string;
}