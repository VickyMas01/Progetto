const URL_BASE='http://localhost:8800/api/auth',
    URL_BASE1='http://localhost:8800/api/users',
    URL_BASE2='http://localhost:8800/api/products',
    URL_BASE3='http://localhost:8800/api/orders',
    HEADERS={'Content-Type':'application/json'};

export default {
    registerUser: (user) => {
        return fetch(URL_BASE + '/register', {
            method: 'post',
            body: JSON.stringify(user),
            headers: HEADERS
        })
    },




    requestLogin: (user) => {
        return fetch(URL_BASE + '/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: HEADERS,
          //  withCredentials: true,
            credentials: 'include'
        })
    },




    endLog: () => {
        return fetch(URL_BASE + '/deleteCookie', {
            headers: HEADERS,
           // withCredentials: true,
            credentials: 'include'
        })
            .then((res => {
                if (!res.ok) {
                    throw new Error('Http error' + res.status)
                }
                return res.text()
            }))
            .catch(e => console.log(e))
    },




    checkAuth: () => {
        return fetch(URL_BASE1 + '/checkauthentication', {
            headers: HEADERS,
          //  withCredentials: true,
            credentials: 'include'
        })

    },





    getProducts: () => {
        return fetch(URL_BASE2 + '/', {
            headers: HEADERS,
          //  withCredentials: true,
            credentials: 'include'
        })
    },

    deleteProduct: (prodId) => {
        return fetch(URL_BASE2 + '/' + prodId, {
            method:'delete',
            headers: HEADERS,
            //  withCredentials: true,
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    window.alert('Qualcosa è andato storto')
                    throw new Error('Http error' + res.status)
                }
                return res.json();
            })
            .catch(e => console.log(e))
    },




    updateProduct: (prodId,reqBody) => {
        return fetch(URL_BASE2 + '/' + prodId, {
            method:'put',
            headers: HEADERS,
            body:JSON.stringify(reqBody),
            //  withCredentials: true,
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    window.alert('Qualcosa è andato storto')
                    throw new Error('Http error' + res.status)
                }
                return res.json();
            })
            .catch(e => console.log(e))
    },


    createProduct: (prod) => {
        return fetch(URL_BASE2 + '/', {
            method:'post',
            headers: HEADERS,
            body:JSON.stringify(prod),
            //  withCredentials: true,
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    window.alert('Qualcosa è andato storto')
                    throw new Error('Http error' + res.status)
                }
                return res.json();
            })
            .catch(e => console.log(e))
    },






    getOrder:(userId) =>{
      return fetch(URL_BASE1 + '/' + userId + '/orders',{
          headers:HEADERS,
          credentials:'include'
      })
          .then((res => {
          if (!res.ok) {
              window.alert('Qualcosa è andato storto')
              throw new Error('Http error' + res.status)
          }
          return res.json();
      }))
          .then(data => (data))

    },




    getOrders: () => {
        return fetch(URL_BASE3 + '/', {
            headers: HEADERS,
          //  withCredentials: true,
            credentials: 'include'
        })
    },





    createOrder:  (user,product) => {
        return fetch(URL_BASE3 + '/' + user + '/' + product,{
            method: 'post',
            body: JSON.stringify({id:user,prodId:product}),
            headers: HEADERS,
            withCredentials: true,
            credentials: 'include'
        })
            .then((res => {
                if (!res.ok) {
                    window.alert('Il tuo ordine non è stato creato per qualche motivo')
                    throw new Error('Http error' + res.status)
                }
                return res.json();
            }))
            .then(data => (data))
    },



    updateOrder: (order) => {
        return fetch(URL_BASE3 + '/' + order, {
            method: 'put',
            body: JSON.stringify(order),
            headers: HEADERS,
           // withCredentials: true,
            credentials: 'include'
        })
    },
}