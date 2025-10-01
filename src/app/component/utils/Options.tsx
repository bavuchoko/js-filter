import {FC} from "react";
import {Condition, ValueType} from "../../type/Types";

type OptionProps ={
    data?:any[]
    clicked?:Condition;
    setClicked?: (click: Condition) => void;
    values?: ValueType | undefined;
}

const Options:FC<OptionProps> =(props)=>{



    const handleClick =(key:Condition)=>{
        props.setClicked?.(key)

    }
    const getCount = (key: string): number => {
        const val = props.values?.[key];
        if (Array.isArray(val)) return val.length;
        if (val === undefined) return 0;
        return 1;
    };


    return (
        <div className={`js-filter-lefter`} style={{padding:'0 1.5rem'}}>
            <div style={{
                overflow:'auto',
                width:'180px',
            }}
            >
                <ul style={{margin:0, padding:0}}>
                {props.data?.map((e, index)=>{
                    const count = getCount(e.key);
                    return(
                        <li key={e.key}
                            className={`js-filter-options ${props.clicked?.key ===e.key && 'js-filter-option-clicked'} ${count > 0 ? 'has-count' : ''}`}
                            data-count={count > 9 ? '9+' : count > 0 ? count : undefined}
                            style={{
                                display:'flex',
                                padding:'0.5rem 1rem',
                                userSelect:'none',
                                // borderRadius:'6px'
                            }}
                            onClick={()=>handleClick(e)}
                        >
                            <p style={{
                                margin: '0',
                                fontSize: '14px',
                                maxWidth: '130px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{e.label}</p>

                        </li>
                    )

                })}
                </ul>
            </div>
        </div>
    )
}
export default Options;