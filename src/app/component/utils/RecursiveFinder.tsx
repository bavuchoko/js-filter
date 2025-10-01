import {FC} from "react";
import {SearchProps} from "../../type/Types";

const RecursiveFinder:FC<SearchProps> = (props)=>{
    console.log(props.data)
    return (
        <div
            className={`js-filter-righter`}
            style={{ padding: "0 2rem", width: "340px"}}
        >

        </div>
    )
}
export default RecursiveFinder;