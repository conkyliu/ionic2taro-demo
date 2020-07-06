import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import CalendarSamples from './pages/CalendarSamples';
import ADImgSamples from './pages/ADImgSamples';
import FullADImgSPage from './pages/AdPages/FullADImgSPage';
import FullADImgSPage2 from './pages/AdPages/FullADImgSPage2';
import FullADImgSPage3 from './pages/AdPages/FullADImgSPage3';
import FontSamples from './pages/FontSamples';
import PlanCardPage from './pages/PlanCardPage';
import PlanCardRatePage from './pages/PlanCardRatePage';
import PlanCardItemPage from './pages/PlanCardItemPage';
import PlanCardViewPage from './pages/PlanCardViewPage';
import PlanGroupPage from './pages/PlanGroupPage';
import SelectPage from './pages/SelectPage';
import ReplyCardPage from './pages/ReplyCardPage';
import QuestionCardPage from './pages/QuestionCardPage';
import StepBarPage from './pages/StepBarPage';
import ButtonPage from './pages/ButtonPage';
import DataIndexPage from './pages/DataIndexPage';
import './app.scss'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import FullADImgSPage4 from './pages/AdPages/FullADImgSPage4';
import LTGWebViewPage from './pages/LTGWebViewSample';
import LoginPage from './pages/LoginPage';
import AppInfo from './pages/AppInfo';
import PickerDemo from './pages/PickerDemo';
import OvalButtonSamples from './pages/OvalButtonSamples';
import DataAPITester from './pages/DataAPITester';
import AuthChecker from './utility/User';
import AuthCheckPage from './pages/AuthCheckPage';
import ImageResizePage from './pages/ImageResizePage';
import DynamicsListPage from './pages/DynamicsListPage';
import DialogPage from "./pages/DialogPage";
import WeChatWebViewPage from './pages/WeChatWebViewPage';
import FileInputPage from './pages/FileInputPage';

const App: React.FC = (props) => (

  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home}  exact={true} />
        <Route path='/app' component={AppInfo} exact={true} />
        <Route path='/app/dataapi' component={DataAPITester} exact={true} />
        <Route path='/home/login' component={LoginPage}  exact={true}/>
        <Route path='/home/authchecker' component={AuthCheckPage}  exact={true}/>
        <Route path='/home/ovalbutton' component={OvalButtonSamples}  exact={true}/>
        <Route path='/home/calendar' component={CalendarSamples}  exact={true}/>
        <Route path='/home/adimgsamples' component={ADImgSamples}   exact={true}/>
        <Route path='/home/adimg/pages/fullpageadimg'  component={FullADImgSPage} />
        <Route path='/home/adimg/pages/fullpageadimg2'  component={FullADImgSPage2} />
        <Route path='/home/adimg/pages/fullpageadimg3'  component={FullADImgSPage3} />
        <Route path='/home/adimg/pages/fullpageadimg4'  component={FullADImgSPage4} />
        <Route path='/home/webview/:url'  component={LTGWebViewPage} exact={true} />
        <Route path='/home/fontSamples' component={FontSamples} />
        <Route path='/home/plancardaction' component={PlanCardPage} />
        <Route path='/home/plancardrate' component={PlanCardRatePage} />
        <Route path='/home/plancarditem' component={PlanCardItemPage} />
        <Route path='/home/plancardview' component={PlanCardViewPage} />
        <Route path='/home/plangroup' component={PlanGroupPage} />
        <Route path='/home/select' component={SelectPage} />
        <Route path='/home/replycard' component={ReplyCardPage} />
        <Route path='/home/questioncard' component={QuestionCardPage} />
        <Route path='/home/stepbar' component={StepBarPage} />
        <Route path='/home/button' component={ButtonPage} />
        <Route path='/home/dataindex' component={DataIndexPage} />
        <Route path='/home/dialog' component={DialogPage} />
        <Route path='/samples/IonPickerSample' component={PickerDemo} />
        <Route path='/samples/ImageResizePage' component={ImageResizePage} />
        <Route path='/samples/DynamicsListPage' component={DynamicsListPage} />
        <Route path='/samples/WeChatWebViewPage' component={WeChatWebViewPage} />
        <Route path='/samples/FileInputPage' component={FileInputPage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>

);

export default App;
