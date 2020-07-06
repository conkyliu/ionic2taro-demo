import React from 'react';

import { IonLabel, IonIcon, IonRow, IonCol, IonGrid, IonImg, IonText, IonAvatar } from '@ionic/react';
import icon_reply from './icon/list_icon_reply.svg'

import './QuestionItem.css';
import { DayOfWeek } from "./Options";
import IconLabel from "./IconLabel";

interface QuestionItemProps {
    style?: {}
    title: string;//回答
    content: string;
    ownerId?: string;
    ownerNickname?: string;
    ownerAvatarPic?: string;
    date: Date;//日期
    pics?: string[];
    StatusCode: number;
    readed: number;
    onClick?: Function;
    picClick?: Function;
}

export default class QuestionItem extends React.Component<QuestionItemProps> {

    render() {
        let picNumView = <span ></span>;
        let picCount = this.props.pics?.length ?? 0;
        if (picCount > 0) {
            picNumView = <IconLabel icon={require('./icon/list_icon_pic.svg')} label={(this.props.pics?.length ?? 0) + '/9'}></IconLabel>
        }
        let pics: any = [];
        if (this.props?.pics) {
            for (let i = 0; i < 3 && i < this.props.pics.length; i++) {
                if (i === 2 && this.props.pics.length > 3) {
                    pics.push(<IonCol size='4'  key={'item' + Math.random()} >
                        <div className='qustionimg' style={{ backgroundImage: 'url(' + this.props.pics[i] + ')' }} onClick={(e: any) => {
                            e.stopPropagation();
                            this.props.picClick?.call(this, null, i.valueOf());
                        }}></div>
                        <div className='moreImgText'>+{this.props.pics?.length - 3}</div></IonCol>)
                } else {
                    pics.push(<IonCol size='4'  key={'item' + Math.random()} >
                        <div onClick={(e: any) => {
                            e.stopPropagation();
                            this.props.picClick?.call(this, null, i.valueOf());
                        }}
                            className='qustionimg'
                            style={{ backgroundImage: 'url(' + this.props.pics[i] + ')' }}
                           ></div>
                    </IonCol>)
                }
            }
            if (this.props.pics.length < 3) {
                for (let i = 3; i > this.props.pics.length; i--) {
                    pics.push(<IonCol  key={'item' + Math.random()}  size='4'></IonCol>);
                }
            }
        }

        let date: string;
        let d: Date = this.props.date;
        date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + DayOfWeek[d.getDay()];
        let status = ['待回答', '已回答', '已解决', '已关闭'][this.props.StatusCode - 1]
        return (
            <IonGrid className="qjs-question-item" style={this.props.style} onClick={(e: any) => this.props.onClick?.call(this, null)}>
                <IonRow className={'row'}>
                    <IonCol className='ion-text-center' size='2'>
                        <IonAvatar style={{backgroundColor:'#eaeaea'}}>
                            <img src={this.props.ownerAvatarPic} />
                        </IonAvatar>
                        <IonText color='primary' style={{ overflow: "hidden", width: '100%', fontSize: '11px' }} title={this.props.ownerNickname ?? '某人'} >
                            {this.props.ownerNickname ?? '某人'}
                        </IonText>
                    </IonCol>
                    <IonCol style={{ paddingLeft: "12px" }}>
                        <h4 className={'title'} >{this.props.title}</h4>
                        <IonRow className={'daterow'}>
                            <IonCol size={"6"}>
                                <IconLabel label={date}></IconLabel>
                            </IonCol>
                            <IonCol>
                                {picNumView}
                            </IonCol>
                            <IonCol size='3'>
                                <IconLabel icon={icon_reply} label={status} style={{ color: this.props.readed === 1 ? '#FA7272' : '#5F5F5F' }}></IconLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow className={'content'}>
                            <IonCol>
                                {this.props.content}
                            </IonCol>
                        </IonRow>
                        <IonRow className='qjs-question-item-pics'>
                            {pics}
                        </IonRow>
                    </IonCol>
                </IonRow>

            </IonGrid>
        );
    };
}
