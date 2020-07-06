import React, {Component, SyntheticEvent} from 'react';

import './SelectFile.css';

import icon_photo from "./components/icon/detail_btn_photo.svg"
import icon_del from "./icon/img_del.svg"
import {IonCol, IonGrid, IonIcon, IonImg, IonRow} from "@ionic/react";
import wx from "ltg-wxsdk";

interface SelectFileProps {
    style?:{};
    accept:string;//文件类型
    multiple:boolean;//多文件选择
    compress?:boolean;//压缩
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
export default class SelectFile extends Component<SelectFileProps,FileState> {
    albumFiles:HTMLInputElement | undefined | null;
    cameraFiles:HTMLInputElement | undefined | null;
    constructor(props:any) {
        super(props);
        this.state = {items:[]}
    }
    async onselect(ev:any) {//选择文件
        let albumfiles:FileList|null|undefined = this.albumFiles?.files;
        let camerafiles:FileList|null|undefined = this.cameraFiles?.files;
        let items:FileItem[] = this.state.items;
        await this.mergeFiles(items,albumfiles);
        await this.mergeFiles(items,camerafiles);
        this.setState({items:items});
        this.props.onSelect?.call(this,null,items);
    }
    async mergeFiles(items:FileItem[],files:FileList|null|undefined){
        if (files!=null){
            if (files?.length??0 > 0) {
                let len = 9 -this.state.items.length;
                for (let index = 0; (index<len&&index < (files?.length??0)); index++) {
                    let body;
                    if (this.props?.compress===true){
                        body = await this.readDataURLAsImage(files[index]);
                    }else{
                        body = await this.toBase64(files[index]);
                    }
                    items.push({filename:files[index].name,size:files[index].size,type:files[index].type,body:body})
                }
            }
        }
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
                imgs.push(<div key={"item"+Math.random()} className={'album'}>
                    <input className={'photo'}
                           ref={(node)=>{this.albumFiles = node}}
                           accept={this.props.accept}
                           multiple={this.props.multiple} type="file"
                           placeholder={this.props.placeholder}
                           onChange={(e:SyntheticEvent)=>this.onselect(e)}/></div>)
            }
            if(this.props.camera===true) {
                //选择拍照
                imgs.push(<div key={"item"+Math.random()} className={'camera'}onClick={(e)=>{}}>
                    <input className={'photo'}
                           ref={(node) => {this.cameraFiles = node}}
                           accept={this.props.accept}
                           multiple={this.props.multiple}
                           type="file"
                           placeholder={this.props.placeholder}
                           onChange={(e: SyntheticEvent) => this.onselect(e)}
                    />
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
