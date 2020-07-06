import {OptionItem} from "./Options";

export const GenderOptions:OptionItem[]=[
    {name:'全部',value:""}
    ,{name:'男',value:"0"}
    ,{name:'女',value:"1"}
]

export const BloodTypeOptions:OptionItem[]=[
    {name:'全部',value:""}
    ,{name:'A',value:"0"}
    ,{name:'B',value:"1"}
    ,{name:'O',value:"2"}
    ,{name:'AB',value:"3"}
]

//0,计算机/互联网/通信/电子;
// 1,会计/金融/银行/保险;
// 2,贸易/消费/制造/营运;
// 3,制药/医疗;
// 4,广告/媒体;
// 5,房地产/建筑;
// 6,专业服务/教育/培训;
// 7,服务业;
// 8,物流/运输;
// 9,能源/原材料;
// 10,政府/非营利组织;
// 11,自由职业者;
// 12,学生;
// 13,其它;
export const IndustryOptions:OptionItem[]=[
    {name:'全部',value:""}
    ,{name:'会计/金融/银行/保险',value:"1"}
    ,{name:'贸易/消费/制造/营运',value:"2"}
    ,{name:'制药/医疗',value:"3"}
    ,{name:'广告/媒体',value:"4"}
    ,{name:'房地产/建筑',value:"5"}
    ,{name:'专业服务/教育/培训',value:"6"}
    ,{name:'服务业',value:"7"}
    ,{name:'物流/运输',value:"8"}
    ,{name:'能源/原材料',value:"9"}
    ,{name:'政府/非营利组织',value:"10"}
    ,{name:'自由职业者',value:"11"}
    ,{name:'学生',value:"12"}
    ,{name:'其它',value:"13"}
]

//账户类型； 0，信用；1，时间存储分；
export const accountOptions:OptionItem[]=[
    {name:'全部',value:""}
    ,{name:'信用',value:"0"}
    ,{name:'时间存储分',value:"1"}

]
//sourceClass int,注册来源； 0，手机；1，微信；3，小程序；4，合作伙伴平台；5，QQ；10，其他；
export const sourceClassOptions:OptionItem[]=[
    {name:'全部',value:""}
    ,{name:'手机',value:"0"}
    ,{name:'微信',value:"1"}
    ,{name:'小程序',value:"3"}
    ,{name:'合作伙伴平台',value:"4"}
    ,{name:'QQ',value:"5"}
    ,{name:'其他',value:"10"}
]

//训练计划卡片数据
export interface UserData{
    fullname :string;//全名；
    nickname :string;//昵称；
    signature :string;//签名；
    number :string;//编号；(PKey)
    gender:number;//性别：0;男；1，女；
    bloodType:number;//血型：0;//A;1;//B;3;//O;4;//AB
    height:number;//身高.cm。
    weight:number;//体重.kg。
    traingTarget:number;//最近训练目标；0;//减脂减肥；1，增肌塑形；2，身体健康；3，随便练练；
    emergencyContact :string;//紧急联系人；
    emergencyNumber :string;//紧急联系人电话；
    birthday:Date;//生日；
    avatarUrl:string;//头像图片；
    anonymous:boolean;//是否匿名；
    industry :number//行业: 0;//计算机/互联网/通信/电子;1,会计/金融/银行/保险;2,贸易/消费/制造/营运;3,制药/医疗;4,广告/媒体; 5,房地产/建筑;6,专业服务/教育/培训;7,服务业;8,物流/运输;9,能源/原材料; 10,政府/非营利组织;11,自由职业者;12,学生;13,其它;
    sourceClass:number;//注册来源； 0，手机；1，微信；3，小程序；4，合作伙伴平台；5，QQ；10，其他；
    agreemenVer :string;//用户协议版本；
    jobtitle :string;//职务；
    regdate :Date;//注册时间；
}
