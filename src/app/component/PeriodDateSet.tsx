import {FC, useEffect, useState} from "react";
import {SearchProps} from "../type/Types";
import {generateCalendar} from "../hook/useCalendar";
import ChevronRight from "./svg/ChevronRight";
import ChevronLeft from "./svg/ChevronLeft";
import "../../calendar.css"

type PeriodType = SearchProps & {
    isStart:boolean;
    handleSelect: (date: Date | undefined) => void;
}

type DateRange = {
    startOn?: Date;
    endBy?: Date;
};

const PeriodDateSet:FC<PeriodType> =(props)=>{
    const now = new Date();


    const [viewYear, setViewYear] = useState(() => {
        return props.isStart ? now.getFullYear() : (now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear());
    });

    const [viewMonth, setViewMonth] = useState(() => {
        return props.isStart ? now.getMonth() : (now.getMonth() === 11 ? 0 : now.getMonth() + 1);
    })
    const [calendarType ,setCalendarType] = useState<'DATE'|'MONTH' |'YEAR'>('DATE')

    const initialValue =
        props.clicked?.key && props.values?.[props.clicked.key]
            ? (props.values[props.clicked.key] as DateRange)
            : undefined;

    const [value, setValue] = useState<DateRange | undefined>(initialValue);

    // ✅ props.values가 바뀔 때마다 동기화 (부모가 외부에서 업데이트할 수도 있음)
    useEffect(() => {
        if (!props.clicked?.key) return;

        const currentRange = props.values?.[props.clicked.key] as DateRange | undefined;
        if (currentRange) {
            // value와 비교 후 업데이트
            if (
                !value ||
                value.startOn?.toDateString() !== currentRange.startOn?.toDateString() ||
                value.endBy?.toDateString() !== currentRange.endBy?.toDateString()
            ) {
                setValue(currentRange);
            }
        } else {
            setValue(undefined);
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


    return (
        <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding:'0 2rem', width:'340px',}}>
            {/* 요일 */}
                <div className="js-datepicker-calendar-header">
                    <ChevronLeft
                        onClick={() => {
                            if (calendarType === 'MONTH') {
                                setViewYear((y) => y - 1);
                            } else {
                                setViewMonth((m) => (m === 11 ? 0 : m - 1));
                                setViewYear((y) => (viewMonth === 11 ? y - 1 : y));
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
                    {days.map((day, idx) => {
                        if (!day) return <div key={idx} />;

                        const isToday =
                            now?.getFullYear() === day.getFullYear() &&
                            now?.getMonth() === day.getMonth() &&
                            now?.getDate() === day.getDate();

                        const isStart =
                            value?.startOn &&
                            day.toDateString() === value.startOn.toDateString();

                        const isEnd =
                            value?.endBy &&
                            day.toDateString() === value.endBy.toDateString();

                        let inRange = false;
                        if (value?.startOn && value.endBy) {
                            const t = day.getTime();
                            inRange =
                                t >= value.startOn.getTime() &&
                                t <= value.endBy.getTime();
                        }


                        return (
                            <div
                                key={idx}
                                onClick={() => props.handleSelect(day)}
                                className={`
                                ${inRange ? "js-datepicker-inRange " : ""}
                                ${isStart || isEnd ? "js-datepicker-selected-inRange" : ""}
                                ${isStart ? "js-datepicker-selected-start" : ""}
                                ${isEnd ? "js-datepicker-selected-end" : ""}
                                `}
                            >
                                <div className={`js-datepicker-calendar-date js-datepicker-date-${weekdays["en"][idx % 7]}
                                ${isToday ? "js-datepicker-today" : ""}
                                ${isStart ? "js-datepicker-selected" : ""}
                                ${isEnd ? "js-datepicker-selected" : ""}
                                js-datepicker-date-${day.getDate()}
                                `}>
                                    {day.getDate()}
                                </div>

                            </div>
                        );
                    })}
                </div>
                {props.clicked?.key && props.values?.[props.clicked.key] && props.isStart &&
                    <div style={{height:'30px', width:'20px', marginTop:'auto', cursor:'pointer', fontSize:'13px', color:'#5d5dd3', fontWeight:'bold'}} onClick={()=>props.handleSelect(undefined)}>clear</div>
                }
            </div>
        </>
    )
}
export default PeriodDateSet;