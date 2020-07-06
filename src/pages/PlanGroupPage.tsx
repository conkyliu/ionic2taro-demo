import React, {Component, useState} from 'react';
import './PlanCardPage.css';

import SpPageContainer from './SpPageContainer';
import PlanGroup from "../components/PlanGroup";
import {IonIcon, useIonViewDidEnter} from "@ionic/react";
import icon_ok from "../components/icon/train_btn_ok.svg";
import icon_cancel from "../components/icon/train_btn_cancel.svg";
import NumberLabel, {DataBar} from "../components/NumberLabel";
import NumberLabelBar from "../components/NumberLabelBar";

const PlanCardPage: React.FC = () => {
    const [traningDetail,setTraningDetail] = useState({} as any);
    const [traningDetailList,setTraningDetailList] = useState([
        {isTest:true,type:1,argCount:1,argIncline:2,argKg:77,argKPH:4,argSeconds:5,argSpeedLevel:6} as DataBar
        ,{isTest:false,type:1,argCount:1,argIncline:2,argKg:77,argKPH:4,argSeconds:5,argSpeedLevel:6} as DataBar
    ] as Array<DataBar>);

    useIonViewDidEnter(()=>{
        setTraningDetail({
            edit:true,
            type:1,
            url:"http://crm.lightestsport.com:8018/Appv4/Demo/action_mp4/1.mp4",
            // url:'https://www.w3school.com.cn/i/movie.ogg',
            name:'热身.伟大拉伸,很长的名字,很长的名字,很长的名字,很长的名字,很长的名字,很长的名字,很长的名字,很长的名字',
            memo:'备注：左右各15次算一组水电费水调歌头法国惹桃花不二分为访问法国,左右各15次算一组水电费水调歌头法国惹桃花不二分为访问法国左右各15次算一组水电费水调歌头法国惹桃花不二分为访问法国左右各15次算一组水电费水调歌头法国惹桃花不二分为访问法国左右各15次算一组水电费水调歌头法国惹桃花不二分为访问法国'
        } as any);
    });
    function addClick(item:DataBar) {
        traningDetailList.push(item);
        setTraningDetailList(traningDetailList)
        console.log(traningDetailList.length);
    }

    function successClick(sender:any,item:any,index:number){
        if (traningDetailList[index].StatusCode===2 || traningDetailList[index].StatusCode === 1)
            return ;
        traningDetailList[index].isTest = false;
        traningDetailList[index].StatusCode = 1;
        setTraningDetailList(traningDetailList)
    }
    function unsuccessClick(sender:any,item:any,index:number){
        if (traningDetailList[index].StatusCode===2 || traningDetailList[index].StatusCode === 1)
            return ;
        traningDetailList[index].StatusCode = 2;
        setTraningDetailList(traningDetailList)
    }
    function onchange(sender:any,item:DataBar,index:number,e:any) {
        alert(e.target.value);
        // alert(e.target.value);
        traningDetailList[index].argCount = parseInt(e.target.value);
        setTraningDetailList(traningDetailList)
    }

    return (
        <SpPageContainer title='计划卡片示例'>
            {/*http://192.168.1.110:8001/79ceeff8-8ae8-4490-a58c-10f1f9571015.mov*/}
            {/*http://192.168.1.110:8001/b43da1d1-28a4-47db-9368-7615ca7f4d1e.mov*/}
            {/*https://www.w3school.com.cn/i/movie.ogg*/}
            <div>PlanGroupData</div>
            <NumberLabel edit={true} inputtype={'numeric'} number={1} text={'居上'} align={"top"} status={1}></NumberLabel>
            <NumberLabel edit={false} inputtype={'numeric'} number={1.01} text={'居左'} align={"left"} status={1}></NumberLabel>
            <NumberLabel edit={true} inputtype={'numeric'} number={1.02} text={'居右'} align={"right"} status={2}></NumberLabel>
            <NumberLabel edit={true} inputtype={'numeric'} number={1.03} text={'居下'} align={"bottom"} status={1}></NumberLabel>
            <div></div>
            <div>类型1</div>
            <NumberLabelBar isTest={true} type={1} argCount={1} argIncline={2} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={1} />
            <NumberLabelBar isTest={false} type={1} argCount={1} argIncline={2} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={2} />
            <NumberLabelBar isTest={true} type={1} argCount={1} argIncline={2} argKg={3} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={2} />
            <NumberLabelBar isTest={false} type={1} argCount={1} argIncline={2} argKg={3} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={3} />
            <NumberLabelBar isTest={true} type={1} argCount={1} argIncline={2} argKg={3.33} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={3} argDistance={9.09} />
            <NumberLabelBar isTest={true} type={1} argCount={1} argIncline={2} argKg={3.33} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={3} argDistance={9.09} />

            <div>类型2</div>
            <NumberLabelBar isTest={false} type={2} argCount={1} argIncline={2} argKg={3} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={3} argDistance={9.99} />
            <div>类型3</div>
            <NumberLabelBar isTest={false} type={3} argCount={1} argIncline={2} argKg={3} argKPH={4} argSeconds={95} argSpeedLevel={6} StatusCode={3} argDistance={9.99} />
            <div>类型4</div>
            <NumberLabelBar isTest={true} type={4} argCount={1} argIncline={2} argKg={3} argKPH={4.45} argSeconds={95} argSpeedLevel={6} StatusCode={1} argDistance={9.99} />
            <NumberLabelBar isTest={false} type={4} argCount={1} argIncline={2} argKg={3} argKPH={4.14} argSeconds={95} argSpeedLevel={6} StatusCode={1} argDistance={9.99} />
            <div>类型5</div>
            <NumberLabelBar isTest={true} type={5} argCount={1} argIncline={2} argKg={3} argKPH={4.44} argSeconds={95} argSpeedLevel={6} StatusCode={2} argDistance={9.19} />
            <NumberLabelBar isTest={false} type={5} argCount={1} argIncline={2} argKg={3} argKPH={4.44} argSeconds={95} argSpeedLevel={6} StatusCode={2} argDistance={9.19} />
            <div>次数不可输入</div>
            <PlanGroup
                style={{margin:'0Px'}}
                id={"记录id"}
                pic={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/热身/腹部激活.jpg'}
                index={true}
                type={1}
                current={1}
                url={traningDetail.url}
                name={traningDetail.name}
                memo={traningDetail.memo}
                status={0}
                items={[
                    {isTest:true,StatusCode:1,type:1,argCount:1,argIncline:2,argKg:77,argKPH:4,argSeconds:95,argSpeedLevel:6} as DataBar
                    ,{isTest:false,StatusCode:1,type:1,argCount:1,argIncline:2,argKg:77,argKPH:4,argSeconds:95,argSpeedLevel:6} as DataBar
                ]}
                timeClick={(e:any)=>alert('计时器点击')}
                addClick={(sender:any,item:DataBar)=>addClick(item)}
                successClick={(sender:any,item:DataBar,index:number)=>successClick(sender,item,index)}
                unsuccessClick={(sender:any,item:DataBar,index:number)=>unsuccessClick(sender,item,index)}
                onchange={(sender:any,item:DataBar,index:number,e:any)=>onchange(sender,item,index,e)}
            >
            </PlanGroup>
            <div>次数不可输入</div>
            <PlanGroup
                style={{margin:'33Px'}}
                id={"记录id"}
                pic={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/热身/腹部激活.jpg'}
                current={1}
                index={true}
                type={2}
                url={traningDetail.url}
                name={traningDetail.name}
                memo={traningDetail.memo}
                status={1}
                items={[
                    {isTest:true,StatusCode:1,type:2,commit:false,argCount:1,argIncline:2,argKg:77,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10} as DataBar
                    ,{isTest:false,StatusCode:2,type:2,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10} as DataBar
                ]}
                timeClick={(e:any)=>alert('计时器点击')}
                addClick={(item:any,idx:number)=>addClick}
            >
            </PlanGroup>
            <PlanGroup
                style={{margin:'33Px'}}
                id={"记录id"}
                pic={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/热身/腹部激活.jpg'}
                current={1}
                index={true}
                type={3}
                status={0}
                url={traningDetail.url}
                name={traningDetail.name}
                memo={traningDetail.memo}
                items={[
                    {isTest:true,StatusCode:1,type:3,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10} as DataBar
                    ,{isTest:false,type:3,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10} as DataBar
                    ,{isTest:false,type:3,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10} as DataBar
                ]}
                timeClick={(e:any)=>alert('计时器点击')}
                addClick={(item:any,idx:number)=>addClick}
            >
            </PlanGroup>
            <PlanGroup
                style={{margin:'33Px'}}
                id={"记录id"}
                pic={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/热身/腹部激活.jpg'}
                current={1}
                index={true}
                type={4}
                url={traningDetail.url}
                name={traningDetail.name}
                memo={traningDetail.memo}
                status={0}
                items={[
                    {isTest:true,StatusCode:1,type:4,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10.00} as DataBar
                    ,{isTest:false,type:4,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10.00} as DataBar
                    ,{isTest:false,type:4,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10.00} as DataBar
                ]}
                timeClick={(e:any)=>alert('计时器点击')}
                addClick={(item:any,idx:number)=>addClick}
            >
            </PlanGroup>
            <PlanGroup
                style={{margin:'33Px'}}
                id={"记录id"}
                pic={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/热身/腹部激活.jpg'}
                current={1}
                index={false}
                type={5}
                url={traningDetail.url}
                name={traningDetail.name}
                memo={traningDetail.memo}
                status={0}
                items={[
                    {isTest:true,StatusCode:1,type:5,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10.00} as DataBar
                    ,{isTest:false,type:5,commit:false,argCount:1,argIncline:2,argKg:3,argKPH:4,argSeconds:95,argSpeedLevel:6,argDistance:10.00} as DataBar
                ]}
                timeClick={(e:any)=>alert('计时器点击')}
                addClick={(item:any,idx:number)=>addClick}
            >
            </PlanGroup>
        </SpPageContainer>
    )
}

export default PlanCardPage;
