import NativeUtil from './NativeUtil';

//线上生产环境
//let APIUrl = "https://ltgcloud-api.lightgym.cn/api/";
//线上开发环境
//let APIUrl = "https://ltgcloud-api.lightgym.cn:480/api/";
//本地
//let APIUrl = "http://localhost:7071/api/";
let APIUrl = "http://192.168.1.105:7071/api/";

/**
 * 请求状态开始和结束时调用的函数
 */
let requestStateFunc: Function;

/**
 * 
 * 绑定请求状态变更函数；
 * 应用场景：
 * - 显示页面的载入中和载入结束；
 * 
 * @param setStateFunc 请求状态开始和结束时调用的函数；
 * 
 */
export const RequestStateBind = (setStateFunc: Function) => {
    requestStateFunc = setStateFunc;
}

let lastRequestId:string|null = null;

/**
 * 设置请求状态；
 * 
 * @param context 
 * @param state 
 */
const setRequestState = (requestId:string, context:any,state:boolean)=>{
    if(state===true){
        lastRequestId = requestId;
        requestStateFunc?.call(context,true);
    }else{
        setTimeout(() => {
            if(lastRequestId!==requestId){
                return;
            }
            requestStateFunc?.call(context,false);
        }, 200);
    }
}

/**
 * 获取API的访问路径；
 * 
 * @param path 路径；
 */
const GetAPIURI = (path: string) => {
    return new URL(path, APIUrl);
};

/**
 * 设置API服务路径；
 * 
 * @param url URL
 */
const SetAPIURL = (url: string) => {
    APIUrl = url;
}

/**
 * 获取HTTP 请求头
 */
const getHttpRequestHeads = async () => {

    const token = await NativeUtil.SecureValue.Get('user', 'token');

    let headers = {
        'Authorization': 'LTGToken ' + token
    };

    return headers;

}


/**
 * 所有Http请求在出错后的统一处理
 * 
 * @param response Http响应对象
 */
const httpErrorActions = async (response: any) => {

    if (typeof (response) == 'string') {
        console.log(response);
        return;
    }

    let errData = null;

    if (response.status) {
        switch (response.status) {
            case 400:
                errData = { code: 400, message: '业务逻辑错误' };
                break;
            case 401:
                //LoginAsAnonymous();
                break;
            case -6:
                errData = { code: -6, message: '当前网络不可用' };
                break;
            case -4:
                errData = { code: -4, message: '网络超时，请稍后再试' };
                break;
            case 500:
                errData = { code: 500, message: '服务器错误(500)，请稍后再试' };
                break;
            default:
                break;
        }
    }
    console.error(errData);
    return errData;
}


/**
 * 处理并获取HTTP响应的Body值，根据acceptType参数做转换；
 * 
 * @param resp 响应对象Response
 * @param acceptType 获取的数据类型；
 * 
 */
const getHttpBoby: any = async (resp: Response, acceptType: 'none' | 'json' | 'buffer' | 'blob' | 'text' | 'formData') => {
    let data = null;
    try {
        switch (acceptType) {
            case 'json':
                data = await resp.json();
                break;
            case 'blob':
                data = await resp.blob();
                break;
            case 'buffer':
                data = await resp.arrayBuffer();
                break;
            case 'text':
                data = await resp.text();
                break;
            case 'formData':
                data = await resp.formData();
                break;
            default:
                break;
        }
    } catch (respBotyConvetErr) {
        if (resp.statusText) {
            data = resp.statusText;
        }
        console.error('An error occurred when call getHttpBoby(). message:', respBotyConvetErr);
    }
    return data;
}

/**
 * 
 * Http对象；
 * 
 * 
 * @param url  请求URL
 * @param parameters 请求参数：…… 
 * @param acceptType 获取的数据类型；
 */
export const Request = async (
    url: URL,
    parameters?:
        any, acceptType?: 'none' | 'json' | 'buffer' | 'blob' | 'text' | 'formData') => {

    const headers = await getHttpRequestHeads();

    if (parameters == null) {
        parameters = {};
    }

    if (acceptType == null) {
        acceptType = 'json';
    }

    if (parameters.mode == null) {
        parameters.mode = 'cors';
    }

    if (parameters.headers != null) {
        parameters.headers = { ...parameters.headers, ...headers };
    } else {
        parameters.headers = headers;
    }

    if (parameters.method == null) {
        parameters.method = "GET";
    }

    if (parameters.body && typeof (parameters.body) == 'object') {
        parameters.body = JSON.stringify(parameters.body);
    }

    try {
        const response = await fetch(url.href, parameters);
        if (!response.ok) {
            httpErrorActions(response);
            try {
                const data = await getHttpBoby(response, acceptType);
                const error = data || response.statusText;
                return Promise.reject(error);
            } catch (convertErr) {
                return Promise.reject(response);
            }
        } else {
            let data = getHttpBoby(response, acceptType);
            return Promise.resolve(data);
        }
    } catch (httpErr) {
        httpErrorActions(httpErr);
        return Promise.reject(httpErr);
    }

};


/**
 * 对过键值获取实体数据缓存项
 * 
 * @param entityName 实体名
 * @param entityPKey PKey
 * @param entityRKey RKey
 */
const getEntityCacheKeyByKeys = (entityName: string, entityPKey: string, entityRKey: string) => {
    return '@ent_' + entityName.toLowerCase() + "_" + entityPKey + '_' + entityRKey;
}

/**
 * 获取实体的缓存名称；
 * 
 * @param entityName 实体名
 * @param entity 实体记录
 * 
 */
const getEntityLocalCacheKey = (entityName: string, entity: any) => {
    let __partitionkey = entity['__partitionkey'];
    let __rowkey = entity['__rowkey'];
    return getEntityCacheKeyByKeys(entityName, __partitionkey, __rowkey);
}

/** 缓存项 */
interface CacheItem {
    object: any;
    expried: Date;
}

/**
 * 创建数据缓存对象
 * 
 * @param item 缓存对象
 * @param expried 缓存时间（秒）
 * 
 */
const buildCacheString = (item: any, expried?: number): string => {
    let expriedSeconds = expried == null ? 60 * 60 : expried;
    let cacheItem: CacheItem = { object: item, expried: new Date((new Date().valueOf() + expriedSeconds * 1000)) };
    let cacheString = JSON.stringify(cacheItem);
    return cacheString;
}

const toCacheItem = (storageItem: any): CacheItem => {
    try {
        let storageObj: CacheItem = JSON.parse(storageItem);
        storageObj.expried = new Date(storageObj.expried);
        return storageObj;
    }
    catch (err) {
        throw 'Error when call toCacheItem:(' + storageItem + ')';
    }
}

/**
 *  仅返回单条记录；
 * 
 * @param cacheKey 缓存键
 */
const accurateSearchCacheEntity = async (cacheKey: string): Promise<any> => {
    try {
        let result = await NativeUtil.Storage.Get(cacheKey);
        if (result == null) {
            return Promise.resolve(null);
        }
        let cacheItem = toCacheItem(result);
        let now = new Date();
        if (cacheItem.expried < now) {
            await NativeUtil.Storage.Remove(cacheKey);
            return Promise.resolve(null);
        }
        return Promise.resolve(cacheItem.object);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

/**
 *  通过实体PKey获取缓存记录，返回多条记录；
 * 
 * @param entityname 实体名
 * @param partitionKey PKEY
 */
const searchCacheEntitiesByPartitionKey = async (entityname: string, partitionKey: string): Promise<any> => {
    let resultSet: Array<any> = new Array<any>();
    let now = new Date();
    try {
        let keys = await NativeUtil.Storage.Keys();
        let searchKey = getEntityCacheKeyByKeys(entityname, partitionKey, '');
        for (let i = 0; i < keys.length; i++) {
            let cacheKey = keys[i];
            if (!cacheKey.startsWith(searchKey)) {
                continue;
            }
            let cacheString = await NativeUtil.Storage.Get(cacheKey);
            let cacheItem = toCacheItem(cacheString);
            if (cacheItem.expried < now) {
                await NativeUtil.Storage.Remove(cacheKey);
                continue;
            }
            resultSet.push(cacheItem.object);
        }
        return Promise.resolve(resultSet);
    }
    catch (err) {
        return Promise.reject(err);
    }
}


/**
 *  通过实体PKey获取缓存记录，返回多条记录；
 * 
 * @param entityname 实体名
 * @param partitionKey PKEY
 */
const searchCacheEntitiesByRowKey = async (entityname: string, rowKey: string): Promise<any> => {
    let resultSet: Array<any> = new Array<any>();
    let now = new Date();
    try {
        let keys = await NativeUtil.Storage.Keys();
        for (let i = 0; i < keys.length; i++) {
            let cacheKey = keys[i];
            if (!cacheKey.startsWith('@ent_' + entityname.toLowerCase() + "_") || !cacheKey.endsWith('_' + rowKey)) {
                continue;
            }
            let cacheString = await NativeUtil.Storage.Get(cacheKey);
            let cacheItem = toCacheItem(cacheString);
            if (cacheItem.expried < now) {
                await NativeUtil.Storage.Remove(cacheKey);
                continue;
            }
            resultSet.push(cacheItem.object);
        }
        return Promise.resolve(resultSet);
    }
    catch (err) {
        return Promise.reject(err);
    }
}



/**
 * 通过键值获取缓存对象；
 * 
 * @param enttiyName 实体名
 * @param rowkey ROWKEY
 * @param partitionkey PartitionKey
 */
const getItemsFromCacheByKeys = async (enttiyName: string, rowkey?: string | null, partitionkey?: string | null) => {
    /**
     * searchType 搜索类型
     * 
     * 0，精准搜索；1，仅按实体搜；2，按PKEY搜，3，按RKEY搜；
     * 
     */
    let searchType = 0;
    if (rowkey == null && partitionkey == null) {
        searchType = 1;
    } else if (rowkey == null && partitionkey != null) {
        searchType = 2;
    } else if (rowkey != null && partitionkey == null) {
        searchType = 3;
    }
    let resultSet: Array<any> = new Array<any>();
    try {
        switch (searchType) {
            case 0: //0，精准搜索
                if (partitionkey == null || rowkey == null) {
                    throw "The func accurateSearchCacheEntity is  miss partitionkey or rowkey";
                }
                let key0 = getEntityCacheKeyByKeys(enttiyName, partitionkey, rowkey);
                let item0 = await accurateSearchCacheEntity(key0);
                if (item0) {
                    resultSet.push(item0);
                }
                break;
            case 1://1，仅按实体搜
                throw "The func getItemsFromCacheByKeys Miss args ,rowkey or partitionkey. ";
            case 2://2，按PKEY搜
                let items2 = await searchCacheEntitiesByPartitionKey(enttiyName, partitionkey ?? '');
                if (items2) {
                    resultSet = resultSet.concat(items2);
                }
                break;
            case 3://3，按RKEY搜；
                let items3 = await searchCacheEntitiesByRowKey(enttiyName, rowkey ?? '');
                if (items3) {
                    resultSet = resultSet.concat(items3);
                }
                break;
            default: break;
        }
        return Promise.resolve(resultSet);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 将指定查询的URL所获取到的数据进行本地缓存；
 * 
 * @param entityname 实体名；
 * @param queryURL 查询请求的URL
 * @param items 缓存对象
 * @param expried 过期时间（秒）
 */
const saveQueryToCache = async (entityname: string, queryURL: string, items: Array<any>, expried?: number) => {
    let cacheQueryKey = '@query_' + entityname.toLowerCase() + '_' + queryURL.toLowerCase();
    expried = expried ?? 60 * 5;
    //带字段查询的记录对本地做更新操作；否则不更新本地实体记录
    if (queryURL.indexOf('$select=') >= 0) {
        for (let ekey in items) {
            let item = items[ekey];
            await updateEntityCache(entityname, item, expried);
        }
    } else {
        for (let ekey in items) {
            let item = items[ekey];
            await createEnttiyCache(entityname, item, expried);
        }
    }
    //保存记录；
    let cacheData = buildCacheString(items, expried);
    try {
        await NativeUtil.Storage.Set(cacheQueryKey, cacheData);
        return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 
 * 获取实体对应缓存键的缓存数据；
 * 
 * @param entityname    实例名；
 * @param cacheKey      缓存键
 */
const getQueryCacheByCacheKey = async (entityname: string, cacheKey: string) => {
    try {
        let cacheString = await NativeUtil.Storage.Get(cacheKey);
        if (cacheString == null) {
            return Promise.resolve(null);
        }
        let now = new Date();
        let cacheItem = toCacheItem(cacheString);
        if (cacheItem.expried < now) {
            await NativeUtil.Storage.Remove(cacheKey);
            return Promise.resolve(null);
        }
        for (let ikey in cacheItem.object) {
            let item = cacheItem.object[ikey];
            if (item == null) {
                continue;
            }
            let itemCacheKey = getEntityLocalCacheKey(entityname, item);
            let itemCacheEntity = await accurateSearchCacheEntity(itemCacheKey);
            if (itemCacheEntity == null) {
                continue;
            }
            if (item.__etag !== itemCacheEntity.__etag) {
                cacheItem.object[ikey] = itemCacheEntity;
            }
        }
        return Promise.resolve(cacheItem.object);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 通过查询URL获取查询缓存
 * 
 * @param entityname 实体名
 * @param queryURL 查询URL
 */
const getQueryCache = async (entityname: string, queryURL: string) => {
    let cacheQueryKey = '@query_' + entityname.toLowerCase() + '_' + queryURL.toLowerCase();
    try {
        let queryCacheItems = await getQueryCacheByCacheKey(entityname, cacheQueryKey);
        return Promise.resolve(queryCacheItems);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 保存记录到缓存中
 * 
 * @param entity 实体记录
 */
const createEnttiyCache = async (entityName: string, entity: any, expried?: number) => {
    let key = getEntityLocalCacheKey(entityName, entity);
    let cacheItem = buildCacheString(entity, expried);
    await NativeUtil.Storage.Set(key, cacheItem);
}


/**
 * 更新实体记录到缓存中
 * 
 * @param entityName 实体名
 * @param entity 实体记录
 */
const updateEntityCache = async (entityName: string, entity: any, expried?: number) => {
    let key = getEntityLocalCacheKey(entityName, entity);
    let cacheEntity = await accurateSearchCacheEntity(key);
    if (cacheEntity) {
        let updatedEntity = { ...cacheEntity, ...entity };
        await createEnttiyCache(entityName, updatedEntity, expried);
        return Promise.resolve(updatedEntity);
    } else {
        return Promise.resolve(null);
    }
}


export const Data = {

    /* 创建记录 */
    Create: async (name: string, entity: any, expried?: number) => {
        let requestId = (new Date()).toISOString();
        setRequestState(requestId,{ method: "Create", entityName: name, data: entity, status: 0 }, true);
        let api = GetAPIURI("data/" + name);
        try {
            let crearted = await Request(api, {
                method: "POST",
                body: entity
            }, "json");
            await Data.ClearCache(name);
            await createEnttiyCache(name, crearted);
            setRequestState(requestId,{ method: "Create", entityName: name, data: crearted, status: 1 }, false);
            return Promise.resolve(crearted);
        }
        catch (err) {
            setRequestState(requestId,{ method: "Create", entityName: name, data: err, status: 2 }, false);
            return Promise.reject(err);
        }
    },

    /* 更新记录 */
    Update: async (name: string, entity: any, expried?: number, retryCount?: number) => {
        let requestId = (new Date()).toISOString();
        setRequestState(requestId,{  method: "Update", entityName: name, data: entity, status: 0 }, true);
        if (entity["__etag"] == null) {
            throw "Update a entity need a ETag value.";
        }
        let api = GetAPIURI("data/" + name);

        try {
            let updated: any = await Request(api, {
                method: "PATCH",
                body: entity
            }, "json");
            await updateEntityCache(name, updated, expried);
            setRequestState(requestId,{  method: "Update", entityName: name, data: updated, status: 1 }, false);
            return Promise.resolve(updated);
        } catch (err) {
            if (retryCount == null) {
                retryCount = 1;
            }
            if (err.message && err.message === 'Precondition Failed' && retryCount <= 2) {
                try {
                    let target = await Data.Retrieve(name, entity.__partitionkey + ',' + entity.__rowkey, null, 0);
                    let updateTarget = await Data.GetUpdateEntity(target);
                    let newUpdateEntity = { ...entity, ...updateTarget };
                    let newUpdated: any = await Data.Update(name, newUpdateEntity, expried, retryCount++);
                    setRequestState(requestId,{  method: "Update", entityName: name, data: newUpdated, status: 1 }, false);
                    return Promise.resolve(newUpdated);
                } catch (errNext) {
                    setRequestState(requestId,{  method: "Update", entityName: name, data: errNext, status: 2 }, false);
                    return Promise.reject(errNext);
                }
            } else {
                setRequestState(requestId,{  method: "Update", entityName: name, data: err, status: 2 }, false);
                return Promise.reject(err);
            }
        }
    },

    /**
     * 查询单条记录；（异步）
     * 
     * 
     */
    Retrieve: async (name: string, keys: string, select?: string | null, expried?: number) => {
        let requestId = (new Date()).toISOString();
        setRequestState(requestId,{  method: "Retrieve", entityName: name, data: select, status: 0 }, true);
        let url = "data/" + name + "(" + keys + ")" + (select ? "?$select=" + select : "")
        let api = GetAPIURI(url);

        if (expried !== 0) {
            let keyArray = keys.split(',');
            let pkey, rkey;
            if (keyArray.length == 1) {
                rkey = keyArray[0];
            } else if (keyArray.length == 2) {
                pkey = keyArray[0];
                rkey = keyArray[1];
            } else {
                throw 'Retrieve: The keys has a mistake format.';
            }

            let cacheItems = await getItemsFromCacheByKeys(name, rkey, pkey);
            if (cacheItems && cacheItems.length > 0) {
                setRequestState(requestId,{  method: "Retrieve", entityName: name, data: select, status: 1 }, false);
                return Promise.resolve(cacheItems[0]);
            }
        }

        try {
            let retreiveResult = await Request(api, {
                method: "GET"
            }, "json");
            if (retreiveResult) {
                await createEnttiyCache(name, retreiveResult, expried);
            }
            setRequestState(requestId,{  method: "Retrieve", entityName: name, data: select, status: 1 }, false);
            return Promise.resolve(retreiveResult);
        }
        catch (err) {
            setRequestState(requestId,{  method: "Retrieve", entityName: name, data: err, status: 2 }, false);
            return Promise.reject(err);
        }

    },

    /**
     * 异步查询记录
     * 
     * 注意：分页查询时，除首次查询外，应使用QueryNext方法执行下次查询。
     * 
     * @param name      实体名称,不区分大小写。
     * @param filter    查询条件（参考OData协议的$filter相关说明文档）
     * @param select    选择字段，字段区分大小写，多个字段用逗号隔开。
     * @param count     记录数
     * @param expried   缓存过期时间（秒）
     * 
     */
    Query:
        async (
            name: string,
            filter?: string | null,
            select?: string | null,
            count?: number | null,
            expried?: number ,
            cookies?:any | null
        ) => {
            let requestId = (new Date()).toISOString();
            setRequestState(requestId,{ method: "Query", entityName: name, data: select, status: 0 }, true);
            let query = [];

            if (select) {
                query.push("$select=" + select);
            }

            if(cookies && filter){
                query.push("$filter=(" + filter +") and PartitionKey ge '" +cookies.pkey+"' and RowKey ge '"+ cookies.rkey+"'");
            } else if(filter) {
                query.push("$filter=" + filter);
            } else if(cookies){
                query.push("$filter=PartitionKey ge '" +cookies.pkey+"' and RowKey ge '"+ cookies.rkey+"'");
            }

            if (count) {
                query.push("$count=" + (count +1));
            }

            let url = "data/" + name + (query.length > 0 ? "?" + query.join('&') : "");
            let api = GetAPIURI(url);

            if (expried !== 0) {

                let cacheQueryResult = await getQueryCache(name, url);

                if (cacheQueryResult !== null) {
                    if (cacheQueryResult.length > 0 && count && count + 1 == cacheQueryResult.length) {

                        //如果获取记录数超过页记录数，则作分页token保存；
                        let queryCookiesKey ="@qcookie_"+ name + (filter??"") + (select??"") + count?.toString();
                        let lastItem = cacheQueryResult[cacheQueryResult.length-1]
                        let queryCookies = { 'pkey': lastItem.__partitionkey, 'rkey': lastItem.__rowkey };
                        await NativeUtil.Storage.Set(queryCookiesKey, JSON.stringify(queryCookies));
                        cacheQueryResult.pop();

                    }else if(cacheQueryResult.length > 0 && count && count + 1 > cacheQueryResult.length){
                        let queryCookiesKey ="@qcookie_"+ name + (filter??"") + (select??"") + count?.toString();
                        await NativeUtil.Storage.Set(queryCookiesKey, "(NoMore)");
                    }
                    
                    setRequestState(requestId,{ method: "Query", entityName: name, data: select, status: 1 }, false);
                    return Promise.resolve(cacheQueryResult);
                }
            }

            try {

                let queryResult = await Request(api, {
                    method: "GET"
                }, "json");

                if (expried !== 0) {
                    await saveQueryToCache(name, url, queryResult, expried)
                }

                if (queryResult.length > 0 && count && count + 1 == queryResult.length) {
                    //如果获取记录数超过页记录数，则作分页token保存；
                    let queryCookiesKey ="@qcookie_"+ name + (filter??"") + (select??"") + count?.toString();
                    let lastItem = queryResult[queryResult.length-1];
                    let queryCookies = { 'pkey': lastItem.__partitionkey, 'rkey': lastItem.__rowkey };
                    await NativeUtil.Storage.Set(queryCookiesKey, JSON.stringify(queryCookies));
                    queryResult.pop();
                }else if(queryResult.length > 0 && count && count + 1 > queryResult.length){
                    let queryCookiesKey ="@qcookie_"+ name + (filter??"") + (select??"") + count?.toString();
                    await NativeUtil.Storage.Set(queryCookiesKey, "(NoMore)");
                }
               
                setRequestState(requestId,{ method: "Query", entityName: name, data: queryResult, status: 1 }, false);
                return Promise.resolve(queryResult);

            }
            catch (err) {
                setRequestState(requestId,{ method: "Query", entityName: name, data: err, status: 2 }, false);
                return Promise.reject(err);
            }
        },

    QueryNext: async (name: string, filter?: string | null, select?: string | null, count?: number | null, expried?: number) => {

        let queryCookiesKey = "@qcookie_"+  name + (filter??"") + (select??"") + count?.toString();

        try {

            let queryCookiesStr = await NativeUtil.Storage.Get(queryCookiesKey);

            if (queryCookiesStr == null) {

                let queryResut = await Data.Query(name, filter, select, count, expried);
                return Promise.resolve(queryResut);

            } else {

                if(queryCookiesStr=="(NoMore)"){
                    return Promise.resolve([]);
                }
                let queryCookies = JSON.parse(queryCookiesStr);
                let queryResut = await Data.Query(name, filter, select, count, expried , queryCookies);
                return Promise.resolve(queryResut);

            }

        } catch (err) {
            return Promise.reject(err);
        }

    },

    /* 删除记录 */
    Delete: async (name: string, entity: any) => {
        let requestId = (new Date()).toISOString();
        setRequestState(requestId,{ method: "Delete", entityName: name, data: entity, status: 0 }, true);
        if (entity["__etag"] == null) {
            setRequestState(requestId,{ method: "Delete", entityName: name, data: entity, status: 2 }, false);
            return Promise.reject("Update entity need a ETag value.");
        }

        let api = GetAPIURI("data/" + name);
        try {
            let delResult = await Request(api, {
                method: "DELETE",
                body: entity
            }, "json");
            let entityCaechKey = getEntityLocalCacheKey(name, entity);
            await NativeUtil.Storage.Remove(entityCaechKey);
            let baseEntity = Data.GetUpdateEntity(entity);
            delete baseEntity.__etag;
            await Data.ClearCache(name, baseEntity);
            setRequestState(requestId,{ method: "Delete", entityName: name, data: delResult, status: 1 }, false);
            return Promise.resolve(delResult);
        }
        catch (err) {
            setRequestState(requestId,{ method: "Delete", entityName: name, data: err, status: 2 }, false);
            return Promise.reject(err);
        }
    },

    /* 获取更新模版 */
    GetUpdateEntity: (entity: any) => {

        if (entity == null) {
            throw "The entity is null or undefined";
        }

        if (entity["__etag"] == null) {
            throw "The entity is missing __etag value";
        }

        let updateTarget: any = {
            "__etag": entity["__etag"],
            "__partitionkey": entity["__partitionkey"] ?? null,
            "__rowkey": entity["__rowkey"] ?? null
        };

        return updateTarget;
    },

    /**
     * 清理实体的所有查询缓存；
     * 
     * @param entityName 实体名
     */
    ClearCache: async (entityName: string, filter?: any) => {
        entityName = entityName.toLowerCase();
        try {
            let keys = await NativeUtil.Storage.Keys();
            for (let i = 0; i < keys.length; i++) {
                let cacheKey = keys[i];
                let startKey = '@query_' + entityName + '_';
                if (cacheKey.startsWith(startKey) && filter == null) {
                    await NativeUtil.Storage.Remove(cacheKey);
                    continue;
                } else if (cacheKey.startsWith(startKey)) {
                    let queryCacheItems = await getQueryCacheByCacheKey(entityName, cacheKey);
                    if (queryCacheItems == null) {
                        continue;
                    }
                    for (let i in queryCacheItems) {
                        let cacheItem = queryCacheItems[i];
                        let sameVals = true;
                        for (let fkey in filter) {
                            let fval = filter[fkey];
                            let cval = cacheItem[fkey];
                            if (fval != cval) {
                                sameVals = false;
                            }
                        }
                        if (sameVals === true) {
                            await NativeUtil.Storage.Remove(cacheKey);
                            break;
                        }
                    }
                    continue;
                }
                let startKey2 = '@ent_' + entityName + '_';
                if (cacheKey.startsWith(startKey2) && filter == null) {
                    await NativeUtil.Storage.Remove(startKey2);
                    continue;
                } else if (cacheKey.startsWith(startKey2)) {
                    let sameVals = true;
                    let cacheItem = await accurateSearchCacheEntity(cacheKey);
                    if (cacheItem == null) {
                        continue;
                    }
                    for (let fkey in filter) {
                        let fval = filter[fkey];
                        let cval = cacheItem[fkey];
                        if (fval != cval) {
                            sameVals = false;
                        }
                    }
                    if (sameVals === true) {
                        await NativeUtil.Storage.Remove(cacheKey);
                    }
                }
            }
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

};


export default {
    GetAPIURI,
    Data,
    SetAPIURL,
    Request
};
