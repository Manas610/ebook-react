export async function login(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)
      }
  
    const response = await fetch(`${process.env.REACT_APP_HOST}/login` , requestOptions);
    if(!response.ok){
      throw { message : response.statusText , status : response.status }
    }
    const data = await response.json();
    if(data.accessToken){
        sessionStorage.setItem("Token",JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid",JSON.stringify(data.user.id));
    }

    return data;
}


export async function register(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)
      }
  
      const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions);
      if(!response.ok){
        throw { message : response.statusText , status : response.status }
      }
      const data = await response.json();
      if(data.accessToken){
        sessionStorage.setItem("Token",JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid",JSON.stringify(data.user.id));
      }

      return data;
}

export function logOut(){
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("cbid");
}