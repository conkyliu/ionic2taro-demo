import React,{Component} from 'react';

import {IonIcon,IonLabel} from '@ionic/react';
import './IconLabel.css';

import icon_calendar from './icon/icon_calendar.svg';

interface IconLabelProps {
    style?:{};
    icon?:string;
    label?:string
    labelColor?:string;
}

export default class IconLabel extends Component<IconLabelProps> {
    render(){
        let iconView;
        if (this.props?.icon){
            iconView = <IonIcon className={'icon'} src={this.props.icon}></IonIcon>;
        }else{
            iconView = <IonIcon className={'icon'} src={icon_calendar}></IonIcon>;
        }
        return(
            <div className="qjs-iconlabel" style={this.props.style}>
                {iconView}<IonLabel className={'label'} style={{color:this.props.labelColor}}>{this.props.label}</IonLabel>
            </div>
        );
    };
}
