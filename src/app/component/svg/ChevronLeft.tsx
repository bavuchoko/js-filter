import {CSSProperties, FC} from "react";

type SvgProps ={
    style? :CSSProperties;
    onClick?: (e: any)=>void;
}

const ChevronLeft:FC<SvgProps> =(props)=>{
    return (
        <svg style={{width: props.style?.width ?? '18px', height: props.style?.height ?? '18px', ...props.style}} xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" fill="none"
             onClick={props.onClick}
        >
            <rect width="24" height="24" fill="white"/>
            <path d="M14.5 17L9.5 12L14.5 7" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
export default ChevronLeft;