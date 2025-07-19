// url替换工具

export function replaceHost(url:string,newHost:string):string {
  try{
    const u = new URL(url)
    u.host = newHost
    return u.toString()
  } catch (err){
    return url
  }
}