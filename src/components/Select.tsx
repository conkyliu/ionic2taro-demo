import React from 'react';

import {
    IonLabel, IonIcon, IonDatetime, IonPicker, IonCol, IonRow, IonText
} from '@ionic/react';

import { PickerColumn, PickerButton } from '@ionic/core'
import icon_birth from './icon/data_icon_birth.svg'
import icon_gender from './icon/data_icon_gender.svg'
import icon_height from './icon/data_icon_height.svg'
import icon_weight from './icon/data_icon_weight.svg'
import { caretDown } from 'ionicons/icons'
import './Select.css';
import { PickerColumnOption } from "@ionic/core/dist/types/components/picker/picker-interface";

interface SelectProps {
    style?: {}
    langPackage?: Object;
    onSelect?: Function;
    title?: string
    type: 'gender' | 'birthday' | 'height' | 'weight'
    require?: boolean
    value?: string
    unit?: string
}

interface SelectState {
    // icon?:string;
    isOpen: boolean;
    selectValue: string;
    selectText?: string;
}
let options: PickerColumnOption[] = [
    { text: "男", value: "0" },
    { text: "女", value: "1" }
];
export default class Select extends React.Component<SelectProps, SelectState> {

    icon: string | undefined;
    constructor(props: any) {
        super(props);
        this.icon = icon_gender;
        let value = this.props?.value??'';
        if(value != value|| value==="NaN") {
            value = '';
        }
        if (this.props.type === 'gender') {
            this.icon = icon_gender;
            let selected: boolean = false;
            let index: number = -1;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value == value) {
                    selected = true;
                    index = i;
                    break;
                }
            }
            if (selected) {
                this.state = { isOpen: false, selectText: options[index].text, selectValue: options[index].value }
            } else {
                this.state = { isOpen: false, selectText: undefined, selectValue: value }
            }
        } else if (this.props.type === 'birthday') {
            this.icon = icon_birth;

            this.state = { isOpen: false, selectText: '', selectValue: value }
        } else if (this.props.type === 'height') {
            this.icon = icon_height;
            this.state = { isOpen: false, selectText: '', selectValue: value}
        } else if (this.props.type === 'weight') {
            this.icon = icon_weight;
            this.state = { isOpen: false, selectText: '', selectValue: value }
        }
    };
    render() {
        if (this.props.type === 'gender') {
            let column1 = {
                name: "height1",
                align: "right",
                columnWidth: '200Px',
                selectedIndex: 0,
                suffix: this.props.unit,
                options: options
            } as PickerColumn;
            let buttons = [
                {
                    text: '取消',
                    role: "cancel",
                    handler: value => {
                        this.setState({ isOpen: false })
                    }
                },
                {
                    text: '确定',
                    handler: value => {
                        let idx = column1.selectedIndex;
                        let value2
                        if (idx != null) {
                            value2 = column1.options[idx].value
                            this.setState({ isOpen: false, selectText: column1.options[idx].text, selectValue: value2 })
                        }
                        this.setState({ isOpen: false })
                        this.props.onSelect?.call(this, value2)
                    }
                }
            ] as PickerButton[]
            return (
                <IonRow className={'qjs-select'} style={this.props.style} onClick={() => this.setState({ isOpen: true })}>
                    <IonCol size='2'>
                        <IonIcon className={'icon '} src={this.icon}></IonIcon>  </IonCol>
                    <IonCol size='3'>
                        <IonText className={'title '}>{this.props.title}{this.props.require === true ? '*' : ''}</IonText>
                    </IonCol>
                    <IonCol className='ion-text-right value'>
                        <IonLabel >{this.state.selectText != null ? this.state.selectText + this.props.unit : '请选择'}
                            <IonPicker
                                isOpen={this.state.isOpen} columns={[column1]} buttons={buttons}
                            />
                        </IonLabel>
                    </IonCol>
                    <IonCol size='1'>
                        <IonIcon className={'action'} src={caretDown}></IonIcon>
                    </IonCol>
                </IonRow>
            );
        }
        if (this.props.type === 'height') {
            var height1Column = {
                name: "height1",
                align: "right",
                columnWidth: '200Px',
                options: [
                    { text: "1", value: "1" },
                    { text: "2", value: "2" }
                ]
            } as PickerColumn;

            var height2Column = {
                name: "height2",
                selectedIndex: 7,
                align: "right",
                options: [
                    { text: "0", value: "0" },
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    { text: "6", value: "6" },
                    { text: "7", value: "7" },
                    { text: "8", value: "8" },
                    { text: "9", value: "9" },
                ]
            } as PickerColumn;

            var height3Column = {
                name: "height3",
                selectedIndex: 0,
                align: "right",
                suffix: this.props.unit,
                options: [
                    { text: "0", value: "0" },
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    { text: "6", value: "6" },
                    { text: "7", value: "7" },
                    { text: "8", value: "8" },
                    { text: "9", value: "9" },
                ]
            } as PickerColumn;

            let buttons = [
                {
                    text: '取消',
                    role: "cancel",
                    handler: (value) => {
                        this.setState({ isOpen: false })
                    }
                },
                {
                    text: '确定'
                    , handler: (value) => {
                        let heightVal = ((height1Column.selectedIndex ?? 0) + 1) * 100 +
                            (height2Column.selectedIndex ?? 0) * 10 +
                            (height3Column.selectedIndex ?? 0);
                        this.setState({ isOpen: false, selectValue: '' + heightVal })
                        this.props.onSelect?.call(this, this.state.selectValue)
                    }
                }
            ] as PickerButton[]

            return (
                <IonRow className={'qjs-select'} style={this.props.style} onClick={() => this.setState({ isOpen: true })}>
                    <IonCol size='2'>
                        <IonIcon className={'icon '} src={this.icon}></IonIcon>
                    </IonCol>
                    <IonCol size='3'>
                        <IonText className={'title '}>{this.props.title}{this.props.require === true ? '*' : ''}</IonText>
                    </IonCol>
                    <IonCol className='ion-text-right value'>
                        <IonLabel >
                            {this.state.selectValue ? this.state.selectValue + this.props.unit : '请选择'}
                            <IonPicker
                                isOpen={this.state.isOpen}
                                columns={[height1Column, height2Column, height3Column]}
                                buttons={buttons} />
                        </IonLabel>
                    </IonCol>
                    <IonCol size='1'>
                        <IonIcon className={'action'} src={caretDown}></IonIcon>
                    </IonCol>
                </IonRow>
            );
        }
        if (this.props.type === 'weight') {
            var column1 = {
                name: "height1",
                align: "right",
                columnWidth: '200Px',
                selectedIndex: 0,
                options: [
                    { text: "0", value: "0" },
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                ]
            } as PickerColumn;

            var column2 = {
                name: "height2",
                selectedIndex: 6,
                align: "right",
                options: [
                    { text: "0", value: "0" },
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    { text: "6", value: "6" },
                    { text: "7", value: "7" },
                    { text: "8", value: "8" },
                    { text: "9", value: "9" },
                ]
            } as PickerColumn;
            var column3 = {
                name: "height3",
                selectedIndex: 5,
                align: "right",
                suffix: this.props.unit,
                options: [
                    { text: "0", value: "0" },
                    { text: "1", value: "1" },
                    { text: "2", value: "2" },
                    { text: "3", value: "3" },
                    { text: "4", value: "4" },
                    { text: "5", value: "5" },
                    { text: "6", value: "6" },
                    { text: "7", value: "7" },
                    { text: "8", value: "8" },
                    { text: "9", value: "9" },
                ]
            } as PickerColumn;
            let buttons = [
                {
                    text: '取消',
                    role: "cancel",
                    handler: (value) => {
                        this.setState({ isOpen: false })
                    }
                },
                {
                    text: '确定',
                    handler: (value) => {
                        let heightVal = ((column1.selectedIndex ?? 0)) * 100 +
                            (column2.selectedIndex ?? 0) * 10 +
                            (column3.selectedIndex ?? 0);
                        this.setState({ isOpen: false, selectValue: '' + heightVal })
                        this.props.onSelect?.call(this, this.state.selectValue)
                    }
                }
            ] as PickerButton[]
            return (
                <IonRow className={'qjs-select'} style={this.props.style} onClick={() => this.setState({ isOpen: true })}>
                    <IonCol size='2'>
                        <IonIcon className={'icon '} src={this.icon}></IonIcon>
                    </IonCol>
                    <IonCol size='3'>
                        <IonText className={'title '}>{this.props.title}{this.props.require === true ? '*' : ''}</IonText>
                    </IonCol>
                    <IonCol className='ion-text-right value'>
                        <IonLabel >{this.state.selectValue ? this.state.selectValue + this.props.unit : '请选择'}
                            <IonPicker isOpen={this.state.isOpen}
                                columns={[column1, column2, column3]}
                                buttons={buttons} />
                        </IonLabel>
                    </IonCol>
                    <IonCol size='1'>
                        <IonIcon className={'action'} src={caretDown}></IonIcon>
                    </IonCol>
                </IonRow>
            );
        }

        if (this.props.type === 'birthday') {
            let years = []
            for(let i=2010;i>=1910;i--){
                years.push(i);
            }
            return (
                <IonRow className={'qjs-select'} style={this.props.style} >
                    <IonCol size='2' className='ion-align-self-start'>
                        <IonIcon className='icon ' src={this.icon}></IonIcon>
                    </IonCol>
                    <IonCol size='3'>
                        <IonText className={'title '}>{this.props.title}{this.props.require ? '*' : ''}</IonText>
                    </IonCol>
                    <IonCol className={'value ion-text-right'}>
                        <IonDatetime
                            className={'datetime ion-no-padding'}
                            placeholder={'请选择'}
                            yearValues={years}
                            value={this.state.selectValue}
                            display-format="YYYY/MM/DD"
                            picker-format="YYYY MM DD"
                            cancelText={'取消'}
                            doneText={'确定'}
                            onIonChange={(e) => { this.setState({ selectValue: e.detail.value! }); this.props.onSelect?.call(this, e.detail.value!) }}
                        >
                        </IonDatetime>
                    </IonCol>
                    <IonCol size='1'> <IonIcon className={'action'} src={caretDown}></IonIcon></IonCol>
                </IonRow>
            );
        }

    };
}

