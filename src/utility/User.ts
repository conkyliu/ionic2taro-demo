
import NativeUtil from './NativeUtil';
import LTGHttp from './LTGHttp';


let token: string | null = null;
let profile: any | null = {};
let roles: string[] = new Array<string>();

/** 重新加载用户信息 */
const Reload = async () => {

    try {
        var tokenVal = await NativeUtil.SecureValue.Get("user", "token");
        token = tokenVal;
    }
    catch (err) {
        console.error("User.Reload-token:", err);
    }

    try {
        var rolesData = await NativeUtil.SecureValue.Get("user", 'roles');
        let rolesVal = rolesData == null || rolesData == 'undefined' ? [] : rolesData.toString().split(';');
        roles = new Array<string>();
        rolesVal.map((rolename: string) => {
            roles.push(rolename.toLowerCase());
        });
    } catch (err) {
        console.error("User.Reload-roles:", err);
    }

    try {
        let profileData = await NativeUtil.Storage.Get('profile');
        if (profileData) {
            profile = JSON.parse(profileData);
        }
    }
    catch (err) {
        console.error("User.Reload-profile:", err);
    }
};


Reload().then(() => {
    if (IsLogined() === false) {
        LoginAsAnonymous();
    }
});

/** 是否在指定角色中 */
const IsRole = (rolename: string) => {
    if (roles.length === 0) {
        return false;
    }
    let isrole = roles.indexOf(rolename.toLowerCase()) >= 0;
    return isrole;
}


/** 获取用户的资料 */
const Profile = () => { return profile; }

/** 用户Token */
const Token = () => { return token; }

/** 是否是匿名登录用户 */
const IsAnonymous = () => {
    return IsRole("Anonymous");
}

/**
 * 是否已登录
 */
const IsLogined = () => {
    return token !== null;
}

/** 是否是已登录用户 */
const IsLoggedUser = () => {
    return IsRole("User");
}

/** 清除用户Token */
const Clear = async () => {
    try {
        await NativeUtil.SecureValue.Remove('user', 'token');
        token = null;
        await NativeUtil.Storage.Set('profile', "{}");
        profile = {};
        await NativeUtil.SecureValue.Remove('user', 'roles');
        roles = [];
    }
    catch (err) {
        return Promise.reject(err);
    }
}

/** 匿名身份登录 */
export const LoginAsAnonymous = async () => {

    await Clear();

    let url = LTGHttp.GetAPIURI("AccessCode/New(AnonymousTokenV1,null)");
    try {
        let response = await LTGHttp.Request(url, {});
        if(response.token){
            await NativeUtil.SecureValue.Set('user', 'token', response.token);
            token = response.token;
            await NativeUtil.SecureValue.Set('user', 'roles', 'Anonymous');
            roles.push('anonymous');
            return Promise.resolve(response.token);
        }
        else{
            return Promise.reject(response);
        }
    }
    catch (err) {
        console.error(err);
        return Promise.reject(err);
    }

};

/**
 * 获取微信JsSDK需要的config
 */
export const GetWxJsSDKConfig = async () => {

    //const { origin, pathname, search, hash } = window.location;
    //const wxRequeestURL = window.btoa( encodeURIComponent(`${origin}${pathname}${search}${hash}`));
    const entryURL= await NativeUtil.Storage.Get("__entryURL");
    const wxRequeestURL = window.btoa(entryURL);
    let url = LTGHttp.GetAPIURI("AccessCode/New(WxJsSDKConfig," + wxRequeestURL + ")");

    try {
        let response = await LTGHttp.Request(url, {});
        return Promise.resolve(response);
    }
    catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

/**
 * 通过旧平台的微信信息登录；
 * 
 * @param unionId 微信UnionID
 * @param v3Token 旧系统Token
 */
export const LoginByWxLTGV3User = async (unionId: string, v3Token: string) => {
    var reqURL = LTGHttp.GetAPIURI("Account/Login");
    var reqData = { "authType": 32, "username": unionId, "password": v3Token };
    try {
        var loginStatus: any = await LTGHttp.Request(reqURL, { method: "POST", body: JSON.stringify(reqData) }, 'json');
        console.log('Logined:' + JSON.stringify(loginStatus));
        await NativeUtil.Storage.Set("profile", JSON.stringify(loginStatus.profile));
        await NativeUtil.SecureValue.Set('user', 'token', loginStatus.token);
        await NativeUtil.SecureValue.Set('user', 'roles', loginStatus.roles);
        await Reload();
    } catch (err) {
        return Promise.reject(err);
    }
}


export default {
    Load: Reload,
    IsRole,
    LoginByWxLTGV3User,
    LoginAsAnonymous,
    GetWxJsSDKConfig,
    Profile,
    Token,
    Clear,
    IsAnonymous,
    IsLoggedUser,
    IsLogined
};