import {FC, useState} from "react";
import {SearchProps} from "../type/Types";
import {generateCalendar} from "../hook/useCalendar";


const DateSet:FC<SearchProps> =(props)=>{
    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());
    const [calendarType ,setCalendarType] = useState<'DATE'|'MONTH' |'YEAR'>('DATE')
    const [value, setValue] = useState<Date | undefined>(undefined);
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

    const handleSelect = (date: Date) => {
        setValue?.(date);
    };


    return (
        <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding:'0 2rem', width:'340px',}}>
                <div className="js-datepicker-calendar-header">
                    {/*<FontAwesomeIcon*/}
                    {/*    icon={['fas', 'arrow-left']}*/}
                    {/*    className={``}*/}
                    {/*    onClick={() => {*/}
                    {/*        if (calendarType === 'MONTH') {*/}
                    {/*            setViewYear((y) => y - 1);*/}
                    {/*        } else {*/}
                    {/*            setViewMonth((m) => (m === 0 ? 11 : m - 1));*/}
                    {/*            setViewYear((y) => (viewMonth === 0 ? y - 1 : y));*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <span className="js-datepicker-calendar-month"
                          onClick={() => setCalendarType('MONTH')}
                    >
                {calendarType ==='MONTH' && <>  {viewYear} </> }
                        {calendarType ==='DATE' && <> {months[lang][viewMonth]} {viewYear} </> }

                </span>
                    {/*<FontAwesomeIcon*/}
                    {/*    icon={['fas', 'arrow-right']}*/}
                    {/*    className={``}*/}
                    {/*    onClick={() => {*/}
                    {/*        if (calendarType === 'MONTH') {*/}
                    {/*            setViewYear((y) => y + 1);*/}
                    {/*        } else {*/}
                    {/*            setViewMonth((m) => (m === 11 ? 0 : m + 1));*/}
                    {/*            setViewYear((y) => (viewMonth === 11 ? y + 1 : y));*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*/>*/}
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
            </div>
        </>
    )
}
export default DateSet;