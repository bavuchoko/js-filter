import {FC, useRef, useState} from "react";
import {ObjectType, SearchProps} from "../../type/Types";
import PeriodDateSet from "../PeriodDateSet";


const PeriodSet:FC<SearchProps> =(props)=>{

    type Period = {
        startOn?: Date;
        endBy?: Date;
    };
    const val = props.values?.[props.clicked?.key ?? ""] as Period | undefined;

    const labelRef = useRef<HTMLLabelElement>(null);

    const now = new Date();
    const [startViewYear, setStartViewYear] = useState(now.getFullYear());
    const [startViewMonth, setStartViewMonth] = useState(now.getMonth());
    const nextMonthDate = new Date(startViewYear, startViewMonth + 1);
    const [endViewYear, setEndViewYear] = useState(nextMonthDate.getFullYear());
    const [endViewMonth, setEndViewMonth] = useState(nextMonthDate.getMonth());

    const handleSelect = (date: Date) => {
        if (!props.clicked) return;
        // val이 없는 경우 대비
        const startOn = val?.startOn;
        const endBy = val?.endBy;

        let sDate: Date | undefined = startOn;
        let eDate: Date | undefined = endBy;

        // 1️⃣ 아직 아무 날짜도 없는 경우 → 시작일 설정
        if (!startOn && !endBy) {
            sDate = date;
            eDate = undefined;
        }
        // 2️⃣ 시작일만 있고 종료일은 없는 경우
        else if (startOn && !endBy) {
            if (date.getTime() < startOn.getTime()) {
                // 거꾸로 클릭 → 교체
                sDate = date;
                eDate = startOn;
            } else {
                sDate = startOn;
                eDate = date;
            }
        }
        // 3️⃣ 둘 다 있는 경우 → 초기화하고 새 시작일 지정
        else {
            sDate = date;
            eDate = undefined;
        }

        // ✅ 결과 전달
        props.handle?.(props.clicked.key, { startOn: sDate, endBy: eDate }, 'PERIOD');
    };

    const calendarRef =  useRef<HTMLDivElement>(null);




    return (
        <div style={{ flex: 1, display: 'flex', padding:'0 2rem', width:'680px',}}>
            <PeriodDateSet {...props} isStart={true} handleSelect={handleSelect}/>
            <PeriodDateSet {...props} isStart={false} handleSelect={handleSelect}/>
        </div>
    )
}
export default PeriodSet