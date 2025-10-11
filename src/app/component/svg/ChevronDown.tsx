import {CSSProperties, FC} from "react";

type SvgProps ={
    style? :CSSProperties;

}

const ChevronDown:FC<SvgProps> =(props)=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: props.style?.width ??'18px', height:props.style?.height?? '18px',...props.style }} viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="white"/>
            <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}
export default ChevronDown;