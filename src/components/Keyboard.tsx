import React from 'react';

import {IonButton} from '@ionic/react';
import './Keyboard.css';

interface KeyboardProps {
    style?:{}
    langPackage?:Object;
    show:boolean;
    onclick?:Function;
    closeKeyboard?:Function;
}

class Keyboard extends React.Component<KeyboardProps> {
    constructor(props:any){
        super(props);
        this.props.closeKeyboard?.bind(this)
    };

    onClick(e:any,event:string,value:any){
        e.preventDefault();
        this.props.onclick?.call(this,this.props,event, value);
    }

    render(){
        return(
            <div className="qjs-keyboard" style={this.props.style} hidden={this.props.show ===false} >
                <div className={'row'}>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',1)}>1</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',2)}>2</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',3)}>3</IonButton>
                </div>
                <div className={'row'}>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',4)}>4</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',5)}>5</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',6)}>6</IonButton>
                </div>
                <div className={'row'}>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',7)}>7</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',8)}>8</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number',9)}>9</IonButton>
                </div>
                <div className={'row'}>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number','.')}>&nbsp;.&nbsp;</IonButton>
                    <IonButton className={'btn'} fill={'clear'} onClick={(e)=> this.onClick(e,'number','0')}>0</IonButton>
                    <IonButton className={'del'} fill={'clear'} onClick={(e)=> this.onClick(e,'del','')}>删除</IonButton>
                </div>

            </div>
        );
    };
}

export default Keyboard;
