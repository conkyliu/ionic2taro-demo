import React from 'react';
import {IonCard,IonIcon} from '@ionic/react';

import IconLabel from "./IconLabel";
import start from './icon/btn_start.svg';
import add from './icon/btn_add.svg';
import checkmark from './icon/btn_finsh.svg';

import './PlanCardAction.css';

interface PlanCardProps {
    style?:{}
    name:string;
    date:Date;
    title:string;
    subtitle:string;
    toUrl?:string;
    mode:string |'add' | 'start' | 'finish'|'none';
    onClick?:Function;
}

interface PlanCardState {

}

export default class PlanCardAction extends React.Component<PlanCardProps,PlanCardState> {
    DayOfWeek:string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    render(){
        let date:string;
        let d:Date = this.props.date;
        date = d.getFullYear()+'/'+(d.getMonth()+1) +'/' +d.getDate() +' '+ this.DayOfWeek[d.getDay()];

        let icon:string = start;
        let desc:string = '开始训练';

        if (this.props.mode==='add'){
            icon = add;
            desc = '添加新计划';
        }else if (this.props.mode==='finish'){
            icon = checkmark;
            desc = '完成训练';
        }else if (this.props.mode==='start'){
            icon = start;
            desc = '开始训练';
        }

        return(
            <IonCard className="qjs-card" style={this.props.style}>
                <div className={'left'}>
                    <div className="name">{this.props.name}</div>
                    <div className="date">
                        <IconLabel label={date}></IconLabel>
                    </div>
                    <div className="title">{this.props.title}</div>
                    <div className="subtitle">{this.props.subtitle}</div>
                </div>
                <div className={'right'}>
                    <div className={'btn-comp'} style={this.props.mode==='none'?{display:'none'}:{}} onClick={(e)=>
                        {
                            e.preventDefault();
                            this.props.onClick?.call(this,this.props.mode);
                        }}>
                        <div>
                            <div style={{justifyContent:'center',alignItems:'center'}}><IonIcon src={icon} style={{width:'20px',height:'20px'}}></IonIcon></div>
                            <div className={"btn-plan"} style={{justifyContent:'center',alignItems:'center',fontSize:'12px'}}
                            >{desc}</div>
                        </div>
                    </div>
                </div>
            </IonCard>
        );
    };
}
