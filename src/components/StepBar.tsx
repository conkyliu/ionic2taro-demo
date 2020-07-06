import React from 'react';

import './StepBar.css';

interface StepBarProps {
    style?:{}
    min:number;
    max:number;
    current:number;
    color?:string;
    size?:number;
    onClick?:Function;
}

export default class StepBar extends React.Component<StepBarProps> {
    render(){
        var currentStyle={
            background:this.props.color,
            color:'#ffffff',
            border:'1Px solid' + this.props.color,
            width:this.props.size+'Px',
            height:this.props.size+'Px',
            fontSize:this.props.size+'Px'
        }
        var itemStyle={
            border:'1Px solid '+this.props.color,
            color:this.props.color,
            width:this.props.size+'Px',
            height:this.props.size+'Px',
            fontSize:this.props.size+'Px'
        }
        var lineStyle={
            background:this.props.color
        }
        var list =()=>{
            var res = [];
            for(let i=this.props.min;i<=this.props.max;i++){
                if (i===this.props.current){
                    res.push(<div className={'item current'} key={'item'+i} style={currentStyle}>{i}</div>)
                }else{
                    if (i<this.props.current){
                        res.push(<div className={'item'} key={'item' + i} style={itemStyle} onClick={(e:any)=>this.props.onClick?.call(this,null,i)}>{i}</div>)
                    }else {
                        res.push(<div className={'item'} key={'item' + i} style={itemStyle}>{i}</div>)
                    }
                }
                if (i<this.props.max) {
                    res.push(<div className={'divider'} key={'div'+i}><div className={'line'}  style={lineStyle}></div></div>)
                }
            }
            return res;
        }

        return(
            <div className={'qjs-stepbar'} style={this.props.style}>
                {list()}
            </div>
        );
    };
}

