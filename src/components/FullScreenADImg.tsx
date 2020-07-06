import React from 'react';
import { IonContent, IonImg, IonFab, IonButton, IonFabButton, IonText, withIonLifeCycle, IonPage } from '@ionic/react';
import './FullScreenADImg.css';
import { Redirect} from 'react-router';

interface FullScreenADImgProps {
    /* 图片地址 */
    src?: string;
    /* 获取图片地址的URL */
    fetch?: string;
    /* 倒计时 */
    interval?: number;
    /* 是否自动关闭 */
    autoClose?: boolean | true;
    /* 倒计时间是否可以直接跳过 ，否时显示 '等待' */
    canSkip?: boolean | true;
    /* 点关闭后返回的页面 */
    redirectUrl?: string;
    /* 图片链接 */
    adURL?: string;
}

interface FullScreenADImgState {
    interval?: number;
}


class FullScreenADImg extends React.Component<FullScreenADImgProps> {

    interval: number | null;
    redirect: JSX.Element | undefined | null;
    closed: boolean | undefined;

    constructor(props: Readonly<FullScreenADImgProps>) {

        super(props);

        this.interval = props.interval == null ? null : props.interval;
        this.closeBtnClick = this.closeBtnClick.bind(this);
        this.gotoADUrl = this.gotoADUrl.bind(this);
        
    }

    closeBtnClick = (event: any) => {
        event.preventDefault();
        if (this.props.canSkip === true
            || this.interval === null
            || (this.interval !== null && this.interval <= 0)) {
            this.setRedirect();
        }
    }

    setRedirect() {
        if(this.closed){
            return;
        }
        if (this.props.redirectUrl != null) {
            this.redirect = <Redirect to={ this.props.redirectUrl} ></Redirect>
        } else {
            this.redirect = <Redirect to="/" ></Redirect>
        }
        this.setState({
            interval: this.interval
        });
        this.closed = true;

    }

    gotoADUrl(e: any) {
        e.preventDefault();
        if (this.props.adURL == null) {
            return;
        }
        else {
            this.redirect = <Redirect to={this.props.adURL} ></Redirect>
            this.closed = true;
            this.setState({
                interval: this.interval
            });
        }

    }

    timer_run() {
        if(this.closed){
            return;
        }
        if (this.interval !== null && !isNaN(this.interval) && this.interval > 0) {

            this.interval -= 1;
            if (this.interval <= 0 && this.props.autoClose === true) {
                this.setRedirect();
            }
            else {
                this.setState({
                    interval: this.interval
                });

                setTimeout(() => {
                    this.timer_run();
                }, 1000);
            }
        }
    }

    ionViewDidEnter() {
        this.closed = false;
        this.interval = this.props.interval?? null;
        this.redirect = null;
        if (this.interval == null) {
            return;
        }
        this.setState({
            interval: this.interval
        });
        setTimeout(() => {
            this.timer_run();
        }, 1000);
    }

    fabButtonView() {
        if (this.interval === null || this.interval === 0) {
            return (
                <IonFabButton activated={true} size='small' color='light' onClick={this.closeBtnClick} >
                </IonFabButton>
            );
        } else {
            return (
                <IonButton className='skepBtn' fill='solid' size='small' color='light' onClick={this.closeBtnClick}>
                    <IonText> {this.props.canSkip === true ? '跳过' : '等待'} {'(' + this.interval + 's)'}</IonText>
                </IonButton>
            )
        }
    }


    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonImg onClick={this.gotoADUrl}
                        src={this.props.src ?? ''}>
                    </IonImg>
                    <IonFab hidden={this.closed} activated={true} vertical='top' horizontal="end" slot='fixed'>
                        <br />
                        {this.fabButtonView()}
                    </IonFab>
                    {this.redirect}
                </IonContent>
            </IonPage>
        );
    }

}


export default withIonLifeCycle(FullScreenADImg);