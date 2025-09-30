import {FC} from "react";
import {FilterProps} from "./type/Types";
import '../index.css';
import FilterButton from "./component/FilterButton";
import {useToggleModal} from "./hook/useToggleModal";
import Modal from "./component/Modal";

const JsFIlter:FC<FilterProps> =(props)=>{

    const { isOpen, toggle, close } = useToggleModal();

    return (
        <div style={{position:'relative'}}>
            <FilterButton name={'필터'} onClick={toggle}/>
            {isOpen && (
                <Modal

                    style={props.style?.container}
                    className={props.className?.container}
                />
            )}
        </div>
    )
}
export default JsFIlter