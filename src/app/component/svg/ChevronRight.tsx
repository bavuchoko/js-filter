import {CSSProperties, FC} from "react";

type SvgProps ={
    style? :CSSProperties;
    onClick?: (e: any)=>void;
}

const ChevronRight:FC<SvgProps> =(props)=>{

    return (
        <svg style={{width: props.style?.width ??'18px', height:props.style?.height?? '18px',...props.style }}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}>
            <rect width="24" height="24"/>
            <path d="M9.5 7L14.5 12L9.5 17" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
export default ChevronRight;