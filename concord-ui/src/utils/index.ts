export const setUserToStore = (user:any) => {
   if(typeof window !== "undefined") {
      window.sessionStorage.setItem('_u',JSON.stringify(user));
   }
}

export const getUserFromStore = ()=> {
    if(typeof window !== "undefined") {
        return JSON.parse(window.sessionStorage.getItem('_u') || '{}');
     }
}