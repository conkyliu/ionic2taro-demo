import React from 'react';

import {
    IonButton, IonText, IonImg, IonIcon
} from '@ionic/react';


import './OvalButton.css';

interface OvalButtonProps {
    size? :'small' | 'default' | 'large';
    showWaves?:boolean;
    routerDirection?:any;
    routerLink?:string;
    onClick?:Function;
    color?:"primary" |"secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
    text?:string;
    hidden?:boolean;
    label?:string;
    img?:string;
    disabled?:boolean;
}


class OvalButton extends React.Component<OvalButtonProps> {

    constructor(props:OvalButtonProps){
        super(props);
    }

    render() {

        let screenX = window.innerWidth ;
        if(screenX == null){
            screenX = 720;
        }
        let buttonSize:number =  0;
        let sizeVal = this.props.size;

        if(sizeVal== null){
            sizeVal = 'default';
        }

        switch(sizeVal){
            case 'large':
                let largeSize = 120;
                if(screenX/2.7 > largeSize){
                    largeSize = screenX/2.7;
                }
                buttonSize = largeSize;
                break;
            case 'small':
                let smallSize = 60;
                if(screenX/5.5 > smallSize){
                    smallSize = screenX/5.5;
                }
                buttonSize = smallSize;
                break;
            default:
                let defaultSize = 90;
                if(screenX/4 > defaultSize){
                    defaultSize = screenX/4;
                }
                buttonSize = defaultSize;
                break;
        }

        let textSize = sizeVal === 'default'? 47 :(sizeVal === 'large'? 56 :47);

        let baseStyle= {
            width:buttonSize +'Px',
            height:buttonSize+'Px'
        }

        let btnStyle = {
            width:buttonSize +'Px',
            height:buttonSize+'Px'
        };

        let wavesStyle = {
            width:buttonSize+'Px',
            height:buttonSize+'Px',
            marginTop:(-buttonSize)+'Px'
        };


        return (
            <>
                <div className='ion-text-center' style={baseStyle} hidden={this.props.hidden} onClick={(e) => this.props.onClick?.apply(e)} >
                    <div style={btnStyle} className='ovalBg'></div>
                    <div hidden={this.props.showWaves === false || this.props.disabled} style={wavesStyle} className='waves'></div>
                    <IonButton routerDirection={ this.props.routerDirection} routerLink ={this.props.routerLink}
                                style={{marginTop: (-buttonSize-textSize/2)+'Px'}}
                                disabled={this.props.disabled} color={this.props.color ?? 'dark'}
                                size={this.props.size} fill='clear' >
                        <big hidden={this.props.img != null}>{this.props.text}</big>
                        <IonIcon size={this.props.size ?? 'large'} hidden={this.props.img == null} src={this.props.img} ></IonIcon>
                    </IonButton>
                </div>
                <div className='ion-text-center' style={{ width: buttonSize + 'Px' }}>
                    <IonText color={this.props.color ?? ( this.props.disabled === true?'medium' :'dark')}>{this.props.label}</IonText>
                </div>
            </>
        );

    }
}

export default OvalButton;
