import React, {useState} from 'react';
import './DialogPage.css';

import SpPageContainer from './SpPageContainer';
import {IonButton} from "@ionic/react";
import PopDialog from "../components/PopDialog";
import TimerDialog from "../components/TimerDialog";
import {start} from "repl";
import TimePicker from "../components/TimePicker";

let timeCount = 10;
let pauseState = false;
const DialogPage: React.FC = () => {
    const [show,setShow] = useState(false);
    const [team,setTeam] = useState(false);
    const [action,setAction] = useState(false);
    const [motion,setMotion] = useState(false);
    const [timeDialog,setTimeDialog] = useState<any>({type:'team',time:"03:27",pause:false,showDialog:false});

    function showClick() {
        setShow(!show);
    }
    function startTimer() {
        setTimeout(()=>{
            if (timeCount<=0||pauseState===true){
                return ;
            }
            console.log(timeCount-1);
            timeCount--;
            timeDialog.time = timeCount.toString();
            setTimeDialog(timeDialog);
            startTimer()
        },1000);
    }
    function resetClick() {
        timeCount = 10;
        timeDialog.time = timeCount;
        setTimeDialog(timeDialog);
    }
    function pauseClick() {
        pauseState = !pauseState;
        timeDialog.pause = pauseState;
        setTimeDialog(timeDialog);
        if (pauseState==false){
            startTimer();
        }
    }
    return (
        <SpPageContainer title='步骤条组件'>
            <div style={{margin:'0 auto',width:'200px'}}>
                <TimePicker teamTime={'01:02:03'} actionTime={'02:03:04'} type={"hours"}></TimePicker>
            </div>
            <div style={{margin:'0 auto',width:'200px'}}>
                <TimePicker teamTime={'01:02:03'} actionTime={'02:03:04'} type={"minute"}></TimePicker>
            </div>
            <div style={{margin:'0 auto',width:'200px'}}>
                <TimePicker teamTime={'03'} actionTime={'04'} type={"secord"}></TimePicker>
            </div>
            <IonButton onClick={(e)=>showClick()}>弹出对话框</IonButton>
            <PopDialog show={show}>
                <div>dfasdfas</div>
                <div>dfasdfas</div>
                <div>dfasdfas</div>
                <div>dfasdfas</div>
            </PopDialog>
            <IonButton onClick={(e)=>{startTimer();setTeam(!team)}}>组间休息计时器</IonButton>
            <TimerDialog show={team} type={'team'}
                time={timeDialog.time}
                pause={timeDialog.pause} motionTime={"02:03:04"}
                closeClick={(e:any)=>{setTeam(!team)}}
                resetClick={(e:any)=>{resetClick()}}
                pauseClick={(e:any)=>{pauseClick()}}
                saveClick={(sender:any,value:any)=>{console.log(value)}}
            >
            </TimerDialog>
            <IonButton onClick={(e)=>setAction(!action)}>动作间计时器</IonButton>
            <TimerDialog teamTime={'01:02:03'} actionTime={'02:03:04'}  show={action} type={'action'} time={timeDialog.time} pause={timeDialog.pause} closeClick={(e:any)=>{setAction(!action)}}>
            </TimerDialog>
            <IonButton onClick={(e)=>setMotion(!motion)}>运动计时器</IonButton>
            <TimerDialog teamTime={'01:02:03'} actionTime={'02:03:04'}  show={motion} type={'motion'} time={timeDialog.time} pause={timeDialog.pause} closeClick={(e:any)=>{setMotion(!motion)}}>
            </TimerDialog>
        </SpPageContainer>
    )
}

export default DialogPage;
