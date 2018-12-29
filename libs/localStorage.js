class LocalStorage {
    constructor(){

    }

    get(key){
        return new Promise((reslove,reject)=>{
            wx.getStorage({
                key,
                success:reslove,
                fail:reject
            })
        }).then(data=>{
            return JSON.parse(data.data)['v'];
        });
    }

    set(key,value){
        var data = JSON.stringify({
            v:value
        });
        return new Promise((reslove,reject)=>{
            wx.setStorage({
                key,
                data,
                success:reslove,
                fail:reject
            });
        })
    }
}

export default new LocalStorage();