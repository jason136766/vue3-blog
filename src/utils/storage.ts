let setExpire = (key: string, value: string, exipre: number) => {
    let obj = {
        token: value,
        time: Date.now(),
        expire: exipre
    }

    localStorage.setItem(key, JSON.stringify(obj))
}


let getExpire = (key: any): any => {
    let val = localStorage.getItem(key)

    if (!val) {
        return val
    }

    let parsed = JSON.parse(val)
    let diff = Math.floor((Date.now() - parsed.time) / 1000)

    if (diff > parsed.expire) {
        localStorage.removeItem(key)
        return null
    }

    return parsed.token
}


export default {
    setExpire,
    getExpire
}