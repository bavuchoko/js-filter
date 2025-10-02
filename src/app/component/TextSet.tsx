import {Condition, DataSet, SearchProps, Target, ValueType} from "../type/Types";
import {FC, useState, useEffect} from "react";

const TextSet: FC<SearchProps> = (props) => {
    const [checkedItems, setCheckedItems] = useState<Target[]>([]);

    // 첫 번째 요소를 기본 체크
    useEffect(() => {
        if (props.clicked?.target?.length) {
            setCheckedItems([props.clicked.target[0]]);
        }
    }, [props.clicked?.target]);

    const placeHolder =
        checkedItems.length > 0
            ? `${checkedItems.map(item => item.name).join(", ")}에서 검색합니다`
            : "검색하세요...";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.clicked) props.handle?.(props.clicked?.key ,e.target.value, props.clicked.vessel)
        if (props.handle && checkedItems) {
            checkedItems.forEach(item => {
                props.handle?.(item.key, e.target.value, props.clicked?.vessel);
            });
        }
    };

    const handleCheckboxChange = (t: Target, checked: boolean) => {
        setCheckedItems((prev) => {
            const newChecked = checked
                ? [...prev.filter(item => item.key !== t.key), t]
                : prev.filter(item => item.key !== t.key);

            return newChecked;
        });

        const value = Array.isArray(props.values?.['searchTxt'])
            ? props.values?.['searchTxt'][0]
            : props.values?.['searchTxt'];

        props.handle?.(t.key, value, props.clicked?.vessel);
    };


    const inputValue =
        props.clicked && props.values?.[props.clicked.key] !== undefined
            ? (() => {
                const val = props.values[props.clicked.key];
                if (typeof val === "string" || typeof val === "number") return val;
                if (Array.isArray(val)) return val.join(", "); // 배열이면 문자열로 합침
                return ""; // ObjectType 등은 빈 문자열
            })()
            : "";

    return (
        <div
            className={`js-filter-righter`}
            style={{ padding: "0 2rem", width: "340px"}}
        >
            <input
                className={`js-filter-input-focus`}
                placeholder={placeHolder}
                style={{
                    borderRadius: "6px",
                    padding: "0.5rem",
                    height: "30px",
                    background: "#eaecee",
                    width: "100%",
                    textIndent: "0.5rem",
                    border: "none",
                    marginBottom: "1rem",
                }}
                onChange={handleInputChange}
                value={inputValue}
            />
            <div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        marginBottom:'3rem'
                    }}
                >
                    {props.clicked?.target?.map((e, index) => (
                        <div key={index} style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                style={{ marginRight: "1rem" }}
                                checked={checkedItems.includes(e)} // 체크 반영
                                onChange={(ev) =>
                                    handleCheckboxChange(e, ev.target.checked)
                                }
                            />
                            <p style={{ margin: "0", fontSize: "14px" }}>{e.name}</p>
                        </div>
                    ))}
                </div>
                
            </div>
            {/*<p style={{ fontSize:'15px', display:'flex', alignItems:'center'}} >*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" height={'20px'} style={{border:'1px solid black', padding:'1px 2px', marginRight:'0.5rem'}} viewBox="2 2 20 20"><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/></svg>*/}
            {/*    를 눌러 검색어로 지정합니다.</p>*/}
        </div>
    );
};
export default TextSet;
