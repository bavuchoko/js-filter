import Dataset from "./Dataset";
import {FC, useEffect} from "react";
import {ModalProps} from "../type/Types";
import TextSet from "./TextSet";
import DateSet from "./DateSet";
import RecursiveSet from "./RecursiveSet";
import Loading from "./utils/Loading";
import SearchComponent from "./SearchComponent";
import PeriodSet from "./utils/PeriodSet";


const ComponentAllocator:FC<ModalProps> =(props)=>{
    const type =  props.clicked?.type

    useEffect(() => {
        props.setMessage?.(undefined);
    }, [props.clicked]);
    return(
        <>

            {props.loading && <Loading />}

            {! props.loading && ( (props.clicked === undefined || type === undefined || type ==='CODE') &&
                <Dataset data={props.data} handle={props.handle} values={props.values} clicked={props.clicked} setMessage={props.setMessage}/>
            )}
            {! props.loading && ( type ==='TEXT' &&
                <TextSet data={props.data} handle={props.handle} values={props.values} clicked={props.clicked} setMessage={props.setMessage}/>
            )}
            {! props.loading && ( type==='RECURSIVE' &&
                <RecursiveSet data={props.data} handle={props.handle} values={props.values} clicked={props.clicked} setMessage={props.setMessage}/>
            )}
            {! props.loading && ( type==='DATE' &&
                <DateSet handle={props.handle} values={props.values} clicked={props.clicked} setMessage={props.setMessage}/>
            )}
            {! props.loading && ( type==='PERIOD' &&
               <PeriodSet {...props} />
            )}
        </>
    )
}
export default ComponentAllocator;