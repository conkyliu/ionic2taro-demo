/*
全局通用的功能，包括存储、网络请求、多语言相关功能。
不要写入非全局的功能的函数；
*/
import { SecureStorage } from '@ionic-native/secure-storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { isPlatform } from '@ionic/react';

//let useWebStorage  = window.localStorage  != null;

let useWebStorage  = !isPlatform('capacitor');

console.log('useWebStorage:',useWebStorage);

const getWebSecureKey = (store: string, key: string)=>{
    return '$'+store + "_" + key;
}

let screenScale = Math.abs(window.screen.availHeight / window.screen.availWidth);
const ScreenSize:'Normal' | 'Infinity' = (screenScale > 17.5 / 9 ? 'Infinity' : 'Normal');

const SStorage = {

    Get:async (store: string, key: string) => {

        if(useWebStorage===true){
            const lcsKey = getWebSecureKey(store,key);
            const item =  localStorage.getItem(lcsKey);
            return Promise.resolve(item);
        }
    
        var userStorage = await SecureStorage.create(store);
    
        if (userStorage == null) {
            return Promise.resolve(null);
        }
    
        let keys = await userStorage.keys();
        if (keys.indexOf(key) >= 0) {
            var val = await userStorage.get(key);
            return val;
        }
        else {
            return null;
        }
    },
    Set:async (store: string, key: string, value: string) => {

        if(useWebStorage===true){
            const lcsKey = getWebSecureKey(store,key);
            localStorage.setItem(lcsKey,value);
            return true;
        }
    
        var userStorage = await SecureStorage.create(store);
        if (userStorage == null) {
            return false;
        }
    
        var saveResult =  await userStorage.set(key, value);
        return saveResult;
    },
    Remove:async (store: string, key: string) => {

        if(useWebStorage===true){
            const lcsKey = getWebSecureKey(store,key);
            localStorage.removeItem(lcsKey);
            return true;
        }
    
        var userStorage = await SecureStorage.create(store);
        if (userStorage == null) {
            return null;
        }
        await userStorage.remove(key);
    }
    
}

const Storage = {
    Get:async (key: string) => {

        if( useWebStorage===true){
            return localStorage.getItem(key);
        }
        let keys = await NativeStorage.keys();
        
        if (keys.indexOf(key) >= 0) {
            var val = await NativeStorage.getItem(key);
            return val;
        }
        else {
            return null;
        }
    
    },
    Set:async (key: string, value: any) => {

        if(useWebStorage===true){
            localStorage.setItem(key,value);
            return true;
        }
    
        const setResult =  await NativeStorage.setItem(key, value);
        return setResult;
    },
    Remove:async (key:string) =>{

        if(useWebStorage===true){
            localStorage.removeItem(key);
            return true;
        }

        await NativeStorage.remove(key);
        return;
    },
    Keys:async()=>{

        let keys:Array<string> = new Array<string>();
        if(useWebStorage===true){
            for(var i= 0;i<localStorage.length;i++){
                let itemKey = localStorage.key(i);
                if(itemKey){
                    keys.push(itemKey);
                }
            }
            return Promise.resolve(keys);
        }

        keys = await NativeStorage.keys();
        return Promise.resolve(keys);
    }
}

export default {
    SecureValue: SStorage,
    Storage,
    ScreeSize: ScreenSize
};