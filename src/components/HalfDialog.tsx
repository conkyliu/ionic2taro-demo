import React from 'react';

import {IonIcon} from '@ionic/react';

import './HalfDialog.css';

import icon_close from '../components/icon/btn_close.svg';

interface HalfDialogProps {
    style?:{}
    onDismiss?:Function;
    onShow?:Function;
}

interface HalfDialogState {
    isOpen:boolean;
}
export default class HalfDialog extends React.Component<HalfDialogProps,HalfDialogState> {
    constructor(props:any){
        super(props);
        this.state = {
            isOpen:false
        }
    };
    close(){
        this.setState({isOpen:false})
    }
    open(){
        this.setState({isOpen:true})
        this.props.onShow?.call(this);
    }
    private closeClick() {
        this.props.onDismiss?.call(this);
        this.setState({isOpen:false})
    }
    render(){
        if (this.state.isOpen){
            return <div className={'qjs-halfdialog'}>
                <div className={'body'}>
                    <IonIcon
                        className={'icon'}
                        src={icon_close}
                        onClick={(e)=>this.closeClick()}>
                    </IonIcon>
                    {this.props.children}
                </div>
            </div>
        }else{
            return <></>
        }
    };
}

