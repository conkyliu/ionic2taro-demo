//页面传参
export interface Params{
    index?:string;
    id?: string;
    projectId?:string;
    date?:string;
}

//选项对象
export interface OptionItem {
    name:string;
    title?:string;
    value:string;
    selected?:boolean;
}

export const DayOfWeek:string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
