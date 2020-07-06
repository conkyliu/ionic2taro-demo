import {
  IonCard, IonCardHeader,
  IonCardContent, IonNote, IonCardSubtitle, IonCardTitle,
  IonList, IonLabel, IonItem, IonRow, IonSelect, IonSelectOption, IonButton, IonModal, IonContent, IonInfiniteScroll, IonFab, IonFabButton, IonIcon, IonInfiniteScrollContent, IonCol, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle
} from '@ionic/react';
import React, { useState } from 'react';
import CalendarCell from '../components/CalendarCell';
import Calendar from '../components/Calendar'
import './Home.css';
import SpPageContainer from './SpPageContainer';
import { add } from 'ionicons/icons';
import './CalendarSamples.css';
import { arrowBack ,ellipsisHorizontal} from 'ionicons/icons';

let _now = new Date();

/**
 * 在LTG的训练日记录(TrainingDay)中：
 * code = TrainingDay.groupCode
 * type = TrainingDay.typeCode
 * scopeOfChangeing = TrainingDay.changingDays
 *    schedule.start = TrainingDay.date
 *    schedule.end   = TrainingDay.endOn
 *    schedule.index  = TrainingDay.index
 *    schedule.unpaid = TrainingDay.StatusCode === 1
 *    schedule.detail  = TrainingDay
 */

const planData = [
  {
    "code": "N0", "type": 3, "scopeOfChangeing": 3, "schedule": [
      { start: addDate(_now, -20), index: '1/4', },
      { start: addDate(_now, -18), unpaid: true, index: '2/4', detail: "A" },
      { start: addDate(_now, -15), unpaid: true, index: '3/4', detail: "B" },
      { start: addDate(_now, -12), unpaid: true, index: '4/4', detail: "C" }]
  },
  { "code": "N1", "type": 1, "schedule": [{ start: addDate(_now, -5) }, { start: addDate(_now, 15) }] },
  { "code": "N2", "type": 2, "schedule": [{ start: addDate(_now, -7) }, { start: addDate(_now, 12) }] },
  {
    "code": "N3", "type": 3, "scopeOfChangeing": 3, "schedule": [
      { start: addDate(_now, 0), index: '1/4', },
      { start: addDate(_now, 2), unpaid: true, index: '2/4', detail: "A" },
      { start: addDate(_now, 5), unpaid: true, index: '3/4', detail: "B" },
      { start: addDate(_now, 8), unpaid: true, index: '4/4', detail: "C" }]
  },
  {
    "code": "N4", "type": 3, "scopeOfChangeing": 3, "schedule": [
      { start: addDate(_now, 15), index: '1/4', },
      { start: addDate(_now, 17), unpaid: true, index: '2/4', detail: "A" },
      { start: addDate(_now, 19), unpaid: true, index: '3/4', detail: "B" },
      { start: addDate(_now, 22), unpaid: true, index: '4/4', detail: "C" }]
  }
];

/**
 * 按计划属性获取预计的训练日程
 *
 * @param startOn     计划开始时间
 * @param restDays    休息日
 * @param daysCount   训练天数
 * @param scopeOfChangeing 改签天数；
 */
const getCounsePlanDataForCalendar = (planCode:string, startOn: Date, restDays: number, daysCount: number, scopeOfChangeing: number) => {
  let monthPlanMap = new Map<string, any>();
  let planDays = new Array<any>();
  let duration = daysCount * (1 + restDays) - 1;
  let trainingDayInt = 1 + restDays;
  let startOnDate = new Date(startOn.toDateString());
  for (var i = 0; i < duration; i++) {
    let dateVal = new Date(startOnDate.valueOf() + 86400 * 1000 * i);
    if (i % trainingDayInt === 0) {
      planDays.push({
        start: dateVal,
        unpaid: false,
        index: (Math.floor(i / trainingDayInt)+1).toString() + "/" + daysCount
      });
    }
  }
  for (var i = 0; i < daysCount; i++) {
    let day = planDays[i];
    let ymKey = day.start.getFullYear().toString() + "-" + (day.start.getMonth() + 1).toString();
    if (!monthPlanMap.has(ymKey)) {
      monthPlanMap.set(ymKey, [{
        "code": planCode, "type": 3, "scopeOfChangeing": scopeOfChangeing, "schedule": []
      }]);
    }
    let targetMonthPlan = monthPlanMap.get(ymKey);
    targetMonthPlan[0].schedule.push(day);
  }
  monthPlanMap.set("selected",startOn);
  return monthPlanMap;
}

function addDate(date: Date, diffCount: number) {
  let targetDate = new Date(date.valueOf() + 86400000 * diffCount);
  return targetDate;
}


const todayDate = new Date();

/**
 * 获取下一个月的年月信息；
 *
 * @param baseDate 日期因子；
 * @param nextX    后X个月；
 */
const nextXMonth = (baseDate:Date,nextX:number)=>{
  let year = baseDate.getFullYear();
  let month = baseDate.getMonth();
  year += Math.floor( (month+nextX )/12);
  month = month+nextX % 12;
  return {year:year,month:month+1};
}

const CalendarSamples: React.FC = () => {

  const [demoCellStyle, setDeomCellStyle] = useState(0);
  const [demo1Year] = useState((new Date().getFullYear()));
  const [demo1Month] = useState((new Date().getMonth() + 1));
  const [demo2Year, setDemo2Year] = useState((new Date().getFullYear()));
  const [demo2Month, setDemo2Month] = useState((new Date().getMonth() + 1));
  const [showSelector, setShowSelector] = useState(false);
  const [selectorMonths,setSelectorMonths] = useState([
    nextXMonth(todayDate,0),
    nextXMonth(todayDate,1),
    nextXMonth(todayDate,2)]);
  const [disabledNewMonths,setDisabledNewMonths] = useState(false);
  const [monthData,setMonthData] = useState<Map<string, any>>(new Map<string, any>());


  return (
    <SpPageContainer title='Calendar组件' >
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>训练日历组件</IonCardSubtitle>
          <IonCardTitle>Calendar</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonNote color="secondary">训练日历控件能够按添加的计划数据在日历上显示训练计划标记。</IonNote>
          <br /><br />
          <h1>
            当月日历
            </h1> <br />
          <p>未提供年月值时，默认为当月日历。</p>

          <Calendar year={demo1Year} month={demo1Month}
            data={planData} onClick={(data: any) => {
              alert(JSON.stringify(data));
            }}

          ></Calendar>

          <br /><br />
          <h1>
            多语言支持
          </h1>
          <br />
          <p>可以通过lang= zh-CN | en 来设置语言，也可以通过langPackage属性传入自定义语言包。</p>
          <Calendar lang="en" data={planData} style='simple'
            onClick={(data: any) => {
              alert(JSON.stringify(data));
            }} ></Calendar>

          <br /><br />
          <h1>
            时间选择页面
          </h1>
          <br />
          <p>通过样式属性设置和数据绑来实现计划在日历上的选择。</p>

          <IonButton expand='full' onClick={() => setShowSelector(true)}>
            {monthData.has("selected")?"已选择"+monthData.get("selected").toDateString():"选择日期"}
            </IonButton>
          <IonModal isOpen={showSelector}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => setShowSelector(false)}>
                    <IonIcon src={arrowBack} color="dark"></IonIcon>
                  </IonButton>
                </IonButtons>
                <IonTitle>选择计划开始时间</IonTitle>
                <IonButtons slot='end'>
                  <IonButton>
                    <IonIcon src={ellipsisHorizontal} color="dark"></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="calenderSelector" scrollEvents={true}  onIonScrollEnd={
              async ()=>{
                if(disabledNewMonths===true){
                  return;
                }
                console.log("Event:onIonScrollEnd");
                if(selectorMonths.length>12){
                  setDisabledNewMonths(true);
                  return;
                }
                let year = selectorMonths[selectorMonths.length-1].year;
                let month = selectorMonths[selectorMonths.length-1].month;
                let newSelectorMonths =new Array<any>().concat(selectorMonths);
                for(let i=0;i<3;i++){
                  month++;
                  if(month===13){
                    year++;
                    month=1;
                  }
                  newSelectorMonths.push({year:year,month:month});
                }
                setSelectorMonths(newSelectorMonths);
              }
            } color="light">
              <IonRow className='ion-text-center'>
                <IonCol size='2'></IonCol>
                <IonCol size='8'>
                  <IonButton  style={{top:(window.outerHeight -88).toString()+"Px" }} className='submitButton'
                  expand='block' fill='clear' onClick={() => setShowSelector(false)}>
                    确定
                </IonButton>
                </IonCol>
                <IonCol size='2'></IonCol>

              </IonRow>
                {
                selectorMonths.map((m) => {
                  let ymKey = m.year.toString()+"-"+m.month.toString();
                  return (
                    <div key={m.year.toString() + "-" + m.month.toString()}>
                      <h1 style={{paddingLeft:"20Px"}}>{m.year}年{m.month}月</h1>
                      <Calendar data={monthData?.get(ymKey)} disabledBeforeToday={true}
                      year={m.year} month={m.month} style='simple'
                      showBorder={false} hideHeader={true}
                      onClick={(day:any)=>{
                        console.log("selected date:"+day.date.toDateString())
                        let dynPlan = getCounsePlanDataForCalendar("planView", day.date,1,4,3);
                        setMonthData(dynPlan);
                      }}
                      ></Calendar>
                    </div>
                  );
                })
                }
            <IonInfiniteScroll threshold="100Px" position='bottom' >
              <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText={disabledNewMonths===true?"已达到最大选择范围":"更多日历..."}>
              </IonInfiniteScrollContent>
            </IonInfiniteScroll>

            </IonContent>
          </IonModal>
        </IonCardContent>
      </IonCard>


      <IonCard>
        <IonCardContent className="canlendarImageBg">
          <br /><br />
          <h1>
            月份属性变更回调
            </h1>
          <IonNote>onMonthChanged 月份变更回调</IonNote>
          <br />  <br />
          <p>如果声明onMonthChanged回调函数，必需绑定年月值。</p>

          <br />  <br />
          <IonLabel>年份</IonLabel>
          <IonSelect interface="popover" name="cellStype" value={demo2Year} okText="Okay" cancelText="Dismiss"
            onIonChange={(input) => { console.log(input); setDemo2Year(input.detail.value); }} >
            <IonSelectOption value={2018}>2020年</IonSelectOption>
            <IonSelectOption value={2019}>2020年</IonSelectOption>
            <IonSelectOption value={2020}>2020年</IonSelectOption>
            <IonSelectOption value={2021}>2021年</IonSelectOption>
            <IonSelectOption value={2022}>2021年</IonSelectOption>
          </IonSelect>


          <IonLabel>月份</IonLabel>
          <IonSelect interface="popover" name="cellStype" value={demo2Month} okText="Okay" cancelText="Dismiss"
            onIonChange={(input) => { console.log(input); setDemo2Month(input.detail.value); }} >
            <IonSelectOption value={1}>1月</IonSelectOption>
            <IonSelectOption value={2}>2月</IonSelectOption>
            <IonSelectOption value={3}>3月</IonSelectOption>
            <IonSelectOption value={4}>4月</IonSelectOption>
            <IonSelectOption value={5}>5月</IonSelectOption>
            <IonSelectOption value={6}>6月</IonSelectOption>
            <IonSelectOption value={7}>7月</IonSelectOption>
            <IonSelectOption value={8}>8月</IonSelectOption>
            <IonSelectOption value={9}>9月</IonSelectOption>
            <IonSelectOption value={10}>10月</IonSelectOption>
            <IonSelectOption value={11}>11月</IonSelectOption>
            <IonSelectOption value={12}>12月</IonSelectOption>
          </IonSelect>

          <Calendar year={demo2Year} month={demo2Month} showBorder={false}
            onMonthChanged={(y: number, m: number) => {
              console.log(y, m);
              if (y < 2018 || y > 2022) {
                setDemo2Year(2018);
                setDemo2Month(1);
              } else {
                setDemo2Year(y);
                setDemo2Month(m);
              };
            }
            }
            data={planData} onClick={(data: any) => {
              alert(JSON.stringify(data));
            }}
          ></Calendar>

        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>日期单元格</IonCardSubtitle>
          <IonCardTitle>CalendarCell</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonNote color="secondary">日历控件的日期单元格，并能根据当日计划类型属性显示的相应的标记。</IonNote>

          <br /><br />
          <h1> 基本样式 </h1>
          <br />
          <p>date = 时间值 (Date)  subject = 标题 </p>
          <IonRow className="sample-calendar-row">
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 3)}  > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 2)}  > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 1)} > </CalendarCell>
            <CalendarCell value={new Date()} subject="今日"> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 1)}> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 2)}> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 3)}> </CalendarCell>
          </IonRow>

          <br /><br />
          <IonLabel> 禁用与非禁用状态 </IonLabel>
          <p>disabled = 是否禁用（true|false）</p>
          <IonRow className="sample-calendar-row">
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * (new Date().getDate() + 1))} disabled={true} > </CalendarCell>
            <CalendarCell value={new Date()} subject="今日"> </CalendarCell>
          </IonRow>

          <br /><br />
          <IonLabel> 样式 </IonLabel>
          <IonList>
            <IonItem>
              <IonLabel>单元格样式</IonLabel>
              <IonSelect name="cellStype" okText="Okay" cancelText="Dismiss" onIonChange={(input) => { console.log(input); setDeomCellStyle(input.detail.value); }} >
                <IonSelectOption value={0}>无</IonSelectOption>
                <IonSelectOption value={1}>训练计划开始</IonSelectOption>
                <IonSelectOption value={2}>训练计划过程日</IonSelectOption>
                <IonSelectOption value={3}>训练计划结束日</IonSelectOption>
                <IonSelectOption value={4}>训练计划结束日-无改签</IonSelectOption>
                <IonSelectOption value={10}>自助训练日；</IonSelectOption>
                <IonSelectOption value={20}>私教；</IonSelectOption>
                <IonSelectOption value={30}>可改签日-过程</IonSelectOption>
                <IonSelectOption value={31}>可改签日-结束</IonSelectOption>
                <IonSelectOption value={50}>休息日</IonSelectOption>
                <IonSelectOption value={51}>休息日-开始</IonSelectOption>
                <IonSelectOption value={52}>休息日-中间；</IonSelectOption>
                <IonSelectOption value={53}>休息日-结束</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          <IonLabel> styleCode ={demoCellStyle} </IonLabel>
          <IonRow className="sample-calendar-row">
            <CalendarCell value={new Date(2050, 0, 1)} subject="Demo" styleCode={demoCellStyle}> </CalendarCell>
          </IonRow>


          <br /><br />
          <IonLabel> 单击事件 </IonLabel>
          <p> onClick = 单击函数 </p>
          <IonRow className="sample-calendar-row">
            <CalendarCell value={new Date()} subject="今日" data={{ userid: 1, message: "hi" }} onClick={(p: any) => { alert(JSON.stringify(p)); }}> </CalendarCell>
          </IonRow>

          <br /><br />
          <IonLabel> 训练计划 </IonLabel>
          <p>
            styleCode = 样式代码(number)
                </p>
          <IonRow className="sample-calendar-row">
            <CalendarCell subject="私教" value={new Date(new Date().valueOf() - 86400000 * 5)} styleCode={20} expired={true}> </CalendarCell>
            <CalendarCell subject="自助训练" value={new Date(new Date().valueOf() - 86400000 * 4)} expired={true}> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 3)} > </CalendarCell>
            <CalendarCell subject="私教" value={new Date(new Date().valueOf() - 86400000 * 2)} styleCode={20} expired={true}> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 1)} expired={true}> </CalendarCell>
            <CalendarCell value={new Date()} subject="今日"> </CalendarCell>
            <CalendarCell subject="训练" value={new Date(new Date().valueOf() + 86400000 * 1)} styleCode={1} > </CalendarCell>
          </IonRow>
          <IonRow className="sample-calendar-row">
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() + 86400000 * 2)} styleCode={50}> </CalendarCell>
            <CalendarCell subject="训练" value={new Date(new Date().valueOf() + 86400000 * 3)} styleCode={2} unpaid={true}> </CalendarCell>
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() + 86400000 * 4)} styleCode={51}> </CalendarCell>
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() + 86400000 * 5)} styleCode={52}> </CalendarCell>
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() + 86400000 * 6)} styleCode={53}> </CalendarCell>
            <CalendarCell subject="训练" value={new Date(new Date().valueOf() + 86400000 * 7)} styleCode={3} unpaid={true}> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 8)} styleCode={30} > </CalendarCell>
          </IonRow>
          <IonRow className="sample-calendar-row">
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 9)} styleCode={30} > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 10)} styleCode={31}  > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 11)}  > </CalendarCell>
            <CalendarCell subject="私教" value={new Date(new Date().valueOf() + 86400000 * 12)} styleCode={20}  > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 13)}  > </CalendarCell>
            <CalendarCell subject="自助训练" value={new Date(new Date().valueOf() + 86400000 * 14)} > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 15)}> </CalendarCell>
          </IonRow>

          <br /><br />
          <IonLabel> 过期计划 </IonLabel>
          <p>
            expired = 过期( true| false )
                </p>
          <IonRow className="sample-calendar-row">
            <CalendarCell subject="私教" value={new Date(new Date().valueOf() - 86400000 * 11)} styleCode={20} expired={true} > </CalendarCell>
            <CalendarCell subject="自助训练" value={new Date(new Date().valueOf() - 86400000 * 10)} expired={true} > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 9)}> </CalendarCell>
            <CalendarCell subject="私教" value={new Date(new Date().valueOf() - - 86400000 * 8)} styleCode={20} expired={true} > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 7)}> </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() - 86400000 * 6)}> </CalendarCell>
            <CalendarCell subject="训练" value={new Date(new Date().valueOf() - 86400000 * 5)} styleCode={1} expired={true} > </CalendarCell>
          </IonRow>
          <IonRow className="sample-calendar-row">
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() - 86400000 * 4)} styleCode={50} expired={true} > </CalendarCell>
            <CalendarCell subject="训练" value={new Date(new Date().valueOf() - 86400000 * 3)} styleCode={2} expired={true} > </CalendarCell>
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() - 86400000 * 3)} styleCode={51} expired={true} > </CalendarCell>
            <CalendarCell subject="休息" value={new Date(new Date().valueOf() - 86400000 * 2)} styleCode={53} expired={true} > </CalendarCell>
            <CalendarCell subject="训练" value={new Date(new Date().valueOf() - 86400000 * 1)} styleCode={4} expired={true} unpaid={true} > </CalendarCell>
            <CalendarCell value={new Date()} subject="今日" > </CalendarCell>
            <CalendarCell value={new Date(new Date().valueOf() + 86400000 * 1)} expired={true} > </CalendarCell>
          </IonRow>
        </IonCardContent>
      </IonCard>
    </SpPageContainer>
  );
};

export default CalendarSamples;
