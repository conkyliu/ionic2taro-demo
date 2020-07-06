import React from 'react';

import {IonCard,IonIcon} from '@ionic/react';
import './PlanCardRate.css';

import icon_lock from './icon/icon_lock.svg';
import icon_start from './icon/list_icon_start.svg';
import icon_unfinished from './icon/list_icon_unfinished.svg';
import icon_finish from './icon/list_icon_finish.svg';
import ScaleBar from "./ScaleBar";

interface PlanCardRateProps extends RateItem{
    style?:{}
    onClick?:Function;
}
export interface RateItem{
    image:string;//计划图片
    name:string;//计划名称
    teamNo:number;//第几组
    // scale:number;
    finish:number;
    unfinish:number;
    tags?:string;//标签
    // rate:number;//进度
    state:number;//状态
    memo?:string;//备注
}
interface PlanCardRateState {
}

export default class PlanCardRate extends React.Component<PlanCardRateProps,PlanCardRateState> {
    // * 状态；0，待准备 ； 1,未开始；2，已完成；3，未完成；
    showStatus(){
        if (this.props.state===0){
            return icon_lock;
        } else if (this.props.state===1){
            return icon_start;
        } else if (this.props.state===2){
            return icon_finish;
        } else if (this.props.state===3){
            return icon_unfinished;
        }
        return icon_start;
    }
    onClick(){
        this.props.onClick?.call(this,null,this.props.state)
    }
    render(){
        return(
            <IonCard className="qjs-cardrate" style={this.props.style}  onClick={(e)=>
            {
                e.preventDefault();
                this.onClick();
            }}>
                <div className={'left'}><div className={'img'} style={{backgroundImage: `url(${this.props.image})`}}></div></div>
                <div className={'middle'}>
                    <div className={'namerow'}><div className={'left text1'}>{this.props.name}</div><div className={'tag text1'}>{this.props.tags}</div></div>
                    <div className={'team'}>{this.props.teamNo}组</div>
                    <div className={'raterow'}>
                        <ScaleBar scale={this.props.teamNo} finish={this.props.finish} unfinish={this.props.unfinish}></ScaleBar>
                    </div>
                    <div className={'memo text1'}>{this.props.memo}</div>
                </div>
                <div className={'right'}>
                    <IonIcon src={this.showStatus()} style={{width:'22px',height:'22px'}}></IonIcon>
                </div>
            </IonCard>
        );
    };
}
