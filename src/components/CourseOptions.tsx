import {OptionItem} from "./Options";
//训练部位 1 胸部 2 背部 3 臀部 4 腹部 5 腿部 6 手臂 10 全身。 示例： "[1,2]"
export const SiteOptions:OptionItem[] = [
    {name:'胸部',value:"1"}
    ,{name:'背部',value:"2"}
    ,{name:'臀部',value:"3"}
    ,{name:'腹部',value:"4"}
    ,{name:'腿部',value:"5"}
    ,{name:'手臂',value:"6"}
    ,{name:'全身',value:"7"}
]

//1 入门；2 初级； 3 中级； 4 高级
export const DifficultOptions:OptionItem[] = [
    {name:'全部等级',value:""}
    ,{name:'入门',value:"1"}
    ,{name:'初级',value:"2"}
    ,{name:'中级',value:"3"}
    ,{name:'高级',value:"4"}
]
//target int 训练目标； 1，减脂减肥；2，增肌塑形；3，身体健康； 10 随便练练；
export const TargetMenu:OptionItem[] = [
    {name:'全部',value:""}
    ,{name:'减脂',value:"1"}
    ,{name:'塑形',value:"2"}
    ,{name:'健康',value:"3"}
    // ,{name:'放松',value:"10"}

    // {name:'全部',value:""}
    // ,{name:'减脂减肥',value:"1"}
    // ,{name:'增肌塑形',value:"2"}
    // ,{name:'身体健康',value:"3"}
    // ,{name:'随便练练',value:"10"}
]

export const FeeOptions:OptionItem[] = [
    {name:'免费+收费',value:""}
    ,{name:'免费',value:"0"}
    ,{name:'收费',value:"1"}
]
export const PlanOptions:OptionItem[] = [
    {name:'单日+多日',value:""}
    ,{name:'单日计划',value:"0"}
    ,{name:'多日计划',value:"1"}
]
export const StateOptions:OptionItem[] = [
    {name:'全部',value:""}
    ,{name:'可用',value:"0"}
    ,{name:'停用',value:"1"}
]
export const TargetOptions:OptionItem[]=[
    {name:"减脂减肥",value:"1"}
    ,{name:"增肌塑形",value:"2"}
    ,{name:"身体健康",value:"3"}
    // ,{name:"随便练练",value:"4"}
]


//训练计划卡片数据
export interface CardData{
    subject:string;
    description:string;
    seriesid:string;
    pic:string;
    difficult:number;
    site:Array<string>;
    startOn:Date;
    endOn:Date
    target: number;
    price: number;
    usageCount: number;
    version:string;
    courseId:string;
    OrganizationId:string;
    CreatedOn:string;
    CreatedBy:string;
    ModifiedBy:string;
    OwnerId:string;
    StateCode: number;
    StatusCode: number;
    __etag: Date
    __timestamp:Date;
    __entity:string;
}
