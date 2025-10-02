import {FC, useState} from "react";
import {Condition, FilterProps} from "./type/Types";
import '../index.css';
import '../calendar.css';
import FilterButton from "./component/utils/FilterButton";
import {useToggleModal} from "./hook/useToggleModal";
import Modal from "./component/utils/Modal";
import {useFilterHandle} from "./hook/useFilterHandle";

const JsFilter:FC<FilterProps> =(props)=>{

    const { isOpen, toggle, close } = useToggleModal();
    const { values, handle, reset, remove } = useFilterHandle(props.onValueChange, props.initialValues);
    const [clicked, setClicked] = useState<Condition| undefined>(undefined);
    return (
        <div style={{position:'relative'}}>
            <FilterButton name={'필터'} onClick={toggle}/>
            {isOpen && (
                <Modal
                    values={values}
                    handle={handle}
                    conditions={props.conditions}
                    data={props.data}
                    setData={props.setData}
                    style={props.style?.container}
                    className={props.className?.container}
                    clicked={clicked}
                    setClicked={setClicked}
                    reset={reset}
                />
            )}
        </div>
    )
}
export default JsFilter