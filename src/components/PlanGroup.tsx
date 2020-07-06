import React, {MouseEvent} from 'react';
import {IonIcon, IonCol, IonRow} from '@ionic/react';

import './PlanGroup.css';
import IconButton from "./IconButton";

import icon_play from './icon/detail_btn_play.svg';
import icon_max from './icon/train_btn_large.svg';
import {DataBar} from "./NumberLabel";
import NumberLabelBar from "./NumberLabelBar";
import icon_prompt from '../components/icon/train_icon_prompt.svg';
import NativeTool from '../utility/NativeUtil';
// trainingType=1时，显示重量（argKg），输入次数（argCount);
// trainingType=2时，输入秒（argSeconds)
// trainingType=3时，显示秒（argSeconds），输入次数（argCount)
// trainingType=4时，显示秒（argSeconds）、坡度（argIncline），输入速度（argKPH)
// trainingType=5时，显示秒（argSeconds）、阻力等级（argSpeedLevel )，输入速度（argKPH)
interface PlanGroupProps {
    style?:{}
    index:boolean;
    type:number;
    id:string;
    pic:string;//封面图片
    url:string;
    name:string;
    memo:string;
    status:number;
    items:Array<DataBar>
    current:number;
    time?:string;
    timeClick?:Function;
    addClick?:Function;
    onchange?:Function;
    onInputFocus?:Function;
    successClick?:Function;
    unsuccessClick?:Function;
    testGroupAlert?:string;
}

interface PlanGroupState {
    play:boolean;
    playHidden:boolean;
}

export default class PlanGroup extends React.Component<PlanGroupProps,PlanGroupState> {
    video:HTMLVideoElement | undefined | null;
    scrollView:HTMLDivElement | undefined | null;
    constructor(props:any){
        super(props);
        this.state = {play:false,playHidden:false}
    };

    videocomponent(node:HTMLVideoElement|null){
        this.video = node;
        if (this.video!=null){
            this.video.onended = (event)=> this.onendplay(event)
        }
    };

    videoclick(node:MouseEvent<HTMLVideoElement>| null){
        this.setState({play:false,playHidden:false})
        if (this.video!=null){
            this.video.pause()
        }
    };
    onendplay(event:any){
        this.setState({play:false,playHidden:false})
    };

    playclick(e:MouseEvent<HTMLIonIconElement>){
        this.setState({play:true,playHidden:true})
        if (this.video!=null){
            this.video.play()
        }
    };

    maxclick(e:MouseEvent<HTMLIonIconElement>){
        if (this.video!=null){
            this.video.webkitEnterFullScreen();
        }
    };

    additemclick(e:MouseEvent<HTMLIonIconElement>){
        if (this.props.items.length<=0){
            return;
        }
        let item:DataBar = this.props.items[this.props.items.length-1]
        if (item.isTest===true&&(item.StatusCode===undefined||item.StatusCode===null||item.StatusCode===0)){
            return ;
        }
        let newitem:DataBar = new class implements DataBar {//必须是new对象,否则不承认是新数据
            StatusCode = 1;
            argCount = item.argCount;
            argIncline = item.argIncline;
            argKPH = item.argKPH;
            argKg = item.argKg;
            argSeconds = item.argSeconds;
            argSpeedLevel = item.argSpeedLevel;
            isTest = false;
            type = item.type;
            trainingDetailId=item.trainingDetailId;
            trainingDayId=item.trainingDayId;
            argDistance = item.argDistance;
            name=item.name;
        };

        this.scrollToBottom()
        this.props.addClick?.call(this,null,newitem);
    };
    scrollToBottom(){
        if (this.scrollView!=null){
            this.scrollView.scrollTop = this.scrollView.scrollTop+30;
            //滚动条无法滚动到底部
        }
    };

    successClick(item:DataBar,index:number){
        this.props.successClick?.call(this,null,item,index);
    }

    unsuccessClick(item:DataBar,index:number){
        this.props.unsuccessClick?.call(this,null,item,index);
    }

    newitem(i:number,item:DataBar){
        if (this.props.index===true){
            return <NumberLabelBar key={'item'+i}
                number={item.number}
                isTest={item.isTest}
                type={this.props.type}
                argCount={item.argCount}
                argIncline={item.argIncline}
                argKg={item.argKg}
                argKPH={item.argKPH}
                argSeconds={item.argSeconds}
                argSpeedLevel={item.argSpeedLevel}
                argDistance={item.argDistance}
                StatusCode={item.StatusCode}
                successClick={(sender:any,e:any)=>this.successClick(item,i)}
                unsuccessClick={(sender:any,e:any)=>this.unsuccessClick(item,i)}
                onFocus={(e:any)=>this.props.onInputFocus?.call(null,e)}
                onchange={(sender:any,e:any)=>{this.props.onchange?.call(this,null,item,i,e);}}
            />
        }else{
            return <NumberLabelBar key={'item'+i}
                   isTest={item.isTest}
                   type={this.props.type}
                   argCount={item.argCount}
                   argIncline={item.argIncline}
                   argKg={item.argKg}
                   argKPH={item.argKPH}
                   argSeconds={item.argSeconds}
                   argSpeedLevel={item.argSpeedLevel}
                   argDistance={item.argDistance}
                   StatusCode={item.StatusCode}
                   timeClick={(sender:any,e:any)=>this.props.timeClick?.call(this,null,e)}
                   onFocus={(e:any)=>this.props.onInputFocus?.call(null,e)}
                   successClick={(sender:any,e:any)=>this.successClick(item,i)}
                   unsuccessClick={(sender:any,e:any)=>this.unsuccessClick(item,i)}
                   onchange={(sender:any,e:any)=>{this.props.onchange?.call(this,null,item,i,e);}}
            />
        }
    }

    render(){
        let list = []
        let isTest = false;
        for(let i=0;i<this.props.items.length;i++){
            if (this.props.items[i].isTest&&this.props.items[i].StatusCode===1){
                isTest = true;
            }
            list.push(this.newitem(i,this.props.items[i]))
        }
        let testView;
        if (isTest){
            testView = <IonRow hidden={this.props.testGroupAlert==null} className={'testtip'}>
                <IonCol size="2">
                    <IonIcon src={icon_prompt} ></IonIcon>
                </IonCol>
                <IonCol>
                    {this.props.testGroupAlert}
                </IonCol>
            </IonRow>
        }
        let statusView;
        if (this.props.status===0){
            statusView = <div className={'testtip'}><IonIcon src={icon_prompt} style={{marginRight:'9Px'}}></IonIcon>您需要完成前面的测试动作后才能启动该动作的训练。</div>;
        }
        return(
            <div className="qjs-plangroup" style={this.props.style}>
                <div className={'video'}>
                    <video src={this.props.url} loop={true}
                        className={'player'} preload={'load'} controls={false}
                        ref={(node)=>this.videocomponent(node)}
                        onClick={(e)=>this.videoclick(e)}
                    >
                    </video>
                    {/*<div className={'firstpic'} hidden={this.state.playHidden}*/}
                    {/*     style={{backgroundImage:`url(${this.props.pic})`}}*/}
                    {/*></div>*/}
                    {/*pic={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/热身/腹部激活.jpg'}*/}
                    <div
                        className={'iconplay'}
                        style={{backgroundImage:`url(${this.props.pic})`}}
                        hidden={this.state.playHidden}>
                        <IonIcon style={{width:'55Px',height:'55Px'}} src={icon_play} onClick={(e)=>this.playclick(e)}/>
                    </div>
                    <div className={'iconmax'}><IonIcon style={{width:'19Px',height:'19Px'}} src={icon_max} onClick={(e) =>this.maxclick(e)}/></div>
                </div>
                <div className={'body'}>
                    <div className={'linename'}>
                        <div className={'name'}>{this.props.name}</div>
                        <div className={'time'}>
                            <IconButton
                            name= {this.props?.time??'计时器'}
                            icon= {'time'}
                            onClick= {(e:any)=>this.props.timeClick?.call(this,null,e)}/>
                        </div>
                    </div>
                    <div className={'memo'}>{this.props.memo}</div>
                    <div className={'items'} style={{height:NativeTool.ScreeSize=== 'Normal'?(window.screen.availHeight-520)+'Px':(window.screen.availHeight-590)+'Px'}}
                         ref={(node)=>this.scrollView = node}>
                        {list}
                        {/*{this.props.children}*/}
                        {testView}
                        {statusView}
                    </div>
                    <div className={'footer'}>
                        <div className={'name'}><div style={{color:'#000000FF',fontSize:'18Px'}}>{this.props.current<10?'0'+this.props.current.toString():this.props.current.toString()}</div><div style={{color:'#A5A5A5FF',fontSize:'14Px'}}>/{this.props.items.length<10?'0'+this.props.items.length:this.props.items.length}组</div></div>
                        <div className={'btn'}><IconButton name={'加一组'} icon={'add'}  onClick={(e:any)=>this.additemclick(e)} /></div>
                    </div>
                </div>
            </div>
        );
    };
}
