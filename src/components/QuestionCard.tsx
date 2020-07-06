import React from 'react';

import {IonLabel, IonCard, IonIcon, IonRow, IonCol, IonImg} from '@ionic/react';
import icon_question_q from './icon/question_cion_q.svg'
import icon_calendar from './icon/icon_calendar.svg'

import './QuestionCard.css';
import {DayOfWeek} from "./Options";

interface QuestionCardProps {
    style?:{}
    title:string;//回答
    content:string;
    date:Date;//日期
    pics?:string[];
    onClick?:Function
    picClick?:Function;
}

export default class QuestionCard extends React.Component<QuestionCardProps> {

    render(){
        let pics:any = [];
        if (this.props?.pics){
            for(let i=0;i<9&&i<this.props.pics.length;i++){
                pics.push(<IonCol key={'item'+Math.random()} size={"4.4"} className={'ion-no-margin ion-no-padding'}>
                    <IonImg key={'item'+Math.random()} src={this.props.pics[i]} onClick={(e:any)=>{
                    e.stopPropagation();
                    this.props.picClick?.call(this,null,i.valueOf());
                }}></IonImg></IonCol>)
            }
        }

        let date:string = '';
        if (this.props.date){
            let d:Date = this.props.date;
            date = d.getFullYear()+'/'+(d.getMonth()+1) +'/' +d.getDate() +' '+ DayOfWeek[d.getDay()];
        }
        return(
            <IonCard className="qjs-questioncard" style={this.props.style} onClick={(e:any)=>{this.props.onClick?.call(this,null)}}>
                <IonRow className={'row'}>
                    <IonIcon className={'icon'} src={icon_question_q}></IonIcon>
                    <IonLabel className={'title'} >{this.props.title}</IonLabel>
                </IonRow>
                <IonRow className={'daterow'}>
                    <IonIcon className={'dateicon'} src={icon_calendar}></IonIcon>
                    <IonLabel className={'content dateq'} style={{fontSize:'13px',fontWeight:400}}>{date}</IonLabel>
                </IonRow>
                <IonRow className={'content'}>
                    {this.props.content}
                </IonRow>
                <IonRow className={'pics'}>
                    {pics}
                </IonRow>
                {this.props.children}
            </IonCard>
        );
    };
}


