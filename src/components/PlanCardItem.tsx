import React from 'react';

import './PlanCardItem.css';
import {SiteOptions} from '../components/CourseOptions';

interface PlanCardItemProps {
    style?:{}
    langPackage?:Object;
    name:string;
    memo?:string;
    tags:string;
    rate:number;
    image?:string;
    use:number;
    free?:boolean;
    series?:boolean;
    onClick?:Function;
}

export default class PlanCardItem extends React.Component<PlanCardItemProps> {
    render(){
        let list=()=>{
            if (this.props.tags===undefined||this.props.tags===null){
                return []
            }
            let res = [];
            let items = JSON.parse(this.props.tags);
            for(let i=0;i<4&&i<items.length;i++){
                res.push(<div className={'tag'} key={'tag'+i}>{SiteOptions[parseInt(items[i])-1].name}</div>);
            }
            if (this.props.use!==0){
                res.push(<div className={'use'} key={'use'+Math.random()}>{this.props.use}人使用</div>)
            }
            return res;
        }
        let mask = null;
        if (this.props.rate===100) {
            mask = <><div className={'mask'} style={{width:this.props.rate+'%',borderTopRightRadius:'8px',borderBottomRightRadius:'8px'}}></div><div className={'progress'}>已完成{this.props.rate}%</div></>
        }else if (this.props.rate>0) {
            mask = <><div className={'mask'} style={{width:this.props.rate+'%'}}></div><div className={'progress'}>已完成{this.props.rate}%</div></>
        }
        let backStyle = this.props.style
        if (this.props.image!=null) {
            if (backStyle!=null){
                backStyle = Object.assign(this.props.style, {backgroundImage: `url(${this.props.image})`})
            }else{
                backStyle = {backgroundImage: `url(${this.props.image})`}
            }
        }
        let freeTag = () =>{
            if (this.props.free==null||this.props.free===true){
                return <div className={'img'} />
            }
        }
        let shadow;
        if (this.props?.series){
            shadow = <><div className={'shadow1'}></div>
                <div className={'shadow2'}></div></>
        }
        return(<div className={'qjs-plancarditem'}>
                {shadow}
            <div className="card" style={backStyle} onClick={(e)=>this.props.onClick?.call(this,null,e)}>
                {freeTag()}
                <div className={'name'}>{this.props.name}</div>
                <div className={'demo'}>{this.props.memo}</div>
                <div className={'tags'}>
                    {list()}
                </div>
                {mask}
            </div>
            </div>
        );
    };
}
