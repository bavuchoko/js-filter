import {CSSProperties, Dispatch, SetStateAction} from "react";

export type FilterProps = {
    style?: Style;
    className?: ClassName;
    data?: DataSet;
    conditions?:Condition[];
    initialValues?: ValueType| undefined;
    onValueChange?: (value: ValueType | undefined) => void;
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
    className?: string;
    name?: string;
}

export type ObjectType = {
    [key: string]: string | number;
};
type Period = {
    from: Date
    to:Date
}
export type ValueType = {
    [key: string]: string | number | number[] | string[] | undefined | ObjectType ;
}
export type Data = {
    id: number;
    name: string;
    parentId?: number;
    children?: Data[];
}

export type DataSet ={
    content?: Data[];
    pageable?: Page;
    totalElements?: number;
    totalPages?: number;
    children?:any[];
    listener?:(v:any)=>void;
}
type Page = {
    pageNumber?: number;
    size?: number;
    sort?: string[];
    desc?: string;
}
export type ModalProps = {
    close?: () => void;
    clicked?:Condition;
    setClicked?: (click: Condition) => void;
    conditions?:Condition[];
    data?: DataSet;
    setData?:(listener?: () => void) => void;
    values?: ValueType | undefined;
    handle?: (key: string , val: any, type?: Type) => void;
    reset?: () => void;
    style?:CSSProperties;
    className?:string;
    onSearch?: (values: ValueType | undefined) => void;
    message?: string;
    setMessage?:Dispatch<SetStateAction<string | undefined>>
    loading?: boolean;
};
export type Condition = {
    key: string;
    label: string;
    type?: Type;
    multiple?:boolean;
    api?:  () => Promise<DataSet>;
    labels?:string[];
    target?:Target[];
}

export type Target={
    key: string,
    name: string,
}


export type Search={
    key: string,
    label: string,
    api?:  () => Promise<DataSet>;
}


export type SearchProps ={
    data?:DataSet
    values?: ValueType | undefined;
    clicked?:Condition;
    handle?: (key: string , val: any, type?:Type, multiple?:boolean) => void;
    setMessage?:(message: string) => void;
}



export type Type =  'DATE' | 'PERIOD' | 'TEXT' | 'CODE' | 'RECURSIVE' | undefined;