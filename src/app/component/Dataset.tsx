import {FC, useState} from "react";
import {Data, SearchProps} from "../type/Types";
import {getNestedValue} from "../hook/useFilterHandle";


const Dataset:FC<SearchProps> =(props)=>{
    const [show, setShow] =useState< Data[] | undefined>(props.data?.content)
    const [searchText, setSearchText] = useState('');

    const handleClick =(id:number)=>{
        if(props.clicked) props.handle?.(props.clicked?.key , id, props.clicked.type, props.clicked.multiple)
    }

    const val = props.values?.[props.clicked?.key ?? ''];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase();
        setSearchText(text);

        if (!props.data?.content) return;

        const filtered = props.data.content.filter(d => {
            // ✅ name 필드 검사
            const inName = d.name?.toLowerCase().includes(text);

            // ✅ labels 필드들 검사
            const inShow = props.clicked?.labels?.some(path => {
                const val = getNestedValue(d, path);
                if (typeof val === 'string') return val.toLowerCase().includes(text);
                if (typeof val === 'number') return val.toString().includes(text);
                return false;
            });

            // ✅ 하나라도 true면 포함
            return inName || inShow;
        });

        setShow(filtered);
    };

    return (
        <div className={`js-filter-righter`} style={{padding:'0 2rem', width:'340px',}}>
            <input
                className={`js-filter-input-focus`}
                placeholder={'검색하세요...'}
                style={{
                    borderRadius:'6px',
                    padding:'0.5rem',
                    height:'30px',
                    background:'#eaecee',
                    width:'100%',
                    textIndent:'0.5rem',
                    border:'none',

                    marginBottom:'1rem'
                }}
                onChange={handleInputChange}
            />
            <div style={{
                    height:'calc(100% - ( 3rem + 10px ) )',
                    overflow:'auto',
                }}
            >
                <ul style={{margin:0, padding:0}}>
                    {show?.map((e, index)=>{
                        const isChecked = Array.isArray(val)
                            ? (val as (number | string)[]).includes(e.id)
                            : (typeof val === 'number' || typeof val === 'string')
                                ? val === e.id || val === e.name
                                : false;

                        return(
                            <li key={e.name+'_'+index}
                                className={`js-filter-dataset-hover`}
                                 style={{
                                     display:'flex',
                                     padding:'0.5rem',
                                     userSelect:'none',
                                     borderRadius:'6px'
                                 }}
                                onClick={()=>handleClick(e.id)}
                            >
                                <input type={'checkbox'} style={{marginRight:'1rem'}} checked={isChecked} readOnly/>
                                <p style={{ margin: '0', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        width: '80px',
                                        display: 'inline-block',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }} title={e.name}>{e.name}</span>
                                    {props.clicked?.labels && props.clicked?.labels.length > 0 &&
                                        <span style={{ fontSize: '12px', color: '#666', display: 'flex', gap: '10px' }}>
                                            {props.clicked.labels.map((path, i) => {
                                                const val = getNestedValue(e, path);
                                                const text = val !== undefined && val !== null ? val.toString() : '-';
                                                return (
                                                    <span style={{
                                                        width: '70px',
                                                        display: 'inline-block',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                          title={text}>
                                                            {text}
                                                    </span>
                                                );
                                            })}
                                        </span>
                                    }
                                </p>
                            </li>
                        )

                    })}
                </ul>
            </div>
        </div>
    )
}
export default Dataset;