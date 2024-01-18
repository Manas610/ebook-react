function getData(){
    const token = JSON.parse(sessionStorage.getItem("Token"))
    const cbid = JSON.parse(sessionStorage.getItem("cbid"))

    return {token , cbid}
}

export async function getUser(){
    const browserData = getData();
    const requestOptions = {
        method : "GET",
        headers : {"Content-Type" : "application/json" , Authorization : `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.cbid}` , requestOptions);
    if(!response.ok){
        throw { message : response.statusText , status : response.status }//eslint-disable-line
    }
    const data = response.json();
    return data;
}

export async function getUserOrder(){
    const browserData = getData();
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.cbid}` , {
        method : "GET",
        headers : { "Content-Type" : "application/json" , Authorization : `Bearer ${browserData.token}`}
    })
    if(!response.ok){
        throw { message : response.statusText , status : response.status }//eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function createOrder(cartList , total , userDetail){
    const browserData = getData();
    const orderDetails = {
        cartList : cartList,
        amount_paid : total,
        quantity : cartList.length,
        user : {
            name : userDetail.name,
            email : userDetail.email,
            id : userDetail.id
        }
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders` , {
        method : "POST",
        headers : {"Content-Type" : "application/json" , Authorization : `Bearer ${browserData.token}`},
        body : JSON.stringify(orderDetails)
    })
    if(!response.ok){
        throw { message : response.statusText , status : response.status }//eslint-disable-line
    }
    const data = response.json();
    return data;
}