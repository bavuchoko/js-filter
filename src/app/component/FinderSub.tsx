import {FC} from "react";
import {Condition, ValueType} from "../type/Types";
import FolderOpen from "./svg/FolderOpen";
import FolderClose from "./svg/FolderClose";
import File from "./svg/File";


type FinderSubProps = {
    el: any;
    onClick?: (el: any) => void;
    doubleClick?: (el: any) => void;
    belong?: boolean;
    reverseColor?:boolean;
    values?: ValueType | undefined;
    clicked?:Condition;
};

const FinderSub:FC<FinderSubProps> =(props)=>{
    const val = props.values?.[props.clicked?.key ?? ''];
    const isChecked = Array.isArray(val)
        ? (val as (number | string)[]).includes(props.el.id)
        : (typeof val === 'number' || typeof val === 'string')
            ? val === props.el.id || val === props.el.name
            : false;


    // const { handlePointerUp } = usePointerClick({
    //     onSingleClick: () => props.onClick?.(props.el.id),
    //     onDoubleClick: () => props.doubleClick?.(props.el),
    //     delay: 200,
    // });

    return (
        <div
            style={{
            display: 'flex', padding: '8px 0 8px 8px',
            userSelect :'none',
            background: props.reverseColor
                ? props.belong ? 'white' : 'gray'
                : !props.belong ? 'white' : '#e0e8f5'
        }} className={'no-drag'}>
            <div style={{cursor: 'pointer', display:'flex'}} className={`hover-circle`}>
                {props.el.children?.length > 0 ?
                    <div style={{width: '15px', height: '15px', display: 'inline-block', marginRight: '5px'}} onClick={() => {
                        props.doubleClick?.(props.el)
                    }}>
                        {props.belong ?<FolderOpen />:  <FolderClose />}

                    </div>
                    :
                    <div style={{width: '15px', height: '15px', display: 'inline-block', marginRight: '5px', textAlign:'center'}}>
                        <File />
                    </div>
                }
                <input type={'checkbox'} style={{marginRight:'1rem'}} checked={isChecked}
                       // onPointerUp={handlePointerUp}
                       onClick={()=>{
                           props.onClick?.(props.el.id)
                           props.doubleClick?.(props.el)
                       }}
                />
            </div>
            <div className={`hover-bg-gray`} style={{
                width: '100%',
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
                }}
                 onClick={()=>{
                     props.onClick?.(props.el.id)
                     props.doubleClick?.(props.el)
                 }}
                 // onPointerUp={handlePointerUp}
            >{props.el.name}</div>
        </div>
    )
}
export default FinderSub;