import React from 'react';

import {IonIcon} from '@ionic/react';
import './DataIndexTile.css';

import icon_up from './icon/icon_up.svg';
import icon_down from './icon/icon_down.svg';

interface DataIndexProps {
    style?:{}
    name:string;
    value?:number|undefined;
    changeValue?:number|undefined;
}

interface DataIndexState {
}

export default class DataIndexTile extends React.Component<DataIndexProps,DataIndexState> {

    render(){
        let val = null;
        let cval = null
        let icon = icon_down;
        let color = 'rgba(250,114,114,1)';
        let ccolor = '#D8D8D8';
        if (this.props.value===null||this.props.value===undefined){
            val = 60;
            color = '#D8D8D8';//灰色
        }else{
            val = this.props.value;
            if (this.props.value>=60){
                //蓝色
                color='#4D64D7';
            }else if (this.props.value<60){
                //红色
                color ='#FA7272';
            }
        }
        if (this.props.changeValue===null||this.props.changeValue===undefined){
            icon='';
            ccolor = '#D8D8D8';
            cval = 0;
        }else {
            icon='';
            ccolor = '#D8D8D8';
            cval = 0;
            if (this.props.changeValue > 0) {
                icon = icon_up;
                ccolor = '#4D64D7';
                cval = '+' + this.props.changeValue
            } else if (this.props.changeValue < 0) {
                icon = icon_down;
                ccolor = '#FA7272';
                cval = this.props.changeValue
            }
        }
        return(
            <div className="qjs-dataindex " style={this.props.style}>
                <div className={'name'}>{this.props.name}</div>
                <div className={'right'}>
                    <div className={'value'}>
                        <div className={'num'} style={{color:color}}>{val}</div>
                        <div className={'icon'}><IonIcon  style={{color:ccolor}} src={icon}></IonIcon></div>
                    </div>
                    <div className={'subvalue'}>
                        <div>变化</div>
                        <div style={{color:ccolor}}>{cval}</div>
                    </div>
                </div>
            </div>
        )
    };
}


