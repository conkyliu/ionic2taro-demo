import React, {  } from 'react';
import './StepBarPage.css';

import SpPageContainer from './SpPageContainer';
import StepBar from "../components/StepBar";
import ScaleBar from "../components/ScaleBar";


const SelectPage: React.FC = () => {
    return (
        <SpPageContainer title='步骤条组件'>
            <div style={{margin:'10Px'}}>
                刻度条ScaleBar
                <div>scale=10 ,current=19 ,size=10</div>
                <ScaleBar scale={10} finish={6} unfinish={3} size={10}></ScaleBar>
                <ScaleBar scale={10} finish={7} unfinish={3} size={10}></ScaleBar>
                <ScaleBar scale={10} finish={1} unfinish={3} size={10}></ScaleBar>
                <ScaleBar scale={10} finish={0} unfinish={3} size={10}></ScaleBar>
                <ScaleBar scale={10} finish={10} unfinish={0} size={10}></ScaleBar>
            </div>
            <div style={{margin:'50Px'}}>
                刻度条ScaleBar
                <div>color=#0000ff , scale=5 ,current=70</div>
                <ScaleBar scale={5} finish={1} unfinish={3} color={'#0000ff'}></ScaleBar>
            </div>
            <div style={{margin:'10Px'}}>
                步骤条StepBar<div>size=25 ,min=1,max=3 ,width=100Px,居左</div>
                <div style={{display:'flex',justifyContent:'flex-start'}}>
                    <StepBar style={{width:'100Px'}} min={1} max={3} current={3} color={'#BF09FF'} size={25} onClick={(seder:any,val:number)=>alert(val)} ></StepBar>
                </div>
            </div>
            <div style={{margin:'10Px'}}>
                步骤条StepBar<div>size=25 ,min=1,max=3 ,width=150Px,居中</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <StepBar style={{width:'150Px'}} min={1} max={3} current={3} color={'#BFC9FF'} size={25}  onClick={(val:number)=>alert(val)} ></StepBar>
                </div>
            </div>
            <div style={{margin:'10Px'}}>
                步骤条StepBar<div>size=25 ,min=1,max=3 ,width=200Px,居右</div>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <StepBar style={{width:'200Px'}} min={1} max={3} current={3} color={'#0FC9FF'} size={25}  onClick={(val:number)=>alert(val)} ></StepBar>
                </div>
            </div>
            <div style={{margin:'10Px'}}>
                步骤条StepBar<div>size=25 ,min=1,max=3 ,width=默认最大宽度</div>
                <StepBar min={1} max={3} current={1} color={'#BFC9FF'} size={25}  ></StepBar>
            </div>
            <div style={{margin:'10Px',height:'150Px'}}>
                步骤条StepBar
                <div>size=默认不填 ,min=3,max=9,current=1</div>
                <div>height:150Px</div>
                <StepBar min={3} max={9} current={1}  color={'#ff0000'}></StepBar>
            </div>
            <div style={{margin:'10Px'}}>
                步骤条StepBar
                <StepBar min={1} max={10} current={8} size={25} ></StepBar>
            </div>
        </SpPageContainer>
    )
}

export default SelectPage;
