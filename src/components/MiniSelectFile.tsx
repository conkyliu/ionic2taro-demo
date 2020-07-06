import React, {Component, SyntheticEvent} from 'react';

import './MiniSelectFile.css';

import icon_del from "./icon/img_del.svg"
import {IonGrid, IonIcon, IonImg, IonRow} from "@ionic/react";
import wx from "ltg-wxsdk";
import User from "../utility/User";

interface SelectFileProps {
    style?:{};
    accept:string;//文件类型
    multiple:boolean;//多文件选择
    // compress?:boolean;//压缩
    album?:boolean;//选择相册
    camera?:boolean;
    placeholder:string;
    picClick?:Function;
    onSelect?:Function;
}

export interface FileItem{
    filename:string;
    type:string;
    size:number;
    body:any;
}
interface FileState {
    items:FileItem[];
}
export default class MiniSelectFile extends Component<SelectFileProps,FileState> {
    constructor(props:any) {
        super(props);
        this.state = {items:[]}
        /**
         * 通过User对象获取小程序配置
         */
        User.GetWxJsSDKConfig().then((config)=>{
            config.jsApiList=['checkJsApi','chooseImage'];
            config.debug=false;
            /**
             * 通过获取的配置信息附加jsApiList参数后，调用wx.config
             */
            wx.config(config);
            // setGetWxJsSDKConfigErr("No Error");
            // alert(JSON.stringify(config))
        },(err)=>{
            alert(JSON.stringify(err))
            // setGetWxJsSDKConfigErr(JSON.stringify(err));
        });
    }
    async onselect(res:{sourceType:string,localIds: string[], errMsg: string}) {//选择文件
        let items:FileItem[] = this.state.items;
        await this.mergeFiles(items,res.localIds);
        // await this.mergeFiles(items,camerafiles);
        this.setState({items:items});
        this.props.onSelect?.call(this,null,items);
    }
    async mergeFiles(items:FileItem[],files:string[]|null|undefined){
        if (files!=null){
            if (files?.length??0 > 0) {
                let len = 9 -this.state.items.length;
                for (let index = 0; (index<len&&index < (files?.length??0)); index++) {
                    let body;
                    // if (this.props?.compress===true){
                    //     body = await this.readDataURLAsImage(files[index]);
                    // }else{
                        body = await this.loadImage(files[index]);
                    // }
                    items.push({filename:files[index],size:0,type:'image/jpg',body:body})
                }
            }
        }
    }
    async loadImage(file:string){
        return new Promise((resolve, reject) => {
            wx.getLocalImgData({
                localId:file, success: (res: { localData: string }) => {
                    //var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    resolve(res.localData);
                },fail:(err:any)=>reject(err)
            });
        });
    }
    async toBase64(file:any){
        return new Promise((resolve, reject) => {
            if (window.FileReader) {
                let fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onabort = function (exports:ProgressEvent<FileReader>) {
                    reject(exports);
                }
                fr.onerror = function (exports:ProgressEvent<FileReader>) {
                     resolve(exports);
                }
                fr.onloadend = function (e:ProgressEvent<FileReader>) {
                    resolve(fr.result);
                }
            }else{
                reject('error')
            }
        })
    }
    async readDataURLAsImage(dataURL:any) {
        return new Promise((resolve, reject) => {
            let imageObj = new Image();
            imageObj.onload = () => {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                let MAX_WIDTH = 1080;
                let MAX_HEIGHT = 1920;
                let width = imageObj.width;
                let height = imageObj.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                if (ctx!=null){
                    ctx.drawImage(imageObj, 0, 0, width, height);
                }

                //console.log(canvas.toDataURL());

                resolve(canvas.toDataURL());
            };
            imageObj.src = window.URL.createObjectURL(dataURL);
        });
    }

    // private calce(body:any){
    //     debugger
    //     this.readDataURLAsImage(body).then((image:any)=>{
    //         let canvas = document.createElement("canvas");
    //         let ctx = canvas.getContext("2d");
    //         let MAX_WIDTH = 800;
    //         let MAX_HEIGHT = 600;
    //         let width = image.width;
    //         let height = image.height;
    //
    //         if (width > height) {
    //             if (width > MAX_WIDTH) {
    //                 height *= MAX_WIDTH / width;
    //                 width = MAX_WIDTH;
    //             }
    //         } else {
    //             if (height > MAX_HEIGHT) {
    //                 width *= MAX_HEIGHT / height;
    //                 height = MAX_HEIGHT;
    //             }
    //         }
    //         canvas.width = width;
    //         canvas.height = height;
    //         if (ctx!=null){
    //             ctx.drawImage(image, 0, 0, width, height);
    //         }
    //
    //         console.log(canvas.toDataURL());
    //         // canvas.toBlob(function(blob) {
    //         //     console.log(blob);
    //         //     // var form = new FormData();
    //         //     // form.append('file', blob);
    //         //     // fetch('/api/upload', {method: 'POST', body: form});
    //         // });
    //
    //     })
    //
    // }
    private deleteClick(idx: number) {
        let list:FileItem[] = [];
        for(let i=0;i<this.state.items.length;i++){
            if (i!==idx){
                list.push(this.state.items[i]);
            }
        }
        this.setState({items:list});
        this.props.onSelect?.call(this,null,list);
    }

    render(){
        let imgs =[];
        for(let i=0;i<this.state.items.length;i++){
            imgs.push(
                <div className={'item'}
                     key={"item"+Math.random()}
                     onClick={(e)=>{e.stopPropagation();this.props.picClick?.call(this,null,this.state.items[i],i.valueOf())}}
                >
                    <IonImg className={'img'}
                        src={this.state.items[i].body} >
                    </IonImg>
                    <IonIcon className={'del'} src={icon_del} onClick={(e:any)=>{e.stopPropagation(); this.deleteClick(i)}}></IonIcon>
                </div>)
        }
        if (this.state.items.length<9){
            if (this.props.album===undefined || this.props.album===true){
                //选择相册
                imgs.push(<div key={"item"+Math.random()} className={'album'}
                               onClick={(e)=>{
                                   wx.chooseImage({count:9,sourceType:['album'],sizeType:['original'],success:(res)=>this.onselect(res),fail:(err)=>{alert(JSON.stringify(err))}})
                               }}>
                </div>)
            }
            if(this.props.camera===true) {
                //选择拍照
                imgs.push(<div key={"item"+Math.random()} className={'camera'}
                               onClick={(e)=>{
                                   wx.chooseImage({count:9,sourceType:['camera'],sizeType:['original'],success:(res)=>this.onselect(res),fail:(err)=>{alert(JSON.stringify(err))}})
                               }}>
                </div>)
            }
        }
        return(<IonGrid className="qjs-photo" style={this.props.style}>
                <IonRow className={'pics'}>
                    {imgs}
                </IonRow>
            {/*{buttonView}*/}
            </IonGrid>
        );
    };
}
