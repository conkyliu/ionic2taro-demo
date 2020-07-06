import React from 'react';

import './PlanCardView.css';

interface PlanCardViewProps {
    style?:{}
    langPackage?:Object;
    id:string;
    title:string;
    name:string;
    memo?:string;
    image?:string;
    free?:boolean;
    onClick?:Function;
}

interface PlanCardViewState {
}

export default class PlanCardView extends React.Component<PlanCardViewProps,PlanCardViewState> {
    render(){
        var backStyle = this.props.style
        if (this.props.image!=null) {
            if (backStyle!=null){
                backStyle = Object.assign(this.props.style, {backgroundImage: `url(${this.props.image})`})
            }else{
                backStyle = {backgroundImage: `url(${this.props.image})`}
            }
        }
        var freeTag = () =>{
            if (this.props.free==null||this.props.free===true){
                return <div className={'img'} />
            }
        }
        return(
            <div className="qjs-plancardview"
                 style={backStyle}
                 onClick={(e)=>this.props.onClick?.call(this,e,this.props.id)}>
                {freeTag()}
                <div className={'name'}>{this.props.name}</div>
                <div className={'title'}>{this.props.title}</div>
                <div className={'memo'}>{this.props.memo}</div>
            </div>
        );
    };
}


