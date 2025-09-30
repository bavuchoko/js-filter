import FilterIcon from "./svg/FilterIcon";
import {FC} from "react";
import {FilterButtonProps} from "../type/Types";

const FilterButton:FC<FilterButtonProps> =(props)=>{
    return (
        <div style={{
            display:'inline-flex',
            alignItems:'center',

            fontSize:'14px',
            justifyContent:'center',
            border:'1px solid #bebebe',

            userSelect:'none',
            borderRadius:'2px',
            ...props.style?.button}} className={props.className?.button}
             onClick={props.onClick}
        >
            <FilterIcon />
            {props.name &&
                <span style={{display:'inline-block', marginRight:'5px'}}>{props.name}</span>
            }
        </div>
    )
}
export default FilterButton;