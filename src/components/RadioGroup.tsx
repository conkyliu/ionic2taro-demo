import React, {CSSProperties, MouseEvent} from 'react';

import './RadioGroup.css';
import {IonButton, IonRow, IonCol} from "@ionic/react";
import {OptionItem} from "./Options";

interface RadioGroupProps {
    style?:CSSProperties
    items:OptionItem[];
    maxSelect?:number;
    multiSelect:boolean;
    repelValue?:String;//排斥选择,如果选择这个数,则其他全部==false
    onSelect?:Function;
    normalColor?:string;
    selectedColor?:string;
    normalTextColor?:string;
    selectedTextColor?:string;
    marginTop?:string;
}

export default class RadioGroup extends React.Component<RadioGroupProps> {

    onSelect(e:MouseEvent<HTMLIonButtonElement>,index:number){
        let repelIndex:number |undefined|null;
        for(let i=0;i<this.props.items.length;i++){
            if (this.props.items[i].selected===undefined){
                this.props.items[i].selected = false;
            }
            if (this.props.repelValue!=null){
                if (this.props.items[i].value===this.props.repelValue){
                    repelIndex = i;
                }
            }
        }
        if (this.props.multiSelect===false){
            for(let i=0;i<this.props.items.length;i++){
                this.props.items[i].selected = false;
            }
            this.props.items[index].selected = true;
            this.setState({})
            this.props.onSelect?.call(this,null,index,[this.props.items[index].value],this.props.items);
            return;
        }
        //下面是多选的情况处理
        if (repelIndex!=null){//如果有排斥值
            let isRepel:boolean = false;
            if (index===repelIndex){
                isRepel = true;
            }
            if (isRepel){//如果点击全身按钮
                //如果是选中全身,则其他排除
                if (this.props.items[index].selected===undefined||this.props.items[index]?.selected===false){
                    for (let i = 0; i < this.props.items.length; i++) {
                        this.props.items[i].selected = false;
                    }
                    this.props.items[index].selected=true;
                }else{
                    this.props.items[index].selected=false;
                }
                //如果放弃全身,则只放弃全身
            }else{
                //判断全身有选中则不处理
                //没有选中,则正常选择判断
                if (this.props.items[repelIndex].selected===false){
                    let count: number = 0;
                    this.props.items[index].selected = !this.props.items[index].selected;

                    for (let i = 0; i < this.props.items.length; i++) {
                        if (this.props.items[i].selected === true) {
                            count++;
                        }
                    }
                    if (this.props.maxSelect) {
                        if (count > this.props.maxSelect) {
                            this.props.items[index].selected = false;
                        }
                    }
                }
            }
        }else{
            let count: number = 0;
            this.props.items[index].selected = !this.props.items[index].selected;

            for (let i = 0; i < this.props.items.length; i++) {
                if (this.props.items[i].selected === true) {
                    count++;
                }
            }
            if (this.props.maxSelect) {
                if (count > this.props.maxSelect) {
                    this.props.items[index].selected = false;
                }
            }
        }
        var select:string[] = []
        for (let i = 0; i < this.props.items.length; i++) {
            if (this.props.items[i].selected === true) {
                select.push(this.props.items[i].value)
            }
        }
        this.setState({})
        this.props.onSelect?.call(this,null,index,select,this.props.items);
    }

    render(){
        let list = ()=>{
            let res:any = []
            this.props.items.forEach((item,index,array)=>{
                let name:any = item.name;
                if (item?.title){
                    name = <div className={'content'}>
                        <div>{item.name}</div>
                        <div className={'divider'}></div>
                        <div>{item.title}</div>
                    </div>
                }
                let cls = 'btn'
                let style = {color:this.props.normalTextColor,backgroundColor:this.props.normalColor,marginTop:this.props.marginTop};
                if (item.selected){
                    cls = 'btn active'
                    style = {color:this.props.selectedTextColor,backgroundColor:this.props.selectedColor,marginTop:this.props.marginTop};
                }
                res.push(
                <IonCol  key={'rb'+index} className={'ion-no-margin ion-no-padding '+(index%2===0?'ion-text-left':'ion-text-right')}>
                    <IonButton
                        className={cls+' ion-no-margin '} style={style}
                        type={'button'}
                        fill={"clear"} size={'large'}
                        onClick={(e)=>this.onSelect(e,index)} >
                        {name}
                    </IonButton>
                </IonCol>)
            })
            return res;
        }
        return(
            <IonRow className={`qjs-radiobutton ion-no-margin`} style={this.props.style}>
                {list()}
            </IonRow>
        );
    };
}
