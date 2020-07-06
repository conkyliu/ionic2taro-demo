import React from 'react';

import './ScaleBar.css';

interface ScaleBarProps {
    style?:{};
    color?:string;
    size?:number;
    scale:number;
    finish:number;
    unfinish:number;
    // state:number;
}

export default class ScaleBar extends React.Component<ScaleBarProps> {

    render(){
        let currentStyle={
            background:this.props.color,
            height:this.props.size+'Px'
        }
        let itemStyle={
            height:this.props.size+'Px'
        }
        let items = [];
        let finish = this.props.finish;
        let unfinish = this.props.unfinish;
        for(let i=0;i<this.props.scale;i++){
            if (finish>0){
                items.push(<div className={'item current'} key={'scale'+ i} style={currentStyle}></div>)
                finish--;
            }else if (unfinish>0){
                items.push(<div className={'item current2'} key={'scale'+ i} style={itemStyle}></div>)
                unfinish--;
            }else{
                items.push(<div className={'item'} key={'scale'+ i} style={itemStyle}></div>)
            }
        }
        let style={color:'#5F5F5F'}
        if (this.props.unfinish>0){
            style = {color:'#FA7272'}
        }
        let percent = Math.round((this.props.finish)/this.props.scale*100);
        return(
            <div className="qjs-scalebar" style={this.props.style}>
                {items}
                <div className={'desc'} style={style}>{percent}%</div>
            </div>
        );
    };
}
