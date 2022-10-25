export interface MConfig {
    title: string;
    msg: string;
    close?: MConfigButton;
    confirm?: MConfigButton;
}

export interface MConfigButton {
    text: string;
    colorT: string;
    colorB: string;
}