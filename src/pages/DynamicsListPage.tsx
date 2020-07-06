import React, { useState } from 'react';
import SpPageContainer from './SpPageContainer';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonButton } from '@ionic/react';

interface DynamicsListProps {
    Items?: Array<any>,
    Count?:number
}



class DynamicsList  extends React.Component<DynamicsListProps> {

    constructor(props:DynamicsListProps){
        super(props);

    }

    render(){
        return(
        <IonList>
            {this.props.Items?.map(item=> {return (<IonItem key={item.name}>{item.name}</IonItem>);})}
        </IonList>
        );
    }
}

const DynamicsListPage: React.FC = () => {

    const [data,setData] = useState([{name:'item a'},{name:'item b'},{name:'item c'}]);

    return (
        <SpPageContainer title='列表示例'>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>List Samples</IonCardSubtitle>
                    <IonCardTitle>列表示例</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <DynamicsList Items={data} />
                    <IonButton onClick={(e)=> {
                        e.preventDefault();
                        var newData = new Array<any>().concat(data);
                        newData.push({name:(new Date()).toLocaleTimeString()});
                        setData(newData);
                    }}>添加记录</IonButton>
                </IonCardContent>
            </IonCard>
        </SpPageContainer>
    );

};

export default DynamicsListPage;