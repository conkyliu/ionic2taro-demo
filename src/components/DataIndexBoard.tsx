import React from 'react';

import './DataIndexBoard.css';
import DataIndexTile from "./DataIndexTile";

interface DataIndexBoardProps {
    style?:{}
    total:DataItem;
    item1:DataItem;
    item2:DataItem;
    item3:DataItem;
    item4:DataItem;
}
export interface DataItem {
    name:string;
    value?:number|undefined;
    changeValue?:number|undefined;
}
interface DataIndexBoardState {
}

export default class DataIndexBoard extends React.Component<DataIndexBoardProps,DataIndexBoardState> {

    render(){
        return(
            <div className="qjs-dataindexboard" style={this.props.style}>
                <div className={'total'}><DataIndexTile name={this.props.total.name} value={this.props.total?.value} changeValue={this.props.total?.changeValue}></DataIndexTile></div>
                <div className={'divider'}></div>
                <div className={'row'}>
                    <div className={'left'}><DataIndexTile name={this.props.item1.name} value={this.props.item1.value} changeValue={this.props.item1.changeValue}></DataIndexTile></div>
                    <div className={'dividervertical'}></div>
                    <div className={'right'}><DataIndexTile name={this.props.item2.name} value={this.props.item2.value} changeValue={this.props.item2.changeValue}></DataIndexTile></div>
                </div>
                <div className={'divider'}></div>
                <div className={'row'}>
                    <div className={'left'}><DataIndexTile name={this.props.item3.name} value={this.props.item3.value} changeValue={this.props.item3.changeValue}></DataIndexTile></div>
                    <div className={'dividervertical'}></div>
                    <div className={'right'}><DataIndexTile name={this.props.item4.name} value={this.props.item4.value} changeValue={this.props.item4.changeValue}></DataIndexTile></div>
                </div>
            </div>
        );
    };
}
