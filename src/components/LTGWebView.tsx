import React from 'react';
import { IonContent } from '@ionic/react';
import './FullScreenADImg.css';


interface LTGWebViewProps {

    url?:string | undefined;
    
}


class SWebView extends React.Component<LTGWebViewProps>{

    render(){
        return(
            <IonContent>
                <iframe title="LTGWebView" style={{'width':'100%','height':'100%'}} scrolling='no' frameBorder='0' src={ this.props.url ==null?'about:blank;': decodeURIComponent(this.props.url)}></iframe>
            </IonContent>
        );
    }

}

export default SWebView;