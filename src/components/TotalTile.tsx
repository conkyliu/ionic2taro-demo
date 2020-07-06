import React from 'react';

import './TotalTile.css';

interface TotalTileProps {
    style?:{}
    langPackage?:Object;
    left?:TotalData;
    right?:TotalData;
}
export interface TotalData {
    name:string;
    value:number;
    unit:string;
}

interface TotalTileState {
}

export  default class TotalTile extends React.Component<TotalTileProps,TotalTileState> {
    render(){
        var col1
        var col2
        if (this.props.left!=null){
            let val = this.props.left.value===0?<div style={{color:'#BFC9FF',fontSize:'20px',marginRight:'8px'}}>暂无数据</div>:this.props.left.value
            col1 = <>
                <div className={'name'}>{this.props.left.name}</div>
                <div className={'value'}>{val} {this.props.left.unit}</div>
            </>

        }
        if (this.props.right!=null){
            let val = this.props.right.value===0?<div style={{color:'#BFC9FF',fontSize:'20px',marginRight:'8px'}}>暂无数据</div>:this.props.right.value
            col2 =<>
                <div className={'name'}>{this.props.right.name}</div>
                <div className={'value'}>{val} {this.props.right.unit}</div></>

        }
        return(
            <div className="qjs-totaltile" style={this.props.style}>
                <div className={'col'}>{col1}</div>
                <div className={'divider'}></div>
                <div className={'col'}>{col2}</div>
            </div>
        );
    };
}
