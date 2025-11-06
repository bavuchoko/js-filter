import {FC, useEffect, useMemo, useState} from "react";
import {SearchProps} from "../type/Types";
import {findAllParents, flattenTree} from "../hook/useFilterHandle";
import FinderSub from "./FinderSub";

const RecursiveSet:FC<SearchProps> = (props)=>{
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
        setClickLine([...myParents.map(p => p.id), el.id]);
        props.setMessage?.([...myParents.map(p => p.name), el.name].join(' > '));
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
            setLeft(sibling)
            setCenter(el.children)
        }

    }

    const secondHandler =(el:any)=>{
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents.map(p => p.id), el.id]);
        props.setMessage?.([...myParents.map(p => p.name), el.name].join(' > '));
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
        setClickLine([...myParents.map(p => p.id), el.id]);
        props.setMessage?.([...myParents.map(p => p.name), el.name].join(' > '));
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
        if(props.clicked)  props.handle?.(props.clicked?.key , v, props.clicked.type)
    }

    return (
        <div
            className={`js-filter-righter `}
            style={{ display: "grid",
                minWidth:'540px',
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",}}
        >
            <div style={{
                width:'180px',
                height: '100%',
                overflow: 'auto',
                borderRight:'1px solid rgb(225, 225, 225)'
            }}
            >
                {left?.map((el: any) => {
                    return (
                        <FinderSub key={el.id} values={props.values} clicked={props.clicked} el={el} belong={clickLine?.includes(el.id)} doubleClick={fistHandler}
                                   onClick={(v: any) => clickHandler(v)}/>
                    )
                })}
            </div>
            <div style={{
                width: '180px',
                height: '100%',
                overflow: 'auto',
                borderRight:'1px solid rgb(225, 225, 225)',

            }}
            >
                {center && center?.map((el: any) => {
                    return (
                        <FinderSub key={el.id}  values={props.values} clicked={props.clicked} el={el} belong={clickLine?.includes(el.id)} doubleClick={secondHandler}
                                   onClick={(v: any) => clickHandler(v)}/>
                    )
                })}
            </div>
            <div style={{
                width: '180px',
                height: '100%',
                overflow: 'auto',
            }}
            >
                {right && right?.map((el: any) => {
                    return (
                        <FinderSub key={el.id}  values={props.values} clicked={props.clicked} el={el} doubleClick={thirdHandler} onClick={(v: any) => clickHandler(v)}/>
                    )
                })}
            </div>
        </div>
    )
}
export default RecursiveSet;