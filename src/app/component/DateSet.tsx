import {FC, useEffect, useState} from "react";
import {SearchProps} from "../type/Types";
import {generateCalendar} from "../hook/useCalendar";
import ChevronRight from "./svg/ChevronRight";
import ChevronLeft from "./svg/ChevronLeft";
import "../../calendar.css"

const DateSet:FC<SearchProps> =(props)=>{
    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());
    const [calendarType ,setCalendarType] = useState<'DATE'|'MONTH' |'YEAR'>('DATE')
    const initialValue =
        props.clicked?.key && props.values?.[props.clicked.key]
            ? new Date(props.values[props.clicked.key] as string)
            : undefined;

    const [value, setValue] = useState<Date | undefined>(initialValue);

    // ✅ props.values가 바뀔 때마다 동기화 (부모가 외부에서 업데이트할 수도 있음)
    useEffect(() => {
        if (props.clicked?.key) {
            const newVal = props.values?.[props.clicked.key];
            if (newVal) {
                const dateVal = new Date(newVal as string);
                if (!value || value.toDateString() !== dateVal.toDateString()) {
                    setValue(dateVal);
                }
            } else {
                setValue(undefined);
            }
        }
    }, [props.values, props.clicked?.key]);

    const days = generateCalendar(viewYear, viewMonth);
    const weekdays = {
        en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        kr: ["일", "월", "화", "수", "목", "금", "토"],
    };

    const months = {
        en: [
            "January ", "February ", "March ", "April ", "May ", "June ",
            "July ", "August ", "September ", "October ", "November ", "December "
        ],
        kr: [
            "1월 ", "2월 ", "3월 ", "4월 ", "5월 ", "6월 ",
            "7월 ", "8월 ", "9월 ", "10월 ", "11월 ", "12월 "
        ],
    };

    const lang ='kr'

    const handleSelect = (date: Date | undefined) => {
        console.log(props.clicked?.type)
        setValue?.(date);
        if(props.clicked)  props.handle?.(props.clicked?.key , date, 'DATE')
    };


    return (
        <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding:'0 2rem', width:'340px',}}>
                <div className="js-datepicker-calendar-header">
                    <ChevronLeft
                        onClick={() => {
                            if (calendarType === 'MONTH') {
                                setViewYear((y) => y + 1);
                            } else {
                                setViewMonth((m) => (m === 11 ? 0 : m + 1));
                                setViewYear((y) => (viewMonth === 11 ? y + 1 : y));
                            }
                        }}
                    />
                    <span className="js-datepicker-calendar-month"
                          onClick={() => setCalendarType('MONTH')}
                    >
                {calendarType ==='MONTH' && <>  {viewYear} </> }
                        {calendarType ==='DATE' && <> {months[lang][viewMonth]} {viewYear} </> }

                </span>
                    <ChevronRight
                            onClick={() => {
                                if (calendarType === 'MONTH') {
                                    setViewYear((y) => y + 1);
                                } else {
                                    setViewMonth((m) => (m === 11 ? 0 : m + 1));
                                    setViewYear((y) => (viewMonth === 11 ? y + 1 : y));
                                }
                            }}
                    />
                </div>
                {calendarType ==='DATE' &&
                    <>
                    <div className="js-datepicker-calendar-days">
                        {weekdays[lang].map((day, idx) => (
                            <div
                                key={day}
                                className={
                                    idx === 0
                                        ? "js-datepicker-sunday"
                                        : idx === 6
                                            ? "js-datepicker-saturday"
                                            : ''
                                }
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* 날짜 */}
                    <div className="js-datepicker-calendar-days">
                        {days.map((day, idx) =>
                            day ? (
                                (() => {
                                    const isToday =
                                        now?.getFullYear() === day.getFullYear() &&
                                        now?.getMonth() === day.getMonth() &&
                                        now?.getDate() === day.getDate();

                                    const isSelected =
                                        value &&
                                        day.toDateString() === value.toDateString();

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => handleSelect(day)}
                                            className={`js-datepicker-calendar-date js-datepicker-date-${weekdays['en'][idx % 7]}  
                                ${isToday ? "js-datepicker-today" : ""}                         
                                js-datepicker-date-${day.getDate()} 
                                ${isSelected ? "js-datepicker-selected" : ""} 
                            `}
                                        >
                                            {day.getDate()}
                                        </div>
                                    );
                                })()
                            ) : (
                                <div key={idx} />
                            )
                        )}
                    </div>
                    </>
                }
                {calendarType ==='MONTH' &&
                    <div className="js-datepicker-month-picker" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", marginTop: "8px" }}>
                        {months[lang].map((m, idx) => (
                            <div
                                key={idx}
                                className={`months`}
                                onClick={() => {
                                    setViewMonth(() => idx);
                                    setCalendarType('DATE');
                                }}
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                }
                {props.clicked?.key && props.values?.[props.clicked.key] &&
                    <div style={{height:'30px', width:'20px', marginTop:'auto', cursor:'pointer', fontSize:'13px', color:'#5d5dd3', fontWeight:'bold'}} onClick={()=>handleSelect(undefined)}>clear</div>
                }
            </div>
        </>
    )
}
export default DateSet;