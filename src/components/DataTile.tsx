import React from 'react';

import './DataTile.css';

interface DataTileProps {
    style?:{}
    langPackage?:Object;
    title:string;
    subtitle:string;
}

interface DataTileState {
}

export default class DataTile extends React.Component<DataTileProps,DataTileState> {
    render(){
        return(
            <div className="qjs-datatile" style={this.props.style}>
                <div className={'title'}>{this.props.title}</div>
                <div className={'subtitle'}>{this.props.subtitle}</div>
            </div>
        );
    };
}


