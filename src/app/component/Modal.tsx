import {FC} from "react";
import {ModalProps} from "../type/Types";

const Modal: FC<ModalProps> = (props) => {
    return (
        <div style={{
                position:'absolute',
                top:'100%',
                zIndex:'100',
                display:'flex',
                padding:'1rem 0',
                marginTop:'0.5rem',
                left:'0',
                border:'1px solid #e1e1e1',
                borderRadius:'2px',
                boxShadow:'0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 12px 0 rgba(0, 0, 0, 0.19)',
                ...props.style
            }}
            className={props.className}
        >

            <div className={`js-filter-lefter`}>
                <div style={{borderRight:'1px solid black', padding:'0 1rem'}}>awd</div>
            </div>
            <div className={`js-filter-righter`} style={{padding:'0 1rem'}}>eeee</div>

        </div>
    )
}
export default Modal;