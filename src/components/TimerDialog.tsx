import React, {CSSProperties} from 'react';

import './TimerDialog.css';
import {
    IonButton,
    IonIcon,
    IonRow
} from "@ionic/react";
import icon_setting from '../components/icon/timing_btn_setup.svg';
import icon_close from '../components/icon/timing_btn_shrink.svg';
import icon_reload_disable from '../components/icon/timing_btn_reset_disable.svg';
import icon_reload from '../components/icon/timing_btn_reset.svg';
import icon_play from '../components/icon/timing_btn_start.svg';
import icon_pause from '../components/icon/timing_btn_pause.svg';
import icon_return from '../components/icon/set_btn_return.svg';

import TimePicker from "./TimePicker";

interface TimerDialogProps {
    style?:CSSProperties
    type:string |'team'|'action'|'motion';
    show:boolean;
    time:string;
    pause:boolean;
    teamTime?:string;
    actionTime?:string;
    motionTime?:string;
    closeClick?:Function;
    resetClick?:Function;
    pauseClick?:Function;
    saveClick?:Function;
}
interface TimerDialogState {
    setting:boolean;
}
export default class TimerDialog extends React.Component<TimerDialogProps,TimerDialogState> {
    changeTime:any;
    constructor(props: TimerDialogProps, context: any) {
        super(props, context);
        this.state = {setting:false};
    }

    setting(){
        this.setState({setting:!this.state.setting});
    }
    private resetClick() {
        if (this.props.pause===true){
            this.props.resetClick?.call(this,null)
        }
    }

    render(){
        if (this.props.show===false) {
            return <></>
        }

        let title ='组间休息';
        if (this.props.type==='team'){
            title ='组间休息';
        }else if (this.props.type==='action'){
            title ='动作间休息';
        }else if (this.props.type==='motion'){
            title ='运动计时';
        }
        let iconPlay = icon_play;
        let iconReload = icon_reload;
        if (this.props.pause===true) {
            iconPlay = icon_play;
            iconReload = icon_reload;
        }else if (this.props.pause===false){
            iconPlay = icon_pause;
            iconReload = icon_reload_disable;
        }

        if (this.state.setting){
            return <div className={'qjs-timer-dialog'}>
                <div className={'body'}>
                    <div className={'header'}>
                        <IonIcon className={'icon'} src={icon_return} onClick={(e)=>this.setting()}></IonIcon>
                        <div className={'title'}>设置默认时间</div>
                        <div></div>
                    </div>
                    <div className={'content'}>
                        <TimePicker teamTime={this.props?.teamTime??'00:00:00'} actionTime={this.props?.actionTime??'00:00:00'} type={"minute"} onChange={(sender:any,value:any)=>{this.changeTime = value}}></TimePicker>
                    </div>
                    <IonRow>
                        <IonButton className={'qjs-button'} fill={'clear'} shape={'round'} onClick={(e)=>{if (this.changeTime==null){ return;} this.props.saveClick?.call(this,null,this.changeTime)}} >确定修改</IonButton>
                    </IonRow>
                </div>
            </div>
        }else{
            return <div className={'qjs-timer-dialog'}>
                <div className={'body'}>
                    <div className={'header'}>
                        <IonIcon className={'icon'} src={icon_setting} onClick={(e)=> {
                            e.preventDefault();
                            //this.setting()
                        }}></IonIcon>
                        <div className={'title'}>计时器</div>
                        <IonIcon className={'icon'} src={icon_close} onClick={(e)=>{
                            e.preventDefault();
                            this.props.closeClick?.call(this,null);
                        }
                        }></IonIcon>
                    </div>
                    <div className={'round'}>
                        <div>
                            <div>{title}</div>
                            <div>{this.props.time}</div>
                        </div>
                    </div>
                    <div className={'bottom'}>
                        <IonIcon className={'icon'} src={iconReload} onClick={(e)=>this.resetClick()}></IonIcon>
                        <div className={'title'}></div>
                        <IonIcon className={'icon'} src={iconPlay} onClick={(e)=>this.props.pauseClick?.call(this,null)}></IonIcon>
                    </div>
                </div>
            </div>
        }
    };

}

