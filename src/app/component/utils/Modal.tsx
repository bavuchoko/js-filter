import React, { FC, useEffect, useRef } from "react";
import { Condition, ModalProps } from "../../type/Types";
import Options from "./Options";
import Footer from "./Footer";
import ComponentAllocator from "../ComponentAllocator";

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                innerRef.current &&
                !innerRef.current.contains(event.target as Node)
            ) {
                props.close?.(); // useToggleModal에서 전달된 close 호출
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props]);

    useEffect(() => {
        if (!props.clicked && props.conditions?.length && props.setClicked) {
            props.setClicked(props.conditions[0]);
        }
    }, [props.clicked, props.conditions, props.setClicked]);

    const OptionHandler = (k: Condition) => {
        props.setClicked?.(k);
    };

    return (
        <div
            ref={(node) => {
                innerRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            style={{
                position: "absolute",
                top: "100%",
                zIndex: "100",
                height: "380px",
                marginTop: "-0.2rem",
                left: "0",
                border: "1px solid #e1e1e1",
                borderRadius: "4px",
                boxShadow:
                    "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 12px 0 rgba(0, 0, 0, 0.19)",
                ...props.style,
            }}
            className={props.className}
        >
            <div style={{ padding: "1.5rem 0", display: "flex", height: "calc(100% - 3.5rem)" }}>
                {props.conditions && (
                    <>
                        <Options
                            data={props.conditions}
                            clicked={props.clicked}
                            setClicked={(k) => OptionHandler(k)}
                            values={props.values}
                        />
                        <div style={{ borderRight: "1px solid #e1e1e1" }} />
                    </>
                )}

                <ComponentAllocator {...props} />
            </div>

            <Footer
                data={props.values}
                reset={props.reset}
                count={Object.keys(props.values ?? {}).length}
                message={props.message}
            />
        </div>
    );
});

export default Modal;
