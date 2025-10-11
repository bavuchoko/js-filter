import {FC, useState} from "react";
import {Data, SearchProps} from "../type/Types";


const Dataset:FC<SearchProps> =(props)=>{
    const [show, setShow] =useState< Data[] | undefined>(props.data?.content)
    const [searchText, setSearchText] = useState('');

    const handleClick =(id:number)=>{
        if(props.clicked) props.handle?.(props.clicked?.key , id, props.clicked.vessel)
    }

    const val = props.values?.[props.clicked?.key ?? ''];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setSearchText(text);

        if (props.data?.content) {
            const filtered = props.data.content.filter(d =>
                d.name.toLowerCase().includes(text.toLowerCase())
            );
            setShow(filtered);
        }
    }

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
                                <p style={{margin:'0', fontSize:'14px'}}>{e.name}</p>
                            </li>
                        )

                    })}
                </ul>
            </div>
        </div>
    )
}
export default Dataset;