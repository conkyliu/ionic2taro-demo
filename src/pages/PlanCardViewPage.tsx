import React, {  } from 'react';
import './PlanCardPage.css';

import SpPageContainer from './SpPageContainer';
import PlanCardView from "../components/PlanCardView";



const PlanCardPage: React.FC = () => {
    return (
        <SpPageContainer title='计划卡片示例'>
            {/*http://192.168.1.110:8001/79ceeff8-8ae8-4490-a58c-10f1f9571015.mov*/}
            {/*http://192.168.1.110:8001/b43da1d1-28a4-47db-9368-7615ca7f4d1e.mov*/}
            {/*https://www.w3school.com.cn/i/movie.ogg*/}
            <div style={{margin:'18Px'}}>
                <PlanCardView id={"卡片id"}  name='可以点击,文字很长,省略----卡片说明内容卡片说明内容卡片说明内容' title='卡片说明内容,这个很长,卡片说明内容,这个很长' memo='Personal Tailor' image={require("./_imgs/20200327184741.jpg")}
                               onClick={(e:any,id:string)=>{alert(id)}}/>

            </div>
            <div style={{margin:'18Px'}}>

                <PlanCardView  id={"卡片id"}  name='卡片可点击' title='免费标签,文字目前不可变' memo='Personal TailorPersonal TailorPersonal TailorPersonal TailorPersonal Tailor' image={"./_imgs/20200327184741.jpg"}
                               onClick={(e:any,id:string)=>{alert('可以点击')}}
                />
            </div>
            <div style={{margin:'18Px'}}>
                <PlanCardView  id={"卡片id"}  name='默认背景' title='可以点击的卡片' memo='Personal Tailor' image={require("./_imgs/20200327184741.jpg")}/>
            </div>

        </SpPageContainer>
    )
}

export default PlanCardPage;
