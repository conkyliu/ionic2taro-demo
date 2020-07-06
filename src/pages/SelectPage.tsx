import React, {useState} from 'react';
import './SelectPage.css';

import SpPageContainer from './SpPageContainer';
import Select from "../components/Select";
import {IonActionSheet, IonButton} from "@ionic/react";
import HalfDialog from "../components/HalfDialog";
import StepBar from "../components/StepBar";
import StepBarPage from "./StepBarPage";

const SelectPage: React.FC = () => {
    const [pop,setPop] = useState(false);
    const [gender,setGender] = useState(NaN);
    let dialog:HalfDialog|null;
    return (
        <SpPageContainer title='选择组件'>
            <div style={{marginLeft:'33px',marginRight:'33px'}}>
                <Select type={'gender'} value={gender.toString()} title={'您的性别'} require={true} unit={''} onSelect={(e:any)=>alert(e)}></Select>
                <Select type={'birthday'} value={''} title={'您的生日'} require={true} unit={''} onSelect={(e:any)=>alert(e)}></Select>
                <Select type={'height'} value={''} title={'您的身高'} require={true} unit={'cm'} onSelect={(e:any)=>alert(e)}></Select>
                <Select type={'weight'} value={''} title={'您的体重'} require={true} unit={'kg'} onSelect={(e:any)=>alert(e)}></Select>
            </div>
            <IonButton onClick={(e)=>{dialog?.open()}}>弹出对话框</IonButton>
            <HalfDialog ref={(node)=>{dialog = node }} >
                <div><StepBar current={1} max={5} min={1}></StepBar></div>
                <div></div>
            </HalfDialog>
        </SpPageContainer>
    )
}

export default SelectPage;
