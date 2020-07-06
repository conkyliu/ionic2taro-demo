import React, {useState} from 'react';
import {IonInput,IonRow,IonCol,IonItemDivider} from '@ionic/react';

import './ButtonPage.css';

import IconButton from "../components/IconButton";
import SpPageContainer from "./SpPageContainer";
import Keyboard from "../components/Keyboard";
import RadioGroup from "../components/RadioGroup";
import {OptionItem} from "../components/Options";
import icon_test from '../components/icon/btn_add.svg';
const ButtonPage: React.FC = () => {

    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState('');

    function click(sender:any,e:any){
        alert(sender.name)

    }
    function closeKeyboard(){
        setShowInput(false)
    }
    return (
        <SpPageContainer title='图标按钮组件' style={{backgroundColor:'#ff0000'}}>

            <IonRow style={{marginTop:'50px'}}>
                <RadioGroup style={{margin:'10px'}} multiSelect={true} maxSelect={2} repelValue={"6"} items={[
                    {name:"增脂减肥",value:"1"}
                    ,{name:"增肌塑形",value:"2"}
                    ,{name:"身体健康",value:"3"}
                    ,{name:"随便练练4",value:"4"}
                    ,{name:"随便练练5",value:"5"}
                    ,{name:"随便练练6",value:"6"}
                    ,{name:"全身",value:"7"}
                ]} onSelect={(sender:any,index:number,val:string[],items:OptionItem[])=>{alert(index)}}></RadioGroup>
            </IonRow>
            <IonRow style={{marginTop:'50px'}}>
                <RadioGroup style={{margin:'10px'}} normalColor={'#BFC9FF'} multiSelect={false} maxSelect={2} repelValue={"7"} items={[
                    {name:"test",title:"00:12:54",value:"1"}
                    ,{name:"1234",title:"00:22:54",value:"2"}
                    ,{name:"sdrf",title:"00:32:54",value:"3"}
                    ,{name:"asd",title:"00:42:54",value:"4"}
                    ,{name:"4rt",title:"00:52:54",value:"5"}
                    ,{name:"aa",value:"6"}
                    ,{name:"全身",value:"7"}
                ]} onSelect={(item:OptionItem)=>{}}></RadioGroup>
            </IonRow>

            <IonRow style={{marginTop:'50px'}}>
                <IonCol size={"4"} >
                    <IconButton name={'加一组'} icon={'add'} onClick={click}></IconButton>
                </IonCol>
                <IonCol size={"4"} >
                    <IconButton name={'计时器'} icon={'time'} onClick={click}></IconButton>
                </IonCol>
                <IonCol size={"5"} >
                    <IconButton name={'问一问'} icon={'question'} onClick={click}></IconButton>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size={"4"} >
                    <IconButton  style={{color:'blue'}} name={'加一组'} icon={'add'} onClick={click}></IconButton>
                </IonCol>
                <IonCol size={"4"} >
                    <IconButton style={{color:'#ff0000'}} name={'计时器'} icon={'time'} onClick={click}></IconButton>
                </IonCol>
                <IonCol size={"2"} >
                    <IconButton name={'问一问'} icon={'question'} onClick={click}></IconButton>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size={"4"} >
                </IonCol>
                <IonCol size={"4"} >
                </IonCol>
                <IonCol size={"4"} >
                </IonCol>
            </IonRow>
        </SpPageContainer>
    )
}

export default ButtonPage;
