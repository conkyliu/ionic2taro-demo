import React, {  } from 'react';
import './PlanCardPage.css';

import SpPageContainer from './SpPageContainer';
import PlanCardItem from "../components/PlanCardItem";



const PlanCardPage: React.FC = () => {
    return (
        <SpPageContainer title='计划卡片示例'>
            {/*http://192.168.1.110:8001/79ceeff8-8ae8-4490-a58c-10f1f9571015.mov*/}
            {/*http://192.168.1.110:8001/b43da1d1-28a4-47db-9368-7615ca7f4d1e.mov*/}
            {/*https://www.w3school.com.cn/i/movie.ogg*/}
            <div style={{margin:'18Px'}}>

                <PlanCardItem
                    name={'assss'}
                    memo={''}
                    tags={'[]'}
                    rate={0}
                    use={0}
                    free={false}
                    image={''}
                    series={true}
                >
                </PlanCardItem>
            </div>

            <div style={{margin:'18Px'}}>
                <PlanCardItem
                    name={"卡片可以点击"}
                    memo={'入门难度'}
                    tags={'[1,2,3,4]'}
                    rate={0}
                    use={2156}
                    image={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/6.jpg'}
                    onClick={(e:any)=>alert('点击反馈')}
                    series={true}
                >
                </PlanCardItem>
            </div>
            <div style={{margin:'18px'}}>

                <PlanCardItem
                    name={"进度10%-文字太长省略---------未完成"}
                    memo={'免费标签,图片带中文,还需要一个测试标签'}
                    tags={'[1,2,3,4]'}
                    rate={10}
                    use={2156}
                    image={require("./_imgs/20200327184741.jpg")}
                >
                </PlanCardItem>
            </div>
            <div style={{margin:'18px'}}>
                <PlanCardItem
                    name={"卡片不可以点击"}
                    memo={'入门难度2'}
                    tags={'[1,2,3,4]'}
                    rate={100}
                    use={102}
                    image={require("./_imgs/20200327184741.jpg")}
                    >
                </PlanCardItem>
            </div>
            <div style={{margin:'18px'}}>

                <PlanCardItem
                    name={"name linfoquan name linfoquan name linfoquan name linfoquan name linfoquan "}
                    memo={'this is memo long long long long long long long ago'}
                    tags={'[1,2,3,4]'}
                    rate={99}
                    use={2100000056}
                    image={require("./_imgs/20200327184741.jpg")}
                >
                </PlanCardItem>
            </div>
        </SpPageContainer>
    )
}

export default PlanCardPage;
