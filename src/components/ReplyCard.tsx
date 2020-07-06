import React,{MouseEvent} from 'react';

import {IonLabel, IonCard, IonIcon, IonRow, IonButton, IonCol, IonImg} from '@ionic/react';
import icon_question_time from './icon/question_icon_time.svg'
import icon_reply_new from './icon/list_icon_reply.svg'
import icon_reply_a from './icon/question_icon_a.svg'
import icon_question_a from './icon/question_icon_q.svg'
import icon_reply from './icon/list_icon_solve.svg'

import './ReplyCard.css';
import {DayOfWeek} from "./Options";

interface ReplyCardProps {
    style?:{}
    type:number|1|2;//1=回答,2=追问
    pics?:string[];
    content:string;//回答
    date:Date;//日期
    coachNickname?:string;//回答人名称
    coachCert?:string;//回答人签名
    // StateCode?:number;//问题状态:1=未解决,2=已解决,3=已关闭
    onClick?:Function;
    picClick?:Function;
}

export default class ReplyCard extends React.Component<ReplyCardProps> {
//     signView.push(<IonRow className={'buttonrow'} key={'item'+Math.random()}>
// <IonCol>
// <IonButton className={'button'} fill={'outline'} shape={'round'}>已解决</IonButton>
// </IonCol>
// <IonCol>
// <IonButton className={'button'} fill={'outline'} shape={'round'}>继续追问</IonButton>
// </IonCol>
// </IonRow>
// )

    render(){
        let icon_title;
        if (this.props.type===1){
            icon_title = icon_reply_a;
        }else if (this.props.type===2) {
            icon_title = icon_question_a;
        }
        let signView = [];
        if (this.props.type===1){
            if (this.props?.coachNickname){
                signView.push(<IonRow className={'rowname'} key={'item'+Math.random()}>
                            <IonLabel>{this.props.coachNickname}</IonLabel>
                          </IonRow>)
            }
            if (this.props?.coachCert) {
                signView.push(<IonRow className={'rowsign'} key={'item' + Math.random()}>
                    <IonLabel>{this.props.coachCert}</IonLabel>
                </IonRow>)
            }
        }

        let pics:any = [];
        if (this.props?.pics){
            for(let i=0;i<9&&i<this.props.pics.length;i++){
                pics.push(<IonCol key={'item'+Math.random()} size={"4.4"} className={'ion-no-margin ion-no-padding'}> <IonImg src={this.props.pics[i]} onClick={(e:MouseEvent<HTMLIonIconElement>)=>{e.preventDefault();this.props.picClick?.call(this,null,i)}}></IonImg></IonCol>)
            }
        }
        let date:string;
        let d:Date = this.props.date;
        date = d.getFullYear()+'/'+(d.getMonth()+1) +'/' +d.getDate()+' '+ d.getHours()+':'+d.getMinutes() +' '+ DayOfWeek[d.getDay()];

        return(
            <IonCard className="reply-card" style={this.props.style} onClick={(e:any)=>{e.preventDefault();this.props.onClick?.call(this,null)}}>
                <IonRow className={'row'}>
                    <IonIcon className={'icon'} src={icon_title}></IonIcon>
                    <IonLabel className={'content'+this.props.type} >{this.props.content}</IonLabel>
                </IonRow>
                <IonRow className={'pics'}>
                    {pics}
                </IonRow>
                <IonRow className={'daterow'}>
                    <IonIcon className={'dateicon'} src={icon_question_time}></IonIcon>
                    <IonLabel className={'dateq'} style={{fontSize:'13px'}}>{date}</IonLabel>
                </IonRow>
                {signView}
                {this.props.children}
            </IonCard>
        )
    }
}


