import React,{Component} from 'react';

import {IonIcon,IonLabel} from '@ionic/react';
import './IconLabel.css';

import icon_calendar from './icon/icon_calendar.svg';
import {DayOfWeek} from "./Options";

interface IconDateProps {
    style?:{};
    date:Date;
}

export default class IconDate extends Component<IconDateProps> {
    // DayOfWeek:string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    render(){
        let date:string;
        let d:Date = this.props.date;
        date = d.getFullYear()+'/'+(d.getMonth()+1) +'/' +d.getDate() +' '+ DayOfWeek[d.getDay()];

        return(
            <div className="qjs-icondate" style={this.props.style}>
                <IonIcon className={'icon'} src={icon_calendar}></IonIcon><IonLabel className={'label'}>{date}</IonLabel>
            </div>
        );
    };
}
