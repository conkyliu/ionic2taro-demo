import React, {  } from 'react';
import './ReplyCardPage.css';

import SpPageContainer from './SpPageContainer';
import ReplyCard from "../components/ReplyCard";
import {IonButton, IonRow} from "@ionic/react";

const ReplyCardPage: React.FC = () => {
    return (
        <SpPageContainer title='回答卡片'>
            <ReplyCard
                type={1}
                pics={[require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/list_icon_reply.svg'),
                    require('../components/icon/list_icon_solve.svg'),
                    require('../components/icon/question_icon_q.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/list_icon_solve.svg'),
                ]}
                content={'大肌群需要48-72小时来恢复生长，小肌群相对需要时间更短。'}
                date={new Date()} coachNickname={'Max教练'} coachCert={'轻健身教练，NSCA认证教练'}
                onClick={(sender:any)=>alert('点击卡片')}
                picClick={(sender:any,i:number)=>{alert('点击图片:'+i)}}
            >

            </ReplyCard>
            <ReplyCard
                type={2}
                pics={[require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/list_icon_reply.svg'),
                    require('../components/icon/list_icon_solve.svg'),
                    require('../components/icon/question_icon_q.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/question_icon_a.svg'),
                    require('../components/icon/list_icon_solve.svg'),
                ]}
                content={'大肌群需要48-72小时来恢复生长，小肌群相对需要时间更短。'}
                        date={new Date()} coachNickname={'Max教练'} coachCert={'轻健身教练，NSCA认证教练'}>
                <IonRow>
                    <IonButton>按钮</IonButton>
                </IonRow>
            </ReplyCard>
        </SpPageContainer>
    )
}

export default ReplyCardPage;
