import {CSSProperties, FC} from "react";

type SvgProps ={
    style? :CSSProperties;

}

const ChevronRight:FC<SvgProps> =(props)=>{

    return (
        <svg style={{width: props.style?.width ??'18px', height:props.style?.height?? '18px',...props.style }}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path d="M9.5 7L14.5 12L9.5 17" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}
export default ChevronRight;