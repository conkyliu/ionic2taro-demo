import React, { useState } from 'react';
import { IonInput, IonItemDivider, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonNote, IonList, IonListHeader, IonLabel, IonItem, IonSelect, IonSelectOption, IonText, IonTextarea, IonButton, IonLoading } from '@ionic/react';
import SpPageContainer from './SpPageContainer';
import DataAPI from '../utility/LTGHttp';
import ReactJson from 'react-json-view';



const DataAPITester: React.FC = () => {

    const [updateBase, setUpdateBase] = useState({});
    const [entity, setEntity] = useState('TestEntity0');
    const [method, setMethod] = useState('Query');
    const [dataBody, setDataBody] = useState('{\n}');
    const [select, setSelect] = useState('');
    const [keys, setKeys] = useState('');
    const [filter, setFilter] = useState('');
    const [count, setCount] = useState<number>(1);
    //const [statusCode, setStatusCode] = useState(0);
    const [respBody, setRespBody] = useState({});
    const [showLoading, setShowLoading] = useState(false);

    const respSeccuse = (data: any) => {
        if (typeof (data) === "string") {
            setRespBody({ "$value": data });
        } else if (typeof (data) === "object") {
            setRespBody(data);
        } else {
            setRespBody({ "$value": data.toString() });
        }
        console.log(respBody);
        console.log(JSON.stringify(respBody));
        if (method === "Query") {
            if(data.length>0){
                setUpdateBase(DataAPI.Data.GetUpdateEntity(data[0]));
            }
            setDataBody(JSON.stringify(updateBase));
        }
        if (method === "Retreive") {
            setUpdateBase(DataAPI.Data.GetUpdateEntity(data));
            setDataBody(JSON.stringify(updateBase));
        }
        setShowLoading(false);
    }

    const respFailed = (err: any) => {
        debugger;
        if (typeof (err) == "string") {
            setRespBody({ "$error": err });
        } else if (typeof (err) == "object") {
            setRespBody(err);
        } else {
            setRespBody({ "$error": err.toString() });
        }

        setShowLoading(false);
    }

    const request = (e: any) => {
        setShowLoading(true);

        switch (method) {
            case 'Retreive':
                DataAPI.Data.Retrieve(entity, keys, select).then(respSeccuse, respFailed);
                break;
            case 'Query':
                DataAPI.Data.Query(entity, filter, select, count).then(respSeccuse, respFailed);
                break;
            case 'QueryNext':
                DataAPI.Data.QueryNext(entity, filter, select, count).then(respSeccuse, respFailed);
                break;
            case 'Create':
                try {
                    let targetCreate = JSON.parse(dataBody);
                    DataAPI.Data.Create(entity, targetCreate).then(respSeccuse, respFailed);
                } catch (err) {
                    console.error(err);
                }
                break;
            case 'Update':
                try {
                    let targetUpdate = JSON.parse(dataBody);
                    DataAPI.Data.Update(entity, targetUpdate).then(respSeccuse, respFailed);
                } catch (err) {
                    console.error(err);
                }
                break;
            case 'Delete':
                try {
                    let targetDelete = JSON.parse(dataBody);
                    DataAPI.Data.Delete(entity, targetDelete).then(respSeccuse, respFailed);
                } catch (err) {
                    console.error(err);
                }
                break;
            default:
                break;
        }
    }

    return (
        <SpPageContainer title='Data API'>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>通用数据接口</IonCardSubtitle>
                    <IonCardTitle>Common Data API</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonText>
                        通过LTG平台通用数据接口，应用可以快速扩展应用程序的接口数据，并通过服务器的元数据定义的事件插件控制数据的业务逻辑。
                    </IonText>
                    <form>
                        <IonList>
                            <IonListHeader>
                                <IonLabel> API调用验证</IonLabel>
                            </IonListHeader>

                            <IonItem>
                                <IonLabel>业务实体名称：</IonLabel>
                                <IonInput value={entity} onIonChange={(e: any) => setEntity(e.detail.value)} ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel>操作</IonLabel>
                                <IonSelect value={method} okText="Okay"
                                    interface='popover'
                                    cancelText="Dismiss" onIonChange={e => {
                                        setMethod(e.detail.value);
                                    }}>
                                    <IonSelectOption value="Retreive">单记录</IonSelectOption>
                                    <IonSelectOption value="Query">查询</IonSelectOption>
                                    <IonSelectOption value="QueryNext">查下一页</IonSelectOption>
                                    <IonSelectOption value="Create">创建</IonSelectOption>
                                    <IonSelectOption value="Update">更新</IonSelectOption>
                                    <IonSelectOption value="Delete">删除</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            <IonItemDivider hidden={['Create', 'Update', 'Delete', null].indexOf(method) >= 0}> 列(OData,$select)：</IonItemDivider>
                            <IonItem hidden={['Create', 'Update', 'Delete', null].indexOf(method) >= 0}>
                                <IonTextarea placeholder="输入列名，多列以逗号隔开" value={select}
                                    onIonChange={e => setSelect(e.detail.value!)}></IonTextarea>
                            </IonItem>

                            <IonItemDivider hidden={['Create', 'Update', 'Delete', 'Retreive', null].indexOf(method) >= 0}>条件(OData,$filter)：</IonItemDivider>
                            <IonItem hidden={['Create', 'Update', 'Delete', 'Retreive', null].indexOf(method) >= 0}>
                                <IonTextarea placeholder="输入条件，使用OData通用数据协议的filter表达式" value={filter}
                                    onIonChange={e => setFilter(e.detail.value!)}></IonTextarea>
                            </IonItem>

                            <IonItemDivider hidden={['Create', 'Update', 'Delete', 'Query', 'QueryNext',null].indexOf(method) >= 0}>记录键值：</IonItemDivider>
                            <IonItem hidden={['Create', 'Update', 'Delete', 'Query', 'QueryNext',null].indexOf(method) >= 0}>
                                <IonTextarea placeholder="输入键值" value={keys}
                                    onIonChange={e => setKeys(e.detail.value!)}></IonTextarea>
                            </IonItem>


                            <IonItemDivider hidden={['Create', 'Update', 'Delete', 'Retreive', null].indexOf(method) >= 0}>记录数(Int,$count)：</IonItemDivider>
                            <IonItem hidden={['Create', 'Update', 'Delete', 'Retreive', , null].indexOf(method) >= 0}>
                                <IonInput placeholder="返回记录数（Int)" value={count}
                                    inputmode='numeric'
                                    onIonChange={e => setCount(parseInt(e.detail.value!))}></IonInput>
                            </IonItem>

                            <IonItemDivider hidden={['Retreive', 'Query', 'QueryNext',null].indexOf(method) >= 0}>数据(JSON)：</IonItemDivider>
                            <IonItem hidden={['Retreive', 'Query','QueryNext', null].indexOf(method) >= 0}>
                                <IonTextarea placeholder="输入要提交的数据..." value={dataBody}
                                    onIonChange={e => setDataBody(e.detail.value!)}></IonTextarea>
                            </IonItem>

                        </IonList>
                        <br /><br />
                        <IonButton fill='outline' expand='block' color='dark' onClick={request}>请求</IonButton>
                        <br />
                    </form>
                    <hr />
                    <h2>返 回：</h2>

                    <ReactJson src={respBody} />

                    <br />
                    <br />
                    <br />
                    <br />
                    {JSON.stringify(updateBase)}
                </IonCardContent>
            </IonCard>

            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message="请求中..."
                duration={10000}
            />
        </SpPageContainer>
    )
}

export default DataAPITester;