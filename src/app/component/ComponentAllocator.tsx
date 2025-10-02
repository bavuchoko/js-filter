import Dataset from "./Dataset";
import {FC} from "react";
import {ModalProps} from "../type/Types";
import TextSet from "./TextSet";
import RecursiveFinder from "./utils/RecursiveFinder";
import DateSet from "./DateSet";


const ComponentAllocator:FC<ModalProps> =(props)=>{
    const type =  props.clicked?.type

    return(
        <>
            {(props.clicked === undefined || type === undefined || type ==='CODE') &&
                <Dataset data={props.data} handle={props.handle} values={props.values} clicked={props.clicked}/>
            }
            {type ==='TEXT' &&
                <TextSet data={props.data} handle={props.handle} values={props.values} clicked={props.clicked}/>
            }
            { type==='RECURSIVE' &&
                <RecursiveFinder data={props.data} handle={props.handle} values={props.values} clicked={props.clicked}/>
            }
            { type==='DATE' &&
                <DateSet data={props.data} handle={props.handle} values={props.values} clicked={props.clicked}/>
            }
        </>
    )
}
export default ComponentAllocator;