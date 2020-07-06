import React, {useState} from 'react';
import './QuestionCardPage.css';

import SpPageContainer from './SpPageContainer';
import QuestionCard from "../components/QuestionCard";
import QuestionItem from "../components/QuestionItem";
import ReplyCard from "../components/ReplyCard";
import {IonButton, IonLabel, IonRow, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonText, IonImg, IonCol} from "@ionic/react";
import ImgPreview from "../components/ImgPreview";
import zhangfei from "./_imgs/zhangfei.jpg";

const imgList = ['data:image/png;base64,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'
                    ,'data:image/png;base64,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'
                    ,'data:image/png;base64,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'
                    ,'data:image/png;base64,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'
                ];

const QuestionCardPage: React.FC = () => {

    const[imageViewIndex,setImageViewIndex] = useState(-1);

    return (
        <SpPageContainer title='提问卡片'>

            <IonCard>

                <IonCardHeader>
                    <IonCardSubtitle>ImgPreview</IonCardSubtitle>
                    <IonCardTitle>图片预览</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                <IonText>用于打开预览页组件预览图片。</IonText>

                    <IonRow>
                        {
                            imgList.map((pic,index) => {
                                return <IonCol key={'imgPri'+index} size='3'><IonImg src={pic} onClick={(e)=>{setImageViewIndex(index)}}></IonImg></IonCol>
                            })
                        }
                    </IonRow>
                    <ImgPreview
                    pics={imgList}
                    current={imageViewIndex}
                    show={imageViewIndex>=0}
                    pager={false}
                    closeClick={(sender: any) => setImageViewIndex(-1)}
                    onSlideDidChange={(currIndex:number)=>{
                        setImageViewIndex(currIndex);
                    }}
                    >

                    </ImgPreview>
                </IonCardContent>
            </IonCard>


            <IonRow>
                <IonLabel>提问列表项</IonLabel>
            </IonRow>
            <IonRow>
                <QuestionItem
                    title={'肌肉训练后需要多久修复?肌肉训练后需要多久修复?'}
                    content={'深蹲的时候过度抬头会让重心前移失去平衡，可能会产生头晕现象？'}
                    date={new Date()}
                    pics={[require('../components/icon/question_icon_a.svg'),
                        require('../components/icon/list_icon_reply.svg'),
                        require('../components/icon/list_icon_solve.svg'),
                        require('../components/icon/question_icon_q.svg'),
                        require('../components/icon/question_icon_a.svg'),
                        require('../components/icon/question_icon_a.svg'),
                        // require('../components/icon/question_icon_a.svg'),
                        // require('../components/icon/question_icon_a.svg'),
                        require('../components/icon/question_icon_a.svg'),
                        require('../components/icon/list_icon_solve.svg'),
                    ]}
                    ownerNickname={"张飞"}
                    ownerAvatarPic={zhangfei}
                    StatusCode={1}
                    readed={2}
                    onClick={(sender:any)=>alert('点击卡片')}
                    picClick={(sender:any,num:number)=>{alert(num)}}
                >
                </QuestionItem>
            </IonRow>
            <IonRow style={{marginTop:'20px'}}>
                <QuestionItem
                    title={'肌肉训练后需要多久修复?肌肉训练后需要多久修复?'}
                    content={'深蹲的时候过度抬头会让重心前移失去平衡，可能会产生头晕现象？'}
                    date={new Date()}
                    StatusCode={2}
                    readed={1}
                    ownerNickname={"张飞"}
                    ownerAvatarPic={zhangfei}
                ></QuestionItem>
            </IonRow>
            <IonRow style={{marginTop:'20px'}}>
                <QuestionItem
                    title={'肌肉训练后需要多久修复?肌肉训练后需要多久修复?'}
                    content={'深蹲的时候过度抬头会让重心前移失去平衡，可能会产生头晕现象？'}
                    date={new Date()}
                    StatusCode={3}
                    readed={1}
                    ownerNickname={"张飞"}
                    ownerAvatarPic={zhangfei}
                ></QuestionItem>
            </IonRow>
            <IonRow style={{marginTop:'20px'}}>
                <QuestionItem
                    title={'肌肉训练后需要多久修复?肌肉训练后需要多久修复?'}
                    content={'深蹲的时候过度抬头会让重心前移失去平衡，可能会产生头晕现象？'}
                    date={new Date()}
                    StatusCode={4}
                    readed={1}
                ></QuestionItem>
            </IonRow>
            <IonRow style={{marginTop:'20px'}}>
                <QuestionItem
                    title={'肌肉训练后需要多久修复?肌肉训练后需要多久修复?'}
                    content={'深蹲的时候过度抬头会让重心前移失去平衡，可能会产生头晕现象？'}
                    date={new Date()}
                    StatusCode={1}
                    readed={3}
                    ownerNickname={"张飞ABC202020202"}
                    ownerAvatarPic={zhangfei}
                ></QuestionItem>
            </IonRow>


            <IonRow style={{marginTop:'50px'}}>
                <IonLabel>提问卡片</IonLabel>
            </IonRow>
            <IonRow>
            <QuestionCard
                title={'肌肉训练后需要多久修复?肌肉训练后需要多久修复?'}
                content={'深蹲的时候过度抬头会让重心前移失去平衡，可能会产生头晕现象？'}
                date={new Date()}
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
            >
                <IonRow>
                    <IonButton>按钮</IonButton>
                </IonRow>
            </QuestionCard>
            </IonRow>
        </SpPageContainer>
    )
}

export default QuestionCardPage;
