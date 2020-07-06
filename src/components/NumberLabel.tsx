import React, {ChangeEvent} from 'react';

import './NumberLabel.css';
import {IonInput} from "@ionic/react";

interface NumberLabelProps{
    style?:{};
    edit:boolean;
    number?:number;
    inputtype:"decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" | undefined;
    text:string;
    status?:number;
    align:string|"top"|"left"|"right"|"buttom"
    onchange?:Function;
    onFocus?:Function;
}
export interface DataBar{
    trainingDetailDataId?:string;
    trainingDetailId?:string;
    trainingDayId?:string;
    name?:string;
    isTest?:boolean;
    type?:number;
    number?:number;
    argCount?:number;//       | 次数； |
    argSpeedLevel?:number;//| 阻力等级； |
    argKg?:number;//公斤数； |
    argSeconds?:number;//秒数； |
    argIncline?:number;//坡度
    argKPH?:number;//小时公里数； |
    argDistance?:number;//距离,路程
    StatusCode?:number;//状态；1,未开始；2，已完成；3，未完成； |
}
export default class NumberLabel extends React.Component<NumberLabelProps> {

    render(){
        let editstr;
        let color = '#525252';
        if (this.props.status===2){
            color = '#525252';
        }else if (this.props.status===3){
            color = '#FA7272';
        }
        if (this.props.edit===true&&this.props.status===1){
            editstr =
                <IonInput className={'ipt'}
                    style={{width:'50px'
                        ,background:'rgba(244,244,244,1)'
                        ,border:'0px'
                        ,textAlign:'center'
                        ,color:color}}
                          inputmode={this.props.inputtype}
                    value={this.props?.number?this.props.number:''}
                    onIonFocus={(e)=>{e.preventDefault();this.props.onFocus?.call(e,e);}}
                    onIonBlur={(e:any)=>{ e.preventDefault();this.props.onchange?.call(this,null,e);}}
                />
        }else{
            editstr = <div className={'ipt'} style={{color:color}}>{this.props.number}</div>
        }

        if (this.props.align==='top'){
            return <div className={'qjs-numberlabel'}>
                <div className={'label'}>{this.props.text}</div>
                {editstr}
            </div>
        }else if (this.props.align==='right'){
            return <div className={'qjs-numberlabel'} style={{display:'flex'}}>
                {editstr}
                <div className={'label'}>{this.props.text}</div>
            </div>
        }else if (this.props.align==='bottom'){
            return <div className={'qjs-numberlabel'}>
                {editstr}
                <div className={'label'}>{this.props.text}</div>
            </div>
        }
        return <div className={'qjs-numberlabel'} style={{display:'flex'}}>
            <div className={'label'}>{this.props.text}</div>
                {editstr}
            </div>
    }

}
