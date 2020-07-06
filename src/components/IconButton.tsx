import React from 'react';
import {IonIcon} from '@ionic/react';
import icon_timer from './icon/detail_icon_timer_2.svg';
import icon_add from './icon/detail_icon_add.svg';
import './IconButton.css';

interface IconButtonProps {
    style?:{}
    langPackage?:Object;
    name:string;
    icon:'add' | 'time' | 'question';
    onClick?:Function;
}

interface IconButtonState {
}

export default class IconButton extends React.Component<IconButtonProps,IconButtonState> {
    image:string;
    constructor(props:any){
        super(props);
        this.image = 'add'
        if (this.props.icon==='add'){
            this.image = icon_add
        }else if (this.props.icon==='time') {
            this.image = icon_timer
        }else if (this.props.icon==='question') {
            this.image = 'question'
        }
    };
    onClick(e:any){
        e.preventDefault();
        this.props.onClick?.call(this,this.props, e);
    }
    render(){
        return(
            <div className={`qjs-iconbutton`} style={this.props.style} onClick={(e)=> this.onClick(e)}>
                <div className={'icon'}><IonIcon src={this.image+'#detail_icon_timer'}></IonIcon></div>
                <div className={'name'}>{this.props.name}</div>
            </div>
        );
    };
}
