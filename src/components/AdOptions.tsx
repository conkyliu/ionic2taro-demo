import {OptionItem} from "./Options";

//选项对象
export interface PicAdPlaning {
    adPlaningId:string;//ID（RKey)
    number:string;//编号
    group:string;//组(PKey)；由组确定广告位。
    adformat:string;//，广告形式；
    subject:string;//标题
    description:string;//，描述
    picURL:string;//图片链接；
    startOn:Date;//投放开始时间；
    endOn:Date;//投放结束时间；
    default:boolean;//是否默认。
    redirectUrl:string;
}
