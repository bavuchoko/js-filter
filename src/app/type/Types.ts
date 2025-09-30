import {CSSProperties} from "react";

export type FilterProps = {
    style?: Style;
    className?: ClassName;
}

type Style={
    button?:CSSProperties;
    container?:CSSProperties;
}
type ClassName={
    button?:string;
    container?:string;
}
export type FilterButtonProps = {
    onClick?: (e: any)=>void;
    style?: Style;
    className?: ClassName;
    name?: string;
}

export type ObjectType = {
    [key: string]: string | number;
};

export type ValueType = {
    [key: string]: string | number | number[] | string[] | undefined | ObjectType ;
}
export type ModalProps = {
    close?: () => void;
    values?: ValueType | null;
    handle?: (key: string , val: any, type?: 'only' | 'date') => void;
    remove?: (key: string, val: any, type?: 'only' | 'date') => void;
    reset?: () => void;
    onSearch?: (values: ValueType | null) => void;
    style?:CSSProperties;
    className?:string;
};