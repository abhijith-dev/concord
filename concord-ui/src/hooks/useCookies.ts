
const setCookies = (cookies:any,age:any):void => {
   if(typeof window !== "undefined" ){
    const entires = Object.entries(cookies);
    for(let entry of entires){
      document.cookie = ""+entry[0]+ "="+entry[1]+";max-age:"+2000+";";
    };
   }
};

const getCookies = (key:string) => {
    if(typeof window !== "undefined" ){
      const c = document.cookie.split(";");
      const o:any = {};
      for(let i of c){
         const [m,n] =i.split("=")
         o[m] =n;
      };

      return o[key];
    }
}


export default function useCookies() {
   return {
     setCookies,
     getCookies
   }
};


