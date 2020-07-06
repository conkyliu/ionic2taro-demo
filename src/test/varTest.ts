let var1 = 1;

const getVar = ()=>{
    return var1;
}

const setVar = (val:number)=>{
    var1 = val;
}

export default {
    getVar,setVar
}