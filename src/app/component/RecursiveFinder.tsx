import {FC, useEffect, useMemo, useState} from "react";
import {SearchProps} from "../type/Types";
import {findAllParents, flattenTree} from "../hook/useFilterHandle";
import FinderSub from "./FinderSub";

const RecursiveFinder:FC<SearchProps> = (props)=>{
    const [clickLine, setClickLine] =useState<number[] | undefined>(undefined)
    const [left, setLeft] =useState<any[] | undefined>(undefined)
    const [center, setCenter] =useState<any[] | undefined>(undefined)
    const [right, setRight] =useState<any[] | undefined>(undefined)
    const flat = useMemo(() => flattenTree(props.data?.content), [props.data?.content]);

    useEffect(() => {
        setCenter([])
        setRight([])
    }, [props.data?.content]);

    const fistHandler =(el:any)=>{
        if(!clickLine?.includes(el.id)) setRight([])
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents, el.id])
        let parents = []
        let sibling = flat.filter(e => e.parentId === el.parentId)
        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                parents = flat.filter(e => e.parentId === parent.parentId)
                sibling = parent.children ?? []
                if(el.children){
                    setRight(el.children ?? [])
                }
            }
            else {
                parents = sibling
                sibling = el.children ?? []
            }
            setCenter(sibling)
            setLeft(parents)

        }else{

        }

    }

    const secondHandler =(el:any)=>{
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents, el.id])
        let parents = [];
        let sibling = flat.filter(e => e.parentId === el.parentId)
        let children =el.children ?? [];

        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                parents = flat.filter(e => e.parentId === parent.parentId)
                sibling = parent.children ?? []
            }else {
                parents = sibling
                sibling = el.children ?? []
            }
        }else{

        }
        setCenter(sibling)
        setLeft(parents)
        setRight(children)
    }

    const thirdHandler =(el:any)=>{
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents, el.id])
        let parents = left ?? [];
        let sibling = center ?? []
        let children = right ?? [];

        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                if(el.children){
                    parents = flat.filter(e => e.parentId === parent.parentId)
                    sibling = parent.children ?? []
                    children = el.children
                    setCenter(sibling)
                    setLeft(parents)
                    setRight(children)
                }else{

                }
            }
        }



    }

    useEffect(() => {
        setLeft(props?.data?.content)
    }, [props.data?.content]);


    const clickHandler =(v:any)=>{
        const query ={
            key: props.clicked?.key,
            id: v.id
        }
        // props.clicked?.data?.listener?.(query)
    }

    return (
        <div
            className={`js-filter-righter`}
            style={{ padding: "0 2rem", width: "340px"}}
        >
            {left?.map((el: any)=>{
                return(
                    <FinderSub el={el} belong={clickLine?.includes(el.id) } onClick={fistHandler} handle={(v:any)=>clickHandler(v)} />
                )
            })}
            {center && center?.map((el:any)=>{
                return(
                    <FinderSub el={el} belong={clickLine?.includes(el.id)} onClick={secondHandler}   handle={(v:any)=>clickHandler(v)} />
                )
            })}
            {right && right?.map((el:any)=>{
                return(
                    <FinderSub el={el} onClick={thirdHandler}   handle={(v:any)=>clickHandler(v)} />
                )
            })}
        </div>
    )
}
export default RecursiveFinder;