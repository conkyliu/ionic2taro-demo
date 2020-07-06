import React,{UIEvent} from 'react';
import './TimePicker.css'
import RadioGroup from "./RadioGroup";

interface TimePickerProps {
    teamTime:string;
    actionTime:string;
    hours?:number;//小时
    minute?:number;//分钟;
    secord?:number;//秒
    type:string|'hours'|'minute'|'secord';
    onChange?:Function;
}
interface TimePickerState {
    selectIndex:number;
    teamTime:string;
    actionTime:string;
    hours:number;//小时
    minute:number;//分钟;
    secord:number;//秒
}
export default class TimePicker extends React.Component<TimePickerProps,TimePickerState> {
    hoursView:HTMLDivElement|undefined|null;
    minuteView:HTMLDivElement|undefined|null;
    secordView:HTMLDivElement|undefined|null;
    constructor(props: TimePickerProps, context: any) {
        super(props, context);
        this.state = {selectIndex:0
            ,hours:this.props.hours??0
            ,minute:this.props.minute??0
            ,secord:this.props.secord??0
            ,teamTime:this.props?.teamTime??'00:00:00'
            ,actionTime:this.props?.actionTime??'00:00:00'
        };
    }
    hoursScroll(e:UIEvent<HTMLDivElement>){
        let clientHeight = e.currentTarget.clientHeight; //可视区域高度 150/3=50
        let scrollTop  = e.currentTarget.scrollTop;  //滚动条滚动高度
        let height = clientHeight/3;
        let val:number = Math.round(scrollTop/height);
        if (this.state.hours!==val){
            this.setState({hours:val})
            this.notifyChange(val,this.state.minute,this.state.secord);
        }
    };
    minuteScroll(e:UIEvent<HTMLDivElement>){
        let clientHeight = e.currentTarget.clientHeight; //可视区域高度 150/3=50
        let scrollTop  = e.currentTarget.scrollTop;  //滚动条滚动高度
        // let scrollHeight = e.currentTarget.scrollHeight; //滚动内容高度 330
        // console.log('clientHeight'+clientHeight);
        // console.log('scrollTop'+scrollTop);
        // console.log('scrollHeight'+scrollHeight);
        let height = clientHeight/3;
        let val = Math.round(scrollTop/height);
        if (this.state.minute!==val){
            this.setState({minute:val})
            this.notifyChange(this.state.hours,val,this.state.secord);
        }
    };
    secordScroll(e:UIEvent<HTMLDivElement>){
        let clientHeight = e.currentTarget.clientHeight; //可视区域高度 150/3=50
        let scrollTop  = e.currentTarget.scrollTop;  //滚动条滚动高度
        let height = clientHeight/3;

        let val = Math.round(scrollTop/height);
        if (this.state.secord!==val){
            this.setState({secord:val})
            this.notifyChange(this.state.hours,this.state.minute,val);
        }
    };
    notifyChange(hour:number,minute:number,secord:number){
        let time;
        if (this.props.type==='hours'){
            time = (hour<=9?('0'+hour):''+hour)+ ':' + (minute<=9?('0'+minute):''+minute)+ ':' + (secord<=9?('0'+secord):''+secord);
        }else if (this.props.type==='minute') {
            time = (minute<=9?('0'+minute):''+minute)+ ':' + (secord<=9?('0'+secord):''+secord);
        }else{
            time = (secord<=9?('0'+secord):''+secord);
        }
        if (this.state.selectIndex===0){
            this.setState({teamTime:time});
        }else if (this.state.selectIndex===1){
            this.setState({actionTime:time});
        }
        this.props.onChange?.call(this,null,{type:this.state.selectIndex,time})

    }
    showHours(){
        let res = [];
        res.push(<div>&nbsp;</div>)
        for(let i=0;i<24;i++){
            res.push(<div style={this.state.hours===i?{color:'#4D64D7'}:{}}>{i<=9?'0'+i:i}</div>)
        }
        res.push(<div>&nbsp;</div>)
        return res;
    }
    showMinute(){
        let res = [];
        res.push(<div>&nbsp;</div>)
        for(let i=0;i<60;i++){
            res.push(<div style={this.state.minute===i?{color:'#4D64D7'}:{}}>{i<=9?'0'+i:i}</div>)
        }
        res.push(<div>&nbsp;</div>)
        return res;
    }
    showSecond(){
        let res = [];
        res.push(<div>&nbsp;</div>)
        for(let i=0;i<60;i++){
            res.push(<div style={this.state.secord===i?{color:'#4D64D7'}:{}}>{i<=9?'0'+i:i}</div>)
        }
        res.push(<div>&nbsp;</div>)
        return res;
    }
    onSelect(index:number) {
        let times:string[] = [];
        let hour = 0;
        let minute = 0;
        let secord = 0;

        if (index===0){
            times = this.state.teamTime.split(':');
        }else if (index===1){
            times = this.state.actionTime.split(':');
        }
        if (times.length===1) {
            secord = parseInt(times[0]);
        }else if (times.length===2){
            minute = parseInt(times[0])
            secord = parseInt(times[1]);
        }else if (times.length===3){
            hour = parseInt(times[0])
            minute = parseInt(times[1])
            secord = parseInt(times[2]);
        }

        if (this.props.type==='hours'){
            if (this.hoursView!=null) {
                this.hoursView.scrollTop = hour * 55;
            }
        }
        if (this.props.type==='hours'||this.props.type==='minute') {
            if (this.minuteView!=null) {
                this.minuteView.scrollTop = minute * 55;
            }
        }
        if (this.secordView!=null) {
            this.secordView.scrollTop = secord * 55;
        }
        this.setState({selectIndex:index,hours:hour,minute:minute,secord:secord});
    }
    render() {
        let title =[];
        let hour = [];
        if (this.props.type==='hours'){
            title.push(<div className={''} style={{flex:'1'}}>小时</div>);
            title.push(<div className={''}>&nbsp;</div>);
            title.push(<div className={''} style={{flex:'1'}}>分钟</div>);
            title.push(<div className={''}>&nbsp;</div>);

            hour.push(<div className={'item'} style={{flex:'1'}} ref={(node)=>{this.hoursView = node}}
                 onScroll={(e:UIEvent<HTMLDivElement>)=>this.hoursScroll(e)}>
                    {this.showHours()}
                    </div>
            );
            hour.push(                    <div className={'item'}>
                        <div className={''}>&nbsp;</div>
                <div className={''} style={{color:'#4D64D7'}}>:</div>
                <div>&nbsp;</div>
                </div>);

            hour.push(<div className={'item'} style={{flex:'1'}}  ref={(node)=>{this.minuteView= node}}
                onScroll={(e:UIEvent<HTMLDivElement>)=>this.minuteScroll(e)}>
                {this.showMinute()}
                </div>);

            hour.push(<div className={'item'}>
                <div className={''}>&nbsp;</div>
                <div className={''} style={{color:'#4D64D7'}}>:</div>
                <div>&nbsp;</div>
                </div>);

        }else if (this.props.type==='minute'){
            title.push(<div className={''} style={{flex:'1'}}>分钟</div>);
            title.push(<div className={''}>&nbsp;</div>);

            hour.push(
                <div className={'item'} style={{flex:'1'}}  ref={(node)=>{this.minuteView = node}}
                     onScroll={(e:UIEvent<HTMLDivElement>)=>this.minuteScroll(e)}>
                    {this.showMinute()}
                </div>);

            hour.push(    <div className={'item'}>
                    <div className={''}>&nbsp;</div>
                    <div className={''} style={{color:'#4D64D7'}}>:</div>
                    <div>&nbsp;</div>
                </div>);

        }
        let groups:any[] = [];
        groups.push({name:"组间",title:this.state.teamTime,value:"1",selected:this.state.selectIndex===0});
        groups.push({name:"动作间",title:this.state.actionTime,value:"2",selected:this.state.selectIndex===1});

        return (<div className={'qjs-number-picker'}>
            <RadioGroup
                marginTop={'0px'}
                normalColor={'#BFC9FF'}
                normalTextColor={'#ffffff'}
                items={groups}
                multiSelect={false}
                onSelect={(sender:any,index:number,item:any,list:any)=>this.onSelect(index)} ></RadioGroup>

                <div className={'title'}>
                    {title}
                    <div className={''} style={{flex:'1'}}>秒</div>
                </div>
                <div className={'column'}>
                    {hour}
                    <div className={'item'} style={{flex:'1'}} ref={(node)=>{this.secordView = node}}
                         onScrollCapture={(e:UIEvent<HTMLDivElement>)=>this.secordScroll(e)}>
                        {this.showSecond()}
                    </div>
                </div>
            </div>);
    }
}
