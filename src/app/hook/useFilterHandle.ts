import { useCallback, useState } from "react";
import {ObjectType, Type, ValueType} from "../type/Types";




export const useFilterHandle = (onValueChange?: (value: ValueType | undefined) => void, initialValues: (ValueType | undefined) = {}) => {
    const [values, setValue] = useState<ValueType | undefined>(initialValues);

    const multiToggle = (values: ValueType | undefined, key: string, val: number): ValueType | undefined => {
        if (!values) {
            return { [key]: [val] };
        }

        const currentVals = Array.isArray(values[key]) ? (values[key] as number[]) : [];
        const index = currentVals.indexOf(val);
        let newVals: number[];

        if (index === -1) {
            newVals = [...currentVals, val];
        } else {
            newVals = currentVals.filter(v => v !== val);
        }

        const newState = { ...values };
        if (newVals.length === 0) {
            delete newState[key];
        } else {
            newState[key] = newVals;
        }

        return Object.keys(newState).length === 0 ? undefined : newState;
    };


    const handleMulti = useCallback(
        (key: string, val: number) => {
            setValue(prev => {
                const newState = multiToggle(prev, key, val);
                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handleSingle = useCallback(
        (key: string, val: number ) => {
            setValue(prev => {
                let newState: ValueType | undefined;

                if (!prev || !(key in prev)) {
                    newState = { ...(prev ?? {}), [key]: [val] };
                } else {
                    const currentVals = Array.isArray(prev[key]) ? (prev[key] as number[]) : [];
                    if (currentVals.length === 1 && currentVals[0] === val) {
                        const clone = { ...prev };
                        delete clone[key];
                        newState = Object.keys(clone).length === 0 ? undefined : clone;
                    } else {
                        newState = { ...prev, [key]: [val] };
                    }
                }

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handleText = useCallback(
        (val: ObjectType) => {
            setValue(prev => {
                let newState: ValueType | undefined = prev ? { ...prev } : {};

                for (const [k, v] of Object.entries(val)) {
                    if (v === "" || v === undefined) {
                        if (newState && k in newState) {
                            delete newState[k];
                        }
                    } else {
                        if (typeof v === "string") {
                            newState = { ...(newState ?? {}), [k]: [v] as string[] };
                        } else if (typeof v === "number") {
                            newState = { ...(newState ?? {}), [k]: [v] as number[] };
                        } else {
                            newState = { ...(newState ?? {}), [k]: v };
                        }
                    }
                }

                if (newState && Object.keys(newState).length === 0) {
                    newState = undefined;
                }

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handleDate = useCallback(
        (key: string, val: ObjectType| undefined) => {
            setValue(prev => {
                let newState: ValueType | null;

                if (!prev) {
                    newState = {};
                } else {
                    newState = { ...prev };
                }
                if (val === undefined) {
                    delete newState[key];
                } else {
                    newState[key] = val;
                }

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );


    const removeDate = useCallback(
        (key: string, val: ObjectType| undefined) => {
            setValue(prev => {
                let newState: ValueType | null;

                if (!prev) {
                    newState = {};
                } else {
                    newState = { ...prev };
                }

                delete newState[key];

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handle = useCallback(
        (key: string , val: number | string | ObjectType | undefined, type?: Type) => {
            if (type === undefined ) {
                handleSingle(key, Number(val));
            } else if (type === 'ARRAY') {
                handleMulti(key, Number(val));
            } else if (type === 'DATE') {
                handleDate(key, (val as ObjectType));
            }else if(type === 'TEXT' && typeof val === 'object'){
                handleText(val);
            }
        },
        [handleSingle, handleMulti, handleDate]
    );


    const remove = useCallback(
        (key: string , val: number | string | ObjectType | undefined, type?:Type) => {
            if (type === undefined) {
                handleSingle(key, Number(val));
            } else if (type === 'ARRAY') {
                handleMulti(key, Number(val));
            } else if (type === 'DATE') {
                removeDate(key, (val as ObjectType));
            } else if(type === 'TEXT' && typeof val === 'object'){
                handleText(val);
            }
        },
        [handleSingle, handleMulti, handleDate]
    );

    const reset = useCallback(() => {
        setValue(undefined);
        if (onValueChange) onValueChange(undefined);
    }, [onValueChange]);

    return {
        values,
        handle,
        remove,
        reset,
    };
};
