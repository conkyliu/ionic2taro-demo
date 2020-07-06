import React from 'react';
import './PopDialog.css';

interface PopDialogProps {
    style?:{}
    show:boolean;
}

export default class PopDialog extends React.Component<PopDialogProps> {

    render(){
        if (this.props.show){
            return <div className={'qjs-popdialog'}>
                <div className={'body'}>
                    {this.props.children}
                </div>
            </div>
        }else{
            return <></>
        }
    };
}

