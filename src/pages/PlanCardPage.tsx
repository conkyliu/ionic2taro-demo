import React, {  } from 'react';
import './PlanCardPage.css';

import SpPageContainer from './SpPageContainer';
import PlanCardAction from "../components/PlanCardAction";

const PlanCardPage: React.FC = () => {
    return (
        <SpPageContainer title='计划卡片示例'>
            {/*http://192.168.1.110:8001/79ceeff8-8ae8-4490-a58c-10f1f9571015.mov*/}
            {/*http://192.168.1.110:8001/b43da1d1-28a4-47db-9368-7615ca7f4d1e.mov*/}
            {/*https://www.w3school.com.cn/i/movie.ogg*/}
            <div>
                opacity=默认0.8
            </div>
            <PlanCardAction name='今日计划,按钮可点击' date={new Date()} title='opacity=0.5' subtitle='第1节,这里有详细内容哦,这里有详细内容哦,这里有详细内容哦,这里有详细内容哦,这里有详细内容哦' mode="start"
                            onClick={(e:any)=>alert(e)}
                            style={{opacity:"0.5",background:'#0c0c0c'}}
            >
            </PlanCardAction>
            <PlanCardAction name='文字换行文字换行文字换行文字换行文字换行文字换行文字换行' date={new Date()} title='休息日Rset Day 休息日Rset Day 休息日Rset Day 休息日Rset Day' subtitle='opacity=0.25' mode="finish"
                            onClick={(e:any)=>alert('完成训练')}
                            style={{opacity:"0.25",background:'#ff0000'}}
            >
            </PlanCardAction>
            <PlanCardAction name='opacity=1' date={new Date()} title='休息日Rset Day' subtitle='第1节' mode="add"
                            onClick={(e:any)=>alert('添加新计划')}
                            style={{opacity:"1"}}
            >
            </PlanCardAction>
            <PlanCardAction name='Unexpected template string expression Unexpected template string expression Unexpected template string expression '
                            date={new Date()} title='Unexpected template string expression Unexpected template string expression Unexpected template string expression ' subtitle='Unexpected template string expression' mode="finish"
                            onClick={(e:any)=>alert('完成训练')}
            >
            </PlanCardAction>
            <PlanCardAction
                name='Unexpected template string expression Unexpected template string expression Unexpected template string expression '
                date={new Date()}
                title='Unexpected template string expression Unexpected template string expression Unexpected template string expression '
                subtitle='Unexpected template string expression'
                mode="none"
                onClick={(e:any)=>alert('完成训练')}
            >
            </PlanCardAction>
        </SpPageContainer>
    )
}

export default PlanCardPage;
