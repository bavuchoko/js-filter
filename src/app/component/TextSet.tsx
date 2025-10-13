import { SearchProps, Target } from "../type/Types";
import React, { FC, useEffect, useState, useCallback } from "react";

const TextSet: FC<SearchProps> = ({ clicked, values, handle }) => {
    const [checkedItems, setCheckedItems] = useState<Target[]>([]);
    const [text, setText] = useState<string>("");

    // 초기 체크값 세팅
    useEffect(() => {
        if (clicked?.target?.length) {
            setCheckedItems([clicked.target[0]]);
        }
    }, [clicked?.target]);

    // text state를 props.values와 동기화
    useEffect(() => {
        if (!clicked) {
            setText("");
            return;
        }

        const val = values?.[clicked.key];
        if (typeof val === "string") setText(val);
        else if (Array.isArray(val)) setText(val.join(", "));
        else setText("");
    }, [values, clicked?.key, clicked]);

    // placeholder 계산
    const placeHolder = checkedItems.length
        ? `${checkedItems.map((item) => item.name).join(", ")}에서 검색합니다`
        : "검색하세요...";

    // 공통적으로 handle 호출
    const triggerHandle = useCallback(
        (currentText: string, currentChecked: Target[]) => {
            const obj = currentChecked.reduce<Record<string, string | undefined>>(
                (acc, item) => {
                    acc[item.key] = currentText;
                    return acc;
                },
                {}
            );

            obj["searchTxt"] = currentText;

            // unchecked 항목은 undefined로
            clicked?.target?.forEach((t) => {
                if (!currentChecked.some((item) => item.key === t.key)) {
                    obj[t.key] = undefined;
                }
            });

            handle?.("key", obj, clicked?.type);
        },
        [clicked, handle]
    );

    // input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // checkbox change
    const handleCheckboxChange = (t: Target, checked: boolean) => {
        setCheckedItems((prev) => {
            const newChecked = checked
                ? [...prev.filter((item) => item.key !== t.key), t]
                : prev.filter((item) => item.key !== t.key);

            triggerHandle(text, newChecked);
            return newChecked;
        });
    };

    // Enter key
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            triggerHandle(text, checkedItems);
        }
    };

    // Enter 버튼 클릭
    const onEnterClickHandler = () => {
        triggerHandle(text, checkedItems);
    };

    return (
        <div className="js-filter-righter" style={{ padding: "0 2rem", width: "340px" }}>
            <div style={{ position: "relative" }}>
                <input
                    className="js-filter-input-focus"
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
                    value={text}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="15px"
                    style={{
                        position: "absolute",
                        top: 7,
                        right: 7,
                        border: "1px solid #696969",
                        borderRadius: "2px",
                        padding: "1px 2px",
                        marginRight: "0.5rem",
                        cursor: "pointer",
                    }}
                    viewBox="2 2 20 20"
                    onClick={onEnterClickHandler}
                >
                    <path
                        fill="#696969"
                        d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"
                    />
                </svg>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    marginBottom: "3rem",
                }}
            >
                {clicked?.target?.map((item, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            style={{ marginRight: "0.5rem" }}
                            checked={checkedItems.includes(item)}
                            onChange={(ev) => handleCheckboxChange(item, ev.target.checked)}
                        />
                        <p style={{ margin: 0, fontSize: "14px" }}>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextSet;
