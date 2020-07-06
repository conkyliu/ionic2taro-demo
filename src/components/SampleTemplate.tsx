import React from 'react';

import {IonCard} from '@ionic/react';
import LocalizedStrings from 'react-localization';
import './QuestionCard.css';

let defaultLangPackage = {
    'en': {
        'btnstart':"start plan",
    },
    'zh-CN': {
        'btnstart':"开始训练",
    }
};

interface AskCardProps {
    style?:{};
    langPackage?:Object;
}

interface AskCardState {
}

class SampleTemplate extends React.Component<AskCardProps,AskCardState> {
    localStrings: any | undefined;
    constructor(props:any){
        super(props);
        if(props.langPackage!=null){
            for(var key in props.langPackage){
                switch(key){
                    case 'en':
                        defaultLangPackage.en =  {...defaultLangPackage.en,...props.langPackage[key]};
                        break;
                    case 'zh-CN':
                        defaultLangPackage["zh-CN"] = {...defaultLangPackage['zh-CN'],...props.langPackage[key]};
                        break;
                    default:
                        defaultLangPackage = {...defaultLangPackage, ...props.langPackage};
                        break;
                }
            }
        }
        this.localStrings = new LocalizedStrings(defaultLangPackage);
    };

    render(){
        return(
            <IonCard className="card" style={this.props.style}>
            </IonCard>
        );
    };
}

export default SampleTemplate;
