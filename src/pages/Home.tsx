import { IonContent, IonHeader, IonFooter, IonPage, IonThumbnail, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { text, cloudUpload, book, radioButtonOffOutline, personCircle, calendarOutline, iceCream, earth, person, card, options } from 'ionicons/icons';

import {SplashScreen} from '@ionic-native/splash-screen';
import React from 'react';
import './Home.css';

import AppHelper from '../utility/NativeUtil';
import DataAPI from '../utility/LTGHttp';

const Home: React.FC = () => {
  /*
  检查TOKEN信息，如果没有则自动匿名登录。
  */
  useIonViewWillEnter(() => {

    // console.log('Check the stored token.');
    // AppHelper.SecureValue.Get("user", "token").then(value => {
    //   if (value == null || value === "") {
    //     console.log("There is token is empty , it will login as an anonymous user .");
    //     DataAPI.LoginAsAnonymous();
    //   } else {
    //     console.log("Read token value:", value);
    //   }
    // }, (err) => console.error(err));
    SplashScreen.hide();
  }
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          <IonTitle>LTG App UI组件 </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList >
          <IonItem button={true} routerLink='/app' routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={book} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>应用信息</h3>
              <h2>App Information</h2>
              <p color="secondary">
                应用环境信息获取
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink='/app/dataapi' routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={cloudUpload} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>通用数据接口</h3>
              <h2>Common DATA API</h2>
              <p color="secondary">
                快速可扩展的数据接口
              </p>
            </IonLabel>

          </IonItem>


          <IonItem button={true} routerLink='/home/calendar' routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={calendarOutline} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>训练日历组件</h3>
              <h2>Calendar</h2>
              <p color="secondary">
                能显示训练计划的相关标记的日历。
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink='/home/login' routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={person} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>登录件套</h3>
              <h2>LoginSuite</h2>
              <p color="secondary">
                用户登入并输出登入信息
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink='/home/authchecker' routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={personCircle} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>身份检查</h3>
              <h2>AuthChecker</h2>
              <p color="secondary">
                验证当前用户身份。
  </p>
            </IonLabel>

          </IonItem>


          <IonItem button={true} routerLink="/home/adimgsamples" routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={iceCream} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>广告组件</h3>
              <h2>AdImg</h2>
              <p color="secondary">
                显示广告媒体，并可以跳转到指定页
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink="/home/ovalbutton" routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={radioButtonOffOutline} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>主圆形按钮</h3>
              <h2>OvalButton</h2>
              <p color="secondary">
                LTG主页按钮。
             </p>
            </IonLabel>

          </IonItem>


          <IonItem button={true} routerLink="/home/webview/http%3A%2F%2Fwww.lightestsport.com" routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={earth} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>Web页面</h3>
              <h2>WebView</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink="/home/fontSamples" routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={text} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3>语言&字体</h3>
              <h2>Localized&Font</h2>
              <p color="secondary">
                字体及多语言支持
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink="/home/button" routerDirection='forward'>

            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>图标按钮</h3>
              <h2>icon button</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button={true} routerLink="/home/plancardaction" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>训练计划卡片</h3>
              <h2>Plan Card</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
                    </p>
            </IonLabel>

          </IonItem>
          <IonItem button={true} routerLink="/home/plancardrate" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>计划卡片--进度条</h3>
              <h2>Plan Card Rate</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>

          </IonItem>
          <IonItem button={true} routerLink="/home/plancardview" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>计划卡片--测试卡</h3>
              <h2>Plan Card View</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>

          </IonItem>
          <IonItem button={true} routerLink="/home/plancarditem" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>计划卡片--列表卡</h3>
              <h2>Plan Card Item</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>

          </IonItem>
          <IonItem button={true} routerLink="/home/plangroup" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>

            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>计划卡片--计划组</h3>
              <h2>PlanGroup</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>

          </IonItem>

          <IonItem button={true} routerLink="/home/select" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={options} size='large'></IonIcon>
            </IonThumbnail>
            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>选择组件</h3>
              <h2>Select Component</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button={true} routerLink="/home/questioncard" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>
            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>提问卡片组件</h3>
              <h2>QuestionCard Component</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button={true} routerLink="/home/answercard" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>
            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>回答卡片组件</h3>
              <h2>AnswerCard Component</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>
          </IonItem>
          <IonItem button={true} routerLink="/home/stepbar" routerDirection='forward'>
            <IonThumbnail className="ion-text-center">
              <IonIcon src={card} size='large'></IonIcon>
            </IonThumbnail>
            <IonLabel>
              <h3 style={{ color: '#ff0000' }}>步骤条 && 进度条</h3>
              <h2>StepBar && ScaleBar Component</h2>
              <p color="secondary">
                用于浏览应用外WEB页面。
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar className="ion-text-center">
          <IonTitle>LTGAppUI</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
