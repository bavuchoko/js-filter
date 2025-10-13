import {FC} from "react";
import {ValueType} from "../../type/Types";

type FooterProps = {
    data?:ValueType;
    reset?: () => void;
    count?: number;
    message?: string | string[];
}

const Footer:FC<FooterProps> =(props)=>{
    return (
        <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            height:'3.5rem',
            padding:'0 2rem',
            borderTop:'1px solid #e1e1e1',
            userSelect:'none',
        }}
        >
            <div style={{width:'180px', marginRight:'18px'}}>
                {props.data &&
                <span onClick={props.reset}>지우기</span>
                }
            </div>
            <div>{props.message}</div>
            <div style={{width:'80px', textAlign:'right', marginLeft:'auto'}}>총 {props.count} 건</div>
        </div>
    )
}
export default Footer;