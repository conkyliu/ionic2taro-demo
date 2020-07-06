import React, { useState } from 'react';
import './PickerDemo.css';
import SpPageContainer from './SpPageContainer';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonNote, IonButton, IonPicker } from '@ionic/react';
import { PickerColumn } from "@ionic/core";


interface _Props {
    onSave?: Function
    onCancel?: Function
}

const PickerDemo: React.FC<_Props> = ({ onSave, onCancel }) => {

    const [IsOpen, setIsOpen] = useState(false);


    const height1Column = {
        name: "height1",
        align: "right",
        columnWidth:'200px',
        options: [
            { text: "1", value: "1" },
            { text: "2", value: "2" }
        ]
    } as PickerColumn;;

    const height2Column = {
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

    const height3Column = {
        name: "height3",
        selectedIndex: 0,
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


    return (
        <>
            <SpPageContainer title='IonPicker示例'>
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>IonPicker示例</IonCardSubtitle>
                        <IonCardTitle>IonPicker React Sample</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" onClick={() => setIsOpen(true)}>选择身高（cm)</IonButton>
                    </IonCardContent>
                </IonCard>
            </SpPageContainer>

            <IonPicker columns={[height1Column, height2Column, height3Column]} isOpen={IsOpen} buttons={[
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: value => {
                        onCancel?.apply(null);
                        setIsOpen(false);
                    }
                },
                {
                    text: "Confirm",
                    handler: value => {

                        let heightVal = ((height1Column.selectedIndex ?? 0)+1 ) * 100 +
                        (height2Column.selectedIndex ?? 0 ) *10 +
                        (height3Column.selectedIndex ?? 0 ) ;
                        alert(heightVal);
                        onSave?.apply(null,heightVal);
                        setIsOpen(false);
                    }
                }
            ]}
            ></IonPicker>/>
        </>
    );

}


export default PickerDemo;
