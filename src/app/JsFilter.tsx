import {FC, useEffect, useState} from "react";
import {Condition, DataSet, FilterProps} from "./type/Types";
import '../index.css';
import '../calendar.css';
import FilterButton from "./component/utils/FilterButton";
import {useToggleModal} from "./hook/useToggleModal";
import Modal from "./component/utils/Modal";
import {useFilterHandle} from "./hook/useFilterHandle";

const JsFilter:FC<FilterProps> =(props)=>{

    const { isOpen, toggle, close, ref } = useToggleModal<HTMLDivElement>();
    const { values, handle, reset, remove } = useFilterHandle(props.onValueChange, props.initialValues);
    const [clicked, setClicked] = useState<Condition| undefined>(undefined);
    const [message, setMessage] =useState<string | undefined>(undefined)
    const [data, setData] = useState<DataSet | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            if (clicked?.api) {
                try {
                    setLoading(true)
                    const result = await clicked.api();
                    setData(result);
                    setLoading(false)
                } catch (err) {
                    console.error(err);
                    setMessage("데이터를 불러오지 못했습니다.");
                }
            }
        };
        fetchData();
    }, [clicked]);


    return (
        <div   ref={ref} style={{position:'relative'}}>
            <FilterButton name={'필터'} className={props.className?.button} style={props.style} onClick={toggle}/>
            {isOpen && (
                <Modal

                    values={values}
                    handle={handle}
                    conditions={props.conditions}
                    data={data}
                    loading={loading}
                    style={props.style?.container}
                    className={props.className?.container}
                    clicked={clicked}
                    setClicked={setClicked}
                    reset={reset}
                    setMessage={setMessage}
                    message={message}
                />
            )}
        </div>
    )
}
export default JsFilter