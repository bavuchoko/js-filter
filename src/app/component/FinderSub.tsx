import {FC} from "react";
import ChevronDown from "./svg/ChevronDown";
import ChevronRight from "./svg/ChevronRight";


type FinderSubProps = {
    el: any;
    onClick: (el: any) => void;
    belong?: boolean;
    handle: (el:any)  => void;
    reverseColor?:boolean;
};

const FinderSub:FC<FinderSubProps> =(props)=>{
    return (
        <div style={{
            display: 'flex', padding: '8px 0 8px 8px',
            background: props.reverseColor
                ? props.belong ? 'white' : 'var(--jf-innerBorder)'
                : !props.belong ? 'white' : 'var(--jf-innerBorder)'
        }} className={'no-drag'}>
            <div style={{cursor: 'pointer'}} className={`hover-circle`} onClick={() => {
                props.onClick(props.el)
            } }>
                {props.el.children ?
                    <div style={{width: '15px', height: '15px', display: 'inline-block', marginRight: '5px'}}>
                        <ChevronRight />
                    </div>
                    :
                    <div style={{width: '15px', height: '15px', display: 'inline-block', marginRight: '5px'}}/>
                }
            </div>
            <div className={`hover-bg-gray`} style={{
                width: '100%',
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }} onClick={() => props.handle?.(props.el)}>{props.el.name}</div>
        </div>
    )
}
export default FinderSub;