import React, {  } from 'react';
import './PlanCardPage.css';

import SpPageContainer from './SpPageContainer';
import PlanCardRate from "../components/PlanCardRate";

const PlanCardPage: React.FC = () => {
    return (
        <SpPageContainer title='计划卡片示例'>
            {/*http://192.168.1.110:8001/79ceeff8-8ae8-4490-a58c-10f1f9571015.mov*/}
            {/*http://192.168.1.110:8001/b43da1d1-28a4-47db-9368-7615ca7f4d1e.mov*/}
            {/*https://www.w3school.com.cn/i/movie.ogg*/}
                <div>锁住不能点击
                        <PlanCardRate
                            finish={6}
                            unfinish={3}
                            image={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/1.jpg'}
                            name={'坐姿推胸坐姿推胸坐姿推胸坐姿推胸'} teamNo={10} state={0} memo={'三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器'} tags={'背部'}
                            onClick={(e:any)=>alert('点击按钮')}
                        />
                </div>
            <div>名称,说明  换行省略
            <PlanCardRate
                          finish={6}
                          unfinish={3}
                          image={'http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/1.jpg'} name={'坐姿推胸坐姿推胸坐姿推胸坐姿推胸'} teamNo={10} state={3} memo={'三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器'} tags={'背部'}
                          onClick={(e:any)=>alert('点击按钮')}
            />
            </div>
            <div>短名称
            <PlanCardRate
                          finish={10}
                          unfinish={0}
                          image={"http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/6.jpg"} name={'坐姿推胸'} teamNo={10} state={1} memo={'三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器三功推举训练器'} tags={'背部'}
                          onClick={(e:any)=>alert('点击按钮')}
            />
            </div>
            <div>标签很长
            <PlanCardRate
                          finish={1}
                          unfinish={3}
                          image={"http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/3.jpg"} name={'坐姿推胸,121223433344'} teamNo={10} state={2} memo={'三功推举训练器'} tags={'三功推举训练器'}
                          onClick={(e:any)=>alert('点击按钮')}
            />
            </div>
            <div>英文内容
            <PlanCardRate
                          finish={1}
                          unfinish={3}
                          image={"http://crm.lightestsport.com:8018/Appv4/Demo/action_imgs/6.jpg"} name={'english name,english nameenglish nameenglish name'} teamNo={10} state={3} memo={'https://lanhuapp.com/web/item/project/board/detail'} tags={'my finsh'}
                          onClick={(e:any)=>alert('点击按钮')}
            />
            </div>
        </SpPageContainer>
    )
}

export default PlanCardPage;
