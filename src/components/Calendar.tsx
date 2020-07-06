import React from 'react';
import { IonCol, IonGrid, IonRow   } from '@ionic/react';
import CalendarCell from './CalendarCell';
import './Calendar.css';

export interface ITrainningSchedule {
    subject?: String;
    start: Date;
    end?: Date;
    index?: string;
    detail?: any;
    unpaid?: boolean;
}

export interface ITrainningPlan {
    /*
    type 计划类型： 0:None, 1 自助训练； 2 私教； 3 轻计划-训练课程；4 轻计划-休息日；5，轻计划-可延期日；
    */
    type: number;
    code?: String;
    schedule: Array<ITrainningSchedule>;
    scopeOfChangeing?: number;
}

/*
日历语言包
*/
export class CalendarLangPackage {
    lang: String | undefined;
    Months: Array<String> | undefined;
    DayOfWeek: Array<String> | undefined;
    Subject: Array<String> | undefined;
    HeadFontSize: number | undefined;
}

/*
自带中文语言包
*/
let langPackage_zh_CN: CalendarLangPackage = {
    lang: "zh-CN",
    Months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    DayOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    Subject: ['今日', '自助训练', '私教', '训练', '休息'],
    HeadFontSize: 18
};

/*
自带英文语言包
*/
let langPackage_en: CalendarLangPackage = {
    lang: "en",
    Months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    DayOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    Subject: ['Today', 'Self', 'P.T', 'Training', 'Rest'],
    HeadFontSize: 18
};

interface ICalendarProps {
    /*
    日历显示样式style
    simple  仅显示当前月的日期；
    normal  默认，显示所有日期,但非当前月不可用；
    */
    style?: String;
    year?: number;
    month?: number;
    // 1～12
    // 模式:'readonly'-只读,'single'-单选,'multiple'-多选，‘range'-范围选择；
    mode?: String | 'readonly' | 'single' | 'multiple' | 'range';
    //数据
    data?: Array<ITrainningPlan>;
    //可改签范围（天数)
    daysOfChanging?: number;
    //语言；
    lang?: String;
    //语言包；
    langPackage?: CalendarLangPackage;

    //单击事件；
    onClick?: Function;
    //月份变更事件；
    onMonthChanged?: Function;
    //禁用今天之前日期
    disabledBeforeToday?:boolean;
    //边框
    showBorder?:boolean;
    //隐藏头部
    hideHeader?:boolean;
    //是否透明
    translucent?:boolean;
}

interface ICalendarState {
    year: number;
    month: number;
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {

    langPackage: CalendarLangPackage | undefined;
    langCode: String | undefined;
    viewStype: String | undefined;
    mode: String | undefined;
    data: Array<ITrainningPlan> | undefined;
    dateDict :Map<number,any> | undefined;

    constructor(props: Readonly<ICalendarProps>) {

        super(props);
        let now = new Date();
        let yearVal = now.getFullYear();
        let monthVal = now.getMonth();

        if (this.props.year != null) {
            yearVal = this.props.year;
            if (yearVal < 1900 || yearVal > 9999) {
                yearVal = now.getFullYear();
            }
        }

        if (this.props.month != null) {
            monthVal = this.props.month - 1;
            if (monthVal < 0 || monthVal > 11) {
                monthVal = now.getMonth();
            }
        }

        this.state = { year: yearVal, month: monthVal };

        this.preMonthOnClick.bind(this);
        this.nextMonthOnClick.bind(this);
        this.nextMonthOnClick.bind(this);

    }

    onClick = (e: any, celldata: any) => {
        e.preventDefault();
        this.props.onClick?.call(null, celldata.data);
    }

    preMonthOnClick = (props: Readonly<ICalendarProps>, e: any) => {
        e.preventDefault();
        let preMonth = this.state.month - 1 < 0 ? 11 : this.state.month - 1;
        let preYear = this.state.month - 1 < 0 ? this.state.year - 1 : this.state.year;
        this.setState({ month: preMonth, year: preYear });
        this.props.onMonthChanged?.call(null, preYear, preMonth + 1);
    }

    nextMonthOnClick = (props: Readonly<ICalendarProps>, e: any) => {
        e.preventDefault();
        let preMonth = this.state.month + 1 > 11 ? 0 : this.state.month + 1;
        let preYear = this.state.month + 1 > 11 ? this.state.year + 1 : this.state.year;
        this.setState({ month: preMonth, year: preYear });
        this.props.onMonthChanged?.call(null, preYear, preMonth + 1);
    }

    render() {

        this.dateDict = new Map<number,any>();
        this.viewStype = this.props.style == null ? "normal" : this.props.style;
        this.langCode = this.props.lang ?? "zh-CN";
        this.langPackage = this.langCode === "zh-CN" ? langPackage_zh_CN : langPackage_en;
        this.mode = this.props.mode ?? 'readonly';
        this.data = this.props.data ?? new Array<ITrainningPlan>();

        if (this.props.langPackage != null) {
            this.langPackage = this.props.langPackage;
        }

        let now = new Date(new Date().toDateString());

        let yearVal = this.props.onMonthChanged == null ? this.state.year : (this.props.year ?? (new Date().getFullYear()));
        let monthVal = this.props.onMonthChanged == null ? this.state.month : (this.props.month == null ? new Date().getMonth() : this.props.month - 1);

        let firstDayOfMonth = new Date(yearVal, monthVal, 1);
        let dayOfFirstDay = firstDayOfMonth.getDay();
        let firstDate = new Date(firstDayOfMonth.valueOf() - 86400000 * (dayOfFirstDay));
        let nextMonth = monthVal + 1 > 11 ? 0 : monthVal + 1;
        let nextYear = monthVal + 1 > 11 ? yearVal + 1 : yearVal;
        let lastDayOfMonth = new Date(new Date(nextYear, nextMonth, 1).valueOf() - 86400000);
        let dayOfLastDay = lastDayOfMonth.getDay();
        let lastDate = new Date(lastDayOfMonth.valueOf() + 86400000 * (6 - dayOfLastDay));
        let currDate = firstDate;
        let weeksView = new Array<JSX.Element>();
        let weekDays: Array<Date> = new Array<Date>();
        let planDict = new Map<number, any>();

        /*
        处理计划数据
        */
        if (this.data != null) {
            this.data.forEach(plan => {
                let scheduleDateValues = new Array<number>();
                let scheduleMap = new Map<number, any>();
                plan.schedule.forEach(sitem => {
                    let sitemValue = sitem.start.valueOf();
                    scheduleDateValues.push(sitemValue);
                    scheduleMap.set(sitemValue, sitem);
                });
                let sortedSchedulValues = scheduleDateValues.sort();
                let hasPlanStartDay = false;
                for (var i = 0; i < sortedSchedulValues.length; i++) {

                    let schedule = scheduleMap.get(sortedSchedulValues[i]);
                    let baseStyle = 0;
                    let subjectCode = -1;
                    let position = 0;//0 起点；1 中间；2 结束；
                    let indexVals =  schedule.index ? schedule.index.split('/'):'1/1';
                    if(schedule.index?.indexOf('1/')===0){
                        hasPlanStartDay = true;
                    }
                    if(indexVals[0]==='1'){
                        position = 0;
                    }else if(indexVals[0]===indexVals[1]){
                        position = 2;
                    }else{
                        position = 1;
                    }

                    //type 计划类型： 1 自助训练； 2 私教； 3 轻计划-训练课程；
                    switch (plan.type) {
                        case 1:
                            baseStyle = 10;
                            subjectCode = 1;
                            break;
                        case 2:
                            baseStyle = 20;
                            subjectCode = 2;
                            break;
                        case 3:
                            subjectCode = 3;
                            switch (position) {
                                case 0:
                                    baseStyle = 1;
                                    break;
                                case 1:
                                    baseStyle = 2;
                                    break;
                                case 2:
                                    baseStyle = plan.scopeOfChangeing == null || plan.scopeOfChangeing === 0 ? 4 : 3;
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    let dateValue = (new Date(schedule.start.toDateString())).valueOf();
                    if (planDict.get(dateValue) === undefined) {
                        planDict.set(dateValue, {});
                    }
                    let dayData = planDict.get(dateValue);
                    dayData['styleCode'] = baseStyle;

                    //dayData['plan'] = plan;
                    if (this.langPackage != null) {
                        if (schedule.subject != null) {
                            dayData["subject"] = schedule.subject;
                        } else {
                            if (dateValue === now.valueOf()) {
                                subjectCode = 0;
                            }
                            dayData['subject'] = subjectCode >= 0 && this.langPackage.Subject != null ?
                                this.langPackage.Subject[subjectCode] : null;
                        }
                    }
                    dayData['expired'] = dateValue < now.valueOf();
                    dayData["date"] =  new Date(dateValue);
                    dayData['data'] = {...{
                        code: plan.code,
                        type: plan.type,
                        date: new Date(dateValue)
                    },...schedule};
                    this.dateDict?.set(dateValue.valueOf(),  dayData['data']) ;
                }
                let planexpired = false;
                if (plan.type === 3) {
                    let firstDayValue = new Date(new Date(sortedSchedulValues[0]).toDateString()).valueOf();
                    let lastDayValue = new Date(new Date(sortedSchedulValues[sortedSchedulValues.length - 1]).toDateString()).valueOf();
                    if( new Date(lastDayValue)<now){
                        planexpired = true;
                    }
                    for (let d = firstDayValue; d < lastDayValue; d = d + 86400000) {
                        let dayData = planDict.get(d);
                        let dayDate = new Date(d);
                        if (dayData != null || d === sortedSchedulValues[0]) {
                            //if(dayData["data"])
                            continue;
                        }
                        let preDay = planDict.get(d - 86400000);
                        let nextDay = planDict.get(d + 86400000);
                        let styleCode = 0;
                        if (preDay != null && (preDay["styleCode"] === 1 || preDay["styleCode"] === 2)
                            && nextDay != null && (nextDay["styleCode"] === 2 || nextDay["styleCode"] === 3 || nextDay["styleCode"] === 4)) {
                            styleCode = 50;
                        }
                        else if (preDay != null && (preDay["styleCode"] === 1 || preDay["styleCode"] === 2) && nextDay == null) {
                            styleCode = 51;
                        } else if (preDay != null && (preDay["styleCode"] === 51 || preDay["styleCode"] === 52) && nextDay == null) {
                            styleCode = 52;
                        } else if (nextDay != null && (nextDay["styleCode"] === 2 || nextDay["styleCode"] === 3 || nextDay["styleCode"] === 4)) {
                            styleCode = 53;
                        }
                        let restDay = {
                            styleCode: styleCode,
                            expired: d < now.valueOf(),
                            subject: (this.langPackage?.Subject != null ?
                                this.langPackage.Subject[4] : null),
                            data: { date:dayDate, type: 4, code: plan.code }
                        };
                        planDict.set(d, restDay);
                        this.dateDict?.set( d,  restDay.data) ;
                    }
                    if (planexpired === false && plan.scopeOfChangeing != null && plan.scopeOfChangeing !== 0) {
                        let lastChangeingDay = lastDayValue + 86400000 * plan.scopeOfChangeing;
                        for (let d = lastDayValue + 86400000; d <= lastChangeingDay; d = d + 86400000) {
                            let deferDay = {
                                styleCode: d === lastChangeingDay ? 31 : 30,
                                data: { date: new Date(d), type: 5, code: plan.code }
                            };
                            planDict.set(d, deferDay);
                            this.dateDict?.set(d, deferDay.data) ;
                        }
                    }
                    if(hasPlanStartDay===false){
                        let preFirstRestDay = firstDayOfMonth.valueOf();
                        for (let d = preFirstRestDay; d < firstDayValue; d = d + 86400000) {
                            let restDay = {
                                styleCode: d===preFirstRestDay?51:(d === firstDayValue - 86400000? 53 : 52),
                                subject: (this.langPackage?.Subject != null ?
                                    this.langPackage.Subject[4] : null),
                                data: { date: new Date(d), type: 4, code: plan.code }
                            };
                            planDict.set(d, restDay);
                            this.dateDict?.set(d, restDay.data) ;
                        }
                    }
                }
            });
        }
        /*
        生成日历日期单元格；
        */
        currDate = firstDate;
        while (currDate <= lastDate) {
            weekDays.push(currDate);
            if (currDate.getDay() === 6) {
                var wView = weekDays.map((dateItem) => {
                    let dayData = planDict.has(dateItem.valueOf()) ? planDict.get(dateItem.valueOf()) : null;
                    let expired = dayData == null ? 0 : dayData["expired"];
                    let unpaid =expired === true? false:(dayData== null?false:(dayData["data"] == null?false:dayData["data"]["unpaid"]));
                    let disabled = dateItem.getMonth() !== monthVal ;
                    let styleCode = dayData == null ? 0 : dayData["styleCode"];
                    if(styleCode === 3 && expired === true){
                        styleCode =4 ;
                    }
                    if(this.props.disabledBeforeToday === true && dateItem<now){
                        disabled = true;
                    }
                    if (this.viewStype === "simple" && dateItem.getMonth() !== monthVal) {
                        if(dateItem>lastDayOfMonth){
                            return (<CalendarCell key={dateItem.valueOf()}
                            disabled={true}></CalendarCell>);
                        }else{
                            return (<CalendarCell
                                key={dateItem.valueOf()}
                                disabled={disabled}
                                subject={dayData == null ? null : dayData["subject"]}
                                styleCode={styleCode}
                                expired={expired}
                                unpaid={unpaid}
                                onClick={this.props.onClick}
                                data={dayData ? dayData.data : { type: 0, date: dateItem }}
                            ></CalendarCell>);
                        }
                    } else {
                        return (<CalendarCell
                            value={dateItem}
                            key={dateItem.valueOf()}
                            disabled={disabled}
                            subject={dayData == null ? null : dayData["subject"]}
                            styleCode={styleCode}
                            expired={expired}
                            unpaid={unpaid}
                            onClick={this.props.onClick}
                            data={dayData ? dayData.data : { type: 0, date: dateItem }}
                        ></CalendarCell>);
                    }
                });
                weeksView.push(
                    <IonRow key={currDate.valueOf()}>
                        {wView}
                    </IonRow>);
                weekDays = new Array<Date>();
            }
            currDate = new Date(currDate.valueOf() + 86400000);
        }

        let borderClass = this.props.showBorder??true ? "bottomBorder":"noBorder";

        return (
            <div className="calendar" >
                <div className={borderClass}>
                <IonGrid >
                    <IonRow className="caldendar-head" hidden={this.props.hideHeader}>
                        <IonCol size="2" className="ion-text-right" onClick={(e) => this.preMonthOnClick(this.props, e)}> <span className="arrows"> {"<"} </span></IonCol>
                        <IonCol size="10" className="ion-text-center"> <span>{this.langPackage.Months != null ? this.langPackage.Months[monthVal] : (monthVal + 1).toString()}</span> </IonCol>
                        <IonCol size="2" className="ion-text-left" onClick={(e) => this.nextMonthOnClick(this.props, e)}><span className="arrows"> {">"}</span></IonCol>
                    </IonRow>
                    <IonRow className="ion-text-center dayofWeek" style={{ 'fontSize': this.langPackage.HeadFontSize == null ? '16Px' : this.langPackage.HeadFontSize.toString() + 'Px' }}>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[0] : '日'}</div></IonCol>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[1] : '一'}</div></IonCol>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[2] : '二'}</div></IonCol>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[3] : '三'}</div></IonCol>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[4] : '四'}</div></IonCol>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[5] : '五'}</div></IonCol>
                        <IonCol><div>{this.langPackage.DayOfWeek != null ? this.langPackage.DayOfWeek[6] : '六'}</div></IonCol>
                    </IonRow>
                    {weeksView}
                </IonGrid>
                </div>
            </div>
        )
    }
}


export default Calendar;
