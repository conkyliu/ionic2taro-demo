import React from 'react';
import {IonIcon} from '@ionic/react';

import './NumberLabelBar.css';
import NumberLabel, {DataBar} from "./NumberLabel";
import icon_ok from "./icon/train_btn_ok.svg";
import icon_cancel from "./icon/train_btn_cancel.svg";
import icon_time from './icon/icon_time.svg';
interface NumberLabelBarProps extends DataBar{
    onchange?:Function;
    onFocus?:Function;
    successClick?:Function;
    unsuccessClick?:Function;
    timeClick?:Function;
}

export default class NumberLabelBar extends React.Component<NumberLabelBarProps> {

    render(){
        //默认:#D2D2D2 ,完成:#5F5F5F ,未完成:#FA7272
        let finishColor = {color:'#D2D2D2'};
        let unfinishColor = {marginLeft:'2px',color:'#D2D2D2'};
        if (this.props.StatusCode!=null && this.props.StatusCode===2){
            finishColor = {color:'#5F5F5F'};
        }
        if (this.props.StatusCode!=null && this.props.StatusCode===3){
            unfinishColor = {marginLeft:'2px',color:'#FA7272'};
        }
        //用于占位
        let cancelButton =<div className={'item6'}>
            {/*<IonIcon className={'btn'} style={finishColor} src={icon_time}  onClick={(e)=>{this.props.successClick?.call(this,null,e);this.setState({})}}></IonIcon>*/}
            <IonIcon className={'btn'} style={finishColor} src={icon_ok}  onClick={(e)=>{e.preventDefault(); this.props.successClick?.call(this,null,e);this.setState({})}}></IonIcon>
            <IonIcon className={'btn'} style={unfinishColor} src={icon_cancel} onClick={(e)=>{e.preventDefault();this.props.unsuccessClick?.call(this,null,e);this.setState({})}}></IonIcon>
        </div>
        if (this.props.isTest!=null && this.props.isTest===true){
            cancelButton = <div className={'item6'}>
                <IonIcon className={'btn'} style={finishColor} src={icon_ok}  onClick={(e)=>{e.preventDefault();this.props.successClick?.call(this,null,e);this.setState({})}}></IonIcon>
                <div className={'btn'}></div>
            </div>
        }
        let indexstr;
        if (this.props.number){
            if (this.props?.isTest&&this.props?.StatusCode===1){
                indexstr = <div className={'item1'}>测</div>
            }else{
                indexstr = <div className={'item1'}>{this.props.number+'.'}</div>
            }
        }else{
            if (this.props?.isTest&&this.props?.StatusCode===1) {
                indexstr = <div className={'item1 '}>测</div>
            }
        }
        if (this.props.type===1){
            if (this.props.isTest===true){
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={true} inputtype={'numeric'} number={this.props.argCount} text={'次'} status={this.props.StatusCode} align={'right'} onFocus={(e:any)=>{this.props.onFocus?.call(null,e);}} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div key={'item'+Math.random()} className={'item3 '}>X</div>
                    <div key={'item'+Math.random()} className={'item5 '}><NumberLabel edit={false} inputtype={'text'} number={Math.round(this.props?.argKg??0)} text={'Kg'} status={this.props.StatusCode} align={'right'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    {cancelButton}
                </div>
            }else{
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argCount} text={'次'} status={this.props.StatusCode} align={'right'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div key={'item'+Math.random()} className={'item3 '}>X</div>
                    <div key={'item'+Math.random()} className={'item5 '}><NumberLabel edit={false} inputtype={'numeric'} number={Math.round(this.props?.argKg??0)} text={'Kg'} status={this.props.StatusCode} align={'right'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    {cancelButton}
                </div>
            }
        }else if (this.props.type===2){
            if (this.props.isTest===true){
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={true} inputtype={'numeric'} number={this.props.argSeconds} text={'秒'} status={this.props.StatusCode} align={'right'}  onFocus={(e:any)=>{this.props.onFocus?.call(null,e);}} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}></div>
                    <div className={'item5 '}></div>
                    {cancelButton}
                </div>

            }else{
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argSeconds} text={'秒'} status={this.props.StatusCode} align={'right'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}></div>
                    <div className={'item5 '}></div>
                    {cancelButton}
                </div>
            }
        }else if (this.props.type===3){
            if (this.props?.isTest==true){
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={true} inputtype={'numeric'} number={this.props.argCount} text={'次'} status={this.props.StatusCode} align={'right'} onFocus={(e:any)=>{this.props.onFocus?.call(null,e);}} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}></div>
                    <div className={'item5 '}><NumberLabel edit={false} inputtype={'text'} number={Math.round(this.props?.argSeconds??0)} text={'秒'} status={this.props.StatusCode} align={'right'}/></div>
                    {cancelButton}
                </div>
            }else{
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argCount} text={'次'} status={this.props.StatusCode} align={'right'}  onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}></div>
                    <div className={'item5 '}></div>
                    {cancelButton}
                </div>
            }
        }else if (this.props.type===4){//argDistance:路程/距离，客户端显示2位小数  ,argKPH:速度，小时公里数；客户端显示1位小数；
            if (this.props.isTest===true){
                let secord = this.props.argSeconds?Math.round((this.props?.argSeconds??0)/60):0;
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={true} inputtype={'decimal'} number={Math.round((this.props?.argDistance??0)*100)/100} text={'路程'} status={this.props.StatusCode} align={'top'}  onFocus={(e:any)=>{this.props.onFocus?.call(null,e);}}  onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argIncline} text={'坡度'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item5 '}><NumberLabel edit={false} inputtype={'text'} number={secord} text={'分钟'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    {cancelButton}
                </div>
            }else{
                let speed = Math.round((this.props?.argKPH??0.0)*10)/10;
                let secord = this.props.argSeconds?Math.round((this.props?.argSeconds??0)/60):0;
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={false} inputtype={'text'} number={speed} text={'匀速'} status={this.props.StatusCode} align={'top'}  onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argIncline} text={'坡度'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item5 '}><NumberLabel edit={false} inputtype={'text'} number={secord} text={'分钟'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    {cancelButton}
                </div>
            }

        }else if (this.props.type===5){
            if (this.props.isTest===true){
                let speed = Math.round((this.props?.argDistance??0.00)*100)/100;
                let secord = this.props.argSeconds?Math.round((this.props?.argSeconds??0)/60):0
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={true} inputtype={'decimal'} number={speed} text={'路程'} status={this.props.StatusCode} align={'top'}  onFocus={(e:any)=>{this.props.onFocus?.call(null,e);}}  onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argSpeedLevel} text={'阻力'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item4 '}><NumberLabel edit={false} inputtype={'text'} number={secord} text={'分钟'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item5 '}><IonIcon className={'btn'} style={{color:'#5F5F5F'}} src={icon_time}  onClick={(e)=>{this.props.timeClick?.call(this,null,e);}}></IonIcon></div>
                    {cancelButton}
                </div>
            }else{
                let speed = Math.round((this.props?.argKPH??0.0)*10)/10;
                let secord = this.props.argSeconds?Math.round((this.props?.argSeconds??0)/60):0
                return <div className={'qjs-numberlabelbar'}>
                    {indexstr}
                    <div className={'item2 '}><NumberLabel edit={false} inputtype={'decimal'} number={speed} text={'匀速'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item3 '}><NumberLabel edit={false} inputtype={'text'} number={this.props.argSpeedLevel} text={'阻力'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item4 '}><NumberLabel edit={false} inputtype={'text'} number={secord} text={'分钟'} status={this.props.StatusCode} align={'top'} onchange={(sender:any,e:any)=>this.props.onchange?.call(this,null,e)}/></div>
                    <div className={'item5 '}><IonIcon className={'btn'} style={{color:'#5F5F5F'}} src={icon_time}  onClick={(e)=>{this.props.timeClick?.call(this,null,e);}}></IonIcon></div>
                    {cancelButton}
                </div>
            }
        }
        return <></>
    }

}
