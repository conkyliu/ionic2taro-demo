import React from 'react';
import { IonCol, IonText } from '@ionic/react';
import './CalendarCell.css';

interface ICalenderCellProps {

    value?: Date;
    subject?: String;

    /*
    planType 
       0 无；1 训练计划开始；2 训练计划结束日； 3 训练计划过程日 ；4 训练计划结束日-无改签；
       30 可改签日-开始；31 可改签日-过程；32 可改签日-结束；
       10 自助训练日； 20 私教；
       50 休息日；51 休息日-开始； 52 休息日-过程；53 休息日-结束；
   */

    styleCode?: number;
    disabled?: boolean;
    expired?: boolean;
    unpaid?: boolean;
    onClick?: Function;
    data?: object;
}


class CalendarCell extends React.Component<ICalenderCellProps> {

    constructor(props: Readonly<ICalenderCellProps>) {

        super(props);
        this.handleClick.bind(this);

    }

    handleClick(props: Readonly<ICalenderCellProps>, event: any) {
        event.preventDefault();
        if (props.disabled === true) {
            return;
        }
        if (props.onClick != null) {
            props.onClick.call(this, props.data);
        }
    }

    render() {


        let now = new Date();
        let cellBaseClass = '';
        let daynumClass = '';
        let daynumBgClass = '';
        let daynumBgClass2 = '';
        let subjectClass = '';
        let styleCode = 0;
        let dayOfMonth = this.props.value == null ? 0 : this.props.value.getDate();
        let isToday = false;

        if (this.props.styleCode != null) {
            styleCode = this.props.styleCode;
        }
        //console.log("props.styleCode:"+ this.props.styleCode?.toString()+" styleCode:"+styleCode.toString() );
        switch (styleCode) {
            case 20:
                daynumClass += " personalTraining";
                break;
            case 1:
                daynumBgClass += " plan-training-start";
                daynumClass += " plan-training-text";
                break;
            case 2:
                daynumBgClass += " plan-training-mid";
                daynumClass += " plan-training-text";
                break;
            case 3:
                daynumBgClass += " plan-training-end";
                daynumClass += " plan-training-text";
                break;
            case 4:
                daynumBgClass += " plan-training-end";
                daynumClass += " plan-training-text";
                break;

            case 30:
                daynumBgClass += " plan-defer-mid";
                break;
            case 31:
                daynumBgClass += " plan-defer-end";
                break;
            case 50:
                daynumBgClass += " plan-rest";
                break;
            case 51:
                daynumBgClass += " plan-rest-start";
                break;
            case 52:
                daynumBgClass += " plan-rest-mid";
                break;
            case 53:
                daynumBgClass += " plan-rest-end";
                break;
            default:
                break;
        }

        if (styleCode >= 50 && styleCode < 55) {
            subjectClass += " plan-rest-text";
        }


        let expired = this.props.expired != null ? this.props.expired === true : (this.props.value == null ? false : this.props.value < now);

        if (expired === true) {
            subjectClass += " expired";

            switch (styleCode) {
                case 1:
                case 2:
                case 3:
                case 4:
                    daynumBgClass += " plan-expired";
                    break;
                case 20:
                    daynumClass += " plan-rest-expired";
                    break;
                case 50:
                case 51:
                case 52:
                case 53:
                    daynumBgClass += " plan-rest-expired";
                    break;
            }
        }


        if (this.props.disabled != null && this.props.disabled === true) {
            daynumBgClass += " disabled";
            daynumClass += " disabled";
        }

        if (this.props.unpaid != null && this.props.unpaid === true
            && (this.props.expired == null || this.props.expired === false)
            && [1, 2, 3, 4].indexOf(styleCode) >= 0) {
            subjectClass += " unpaid-subject";
        }

        if (this.props.value != null && (now.toDateString() === this.props.value.toDateString())) {
            isToday = true;
            cellBaseClass += " calendarcell-today";
            daynumClass += " calendarcell-today";
            subjectClass += " calendarcell-today";
        } else {
            cellBaseClass += " none-bg";
        }


        return (

            <IonCol size="2" className="calendarcell ion-text-center" onClick={(e) => this.handleClick(this.props, e)}>
                <div className={cellBaseClass}>

                    <div className='dayNum'>
                        <IonText className={daynumClass}>{dayOfMonth === 0 ? <IonText>&nbsp;</IonText> : dayOfMonth.toString()}</IonText>
                    </div>
                    
                    <div className={daynumBgClass}></div>
                    <div className="subject">
                        <span className={subjectClass}>
                            {this.props.subject == null ? <span>&nbsp;</span> : this.props.subject}
                        </span>
                    </div>
                </div>
                <div hidden={this.props.unpaid !== true} className='unpaid'><IonText color='danger'><b>.</b></IonText></div>
            </IonCol>

        )
    }
}

export default CalendarCell;