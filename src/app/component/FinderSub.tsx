import {FC} from "react";
import ChevronDown from "./svg/ChevronDown";
import ChevronRight from "./svg/ChevronRight";
import {usePointerClick} from "../hook/usePointerClick";


type FinderSubProps = {
    el: any;
    onClick?: (el: any) => void;
    doubleClick?: (el: any) => void;
    belong?: boolean;
    reverseColor?:boolean;
};

const FinderSub:FC<FinderSubProps> =(props)=>{
    const { handlePointerUp } = usePointerClick({
        onSingleClick: () => props.onClick?.(props.el),
        onDoubleClick: () => props.doubleClick?.(props.el),
        delay: 250,
    });

    return (
        <div
            style={{
            display: 'flex', padding: '8px 0 8px 8px',
            userSelect :'none',
            background: props.reverseColor
                ? props.belong ? 'white' : 'var(--jf-innerBorder)'
                : !props.belong ? 'white' : 'var(--jf-innerBorder)'
        }} className={'no-drag'}>
            <div style={{cursor: 'pointer'}} className={`hover-circle`}>
                {props.el.children ?
                    <div style={{width: '15px', height: '15px', display: 'inline-block', marginRight: '5px'}} onClick={() => {
                        props.doubleClick?.(props.el)
                    }}>
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
                }}
                 onPointerUp={handlePointerUp}
            >{props.el.name}</div>
        </div>
    )
}
export default FinderSub;