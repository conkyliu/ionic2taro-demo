import React, {useState} from 'react';
import {IonInput,IonItemDivider} from '@ionic/react';

import './DataIndexPage.css';

import IconButton from "../components/IconButton";
import SpPageContainer from "./SpPageContainer";
import Keyboard from "../components/Keyboard";
import DataTile from "../components/DataTile";
import DataIndexTile from "../components/DataIndexTile";
import DataIndexBoard, {DataItem} from "../components/DataIndexBoard";
import TotalTile from "../components/TotalTile";
import IconLabel from "../components/IconLabel";

const DataIndexPage: React.FC = () => {

    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState('');

    function click(sender:any,e:any){
        alert(sender.name)

    }
    function closeKeyboard(){
        setShowInput(false)
    }
    let item:DataItem = {name:'综合评定',value:undefined} as DataItem

    return (
        <SpPageContainer title='按钮组件'>
            <IconLabel style={{color:'#BFC9FF'}} label={'2019/10/11 周日'}></IconLabel>
            <IconLabel style={{fontSize:'28Px'}} label={'2019/10/11 周日'}></IconLabel>
            <div>砖块</div>
            <div className={'item'} style={{width:'60Px'}}><DataTile title={'只做数据展示'} subtitle={'30分钟'}></DataTile></div>
            <div className={'tile'}>
                <div className={'item'}><DataTile title={'热.伟大拉伸'} subtitle={''}></DataTile></div>
                <div className={'item'}><DataTile title={'砖块组件,不可点击'} subtitle={'4组'}></DataTile></div>
            </div>
            <div className={'tile'}>
                <div className={'item'}><DataTile title={'热.伟大拉伸'} subtitle={'4组'}></DataTile></div>
                <div className={'item'}><DataTile title={'只做数据展示'} subtitle={'30分钟'}></DataTile></div>
            </div>
            <div style={{margin:'10Px auto'}}>
                <IonItemDivider>changeValue=null</IonItemDivider>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=null,changeValue=null'}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=61,changeValue=null'} value={61}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=60,changeValue=null'} value={60}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=59,changeValue=null'} value={59}/>
                </div>
                <IonItemDivider>changeValue=0</IonItemDivider>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=null,changeValue=0'} changeValue={0}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=61,changeValue=0'} value={61} changeValue={0}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=60,changeValue=0'} value={60} changeValue={0}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=59,changeValue=0'} value={59} changeValue={0}/>
                </div>
                <IonItemDivider>changeValue>0</IonItemDivider>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=null,changeValue=1'} changeValue={1}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=61,changeValue=2'} value={61} changeValue={2}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=60,changeValue=3'} value={60} changeValue={3}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=59,changeValue=4'} value={59} changeValue={4}/>
                </div>
                <IonItemDivider>changeValue&lt;0</IonItemDivider>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=null,changeValue=-1'} changeValue={-1}/>
                </div>
                <div style={{margin:'10Px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=61,changeValue=-2'} value={61} changeValue={-2}/>
                </div>
                <div style={{margin:'10px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=60,changeValue=-3'} value={60} changeValue={-3}/>
                </div>
                <div style={{margin:'10px auto',background:'#F5F6FF'}}>
                    <DataIndexTile name={'value=59,changeValue=-4'} value={59} changeValue={-4}/>
                </div>

            </div>

            <div className={'today'}>今日数据</div>
            <div style={{margin:'0px auto'}}>
                <DataIndexBoard style={{margin:'17px'}}
                    total={item}
                    item1={{name:'下肢力量',value:65,changeValue:5}}
                    item2={{name:'上肢力量',value:62,changeValue:5}}
                    item3={{name:'有氧能力',value:55,changeValue:-5}}
                    item4={{name:'腹部力量',value:60,changeValue:7}}
                ></DataIndexBoard>
            </div>
            <TotalTile
               style={{margin:'17px'}}
               left={{name:'总消耗',value:2345,unit:'Cal'}}
               right={{name:'总容量',value:0,unit:'Kg'}}
            />
        </SpPageContainer>
    )
}

export default DataIndexPage;
