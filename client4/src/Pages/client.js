import React from 'react'
import Header from "../Components/Header";
import ProductList from '../Components/ProductList';
import Product from "../Components/Product";
import Services from "../Services/services";
import OrderBox from "../Components/OrderBox";
import style from '../Styles/client.module.css'


let arr=[];
let counter1=0;
let counter2=0;
let vett=[];
let sum = 0;
let c=0;
const cArr=[];

export default class Client extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartOpened: false,
            prods: [],
            total:0,
            order:'',
            orderOpened:false,
            alreadyOrder:false
        }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleOther = this.handleOther.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handlePurchase=this.handlePurchase.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
        this.handleGet = this.handleGet.bind(this)
    }

    componentDidMount() {
         this.handleCheck();
         this.handleGet();
    }
    handleCheck(){
        Services.checkAuth()
            .then((res => {
                if(!res.ok){
                    window.history.pushState({}, "", '/');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop)}
                return res.text()
            }))
            .catch(error => error)
    }

    handleGet(){
        Services.getOrder(JSON.parse(sessionStorage.getItem('utente')).details._id)
            .then(data => {
                if(data.length !== 0){
                    this.setState({
                        order:data[0],
                        alreadyOrder:true
                    })
                }
            })
            .catch(e => console.log(e))
    }

    handleClick1() {
        counter1++
        const op = counter1 % 2;
        if (op === 1) {
            if(this.state.orderOpened){this.handleClick2()}
            this.setState({cartOpened: true});
            document.getElementById("change").style.width="60vw";
            
        
        } else {
            this.setState({cartOpened: false});
            document.getElementById("change").style.width="100vw"
        
        }
    }
    //document.getElementById(id).style.property = new style
    handleClick2() {
        counter2++
        const op = counter2 % 2;
        if (op === 1) {
            if(this.state.cartOpened){this.handleClick1()}
            this.setState({orderOpened: true});
                document.getElementById("change").style.width="60vw";
        } else {
            this.setState({orderOpened: false});
                document.getElementById("change").style.width="100vw";
        }
    }



    handleOther(prod) {
        arr.push(prod);
        const f = 'i'+c;
        cArr.push(c);
        c++;
        const lastPrice = arr.slice(-1)[0].price
        vett.push(<div id={f}><Product prod={arr.slice(-1)[0]} showDisp={false}/><button className={style.delButt} onClick={this.handleDelete}>X</button></div>)
        this.setState({
            prods:vett
        })
        sum = sum + lastPrice;
        this.setState({total:sum})
    }


    handleDelete(e) {
        const el=e.target.parentElement;
        const i=cArr.findIndex((e) =>{
            const f='#i'+e;
            return el===document.querySelector('div'+f)
        })
        cArr.splice(i,1)
        const falsePrice= arr.at(i).price;
        sum=sum-falsePrice;
        this.setState({
            total:sum
        })
        arr.splice(i,1)
        vett.splice(i,1);
        this.setState({prods:vett})
    }


    async handlePurchase(){
        window.alert('Grazie per l\'acquisto, ora deve aspettare');

//QUI USARE FOREACH CAUSA ERRORI PER VIA DELLE PROMISE!!!!!!!
        for (let i = 0; i<arr.length; i++) {
            try{
                const data =await Services.createOrder(JSON.parse(sessionStorage.getItem('utente')).details._id,arr.at(i)._id)
                this.setState({order : data})
            }catch (err){
                window.alert('Per qualche motivo non è stato possibile creare l\'ordine');
            }

        } 
        arr=[];
        vett=[];
        sum=0;
        this.setState({prods:[]})
        this.setState({total:0})
        this.setState({alreadyOrder:true})
    }


    render() {
        return (
            <div>
             {sessionStorage.length === 0 ? <></>:
                <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                        isAdmin={JSON.parse(sessionStorage.getItem('utente')).details.isAdmin}
                        isChef={JSON.parse(sessionStorage.getItem('utente')).details.isChef}/>}
              <button className={style.cart} onClick={this.handleClick1}></button>

              <p className={style.counter}>{this.state.prods.length}</p>
              <button className={style.order} onClick={this.handleClick2}>Il mio ordine</button>

               <div id="change" className={style.main}>
                  {this.state.cartOpened &&
                   <div className={style.cartSection}>
                      <span className={style.cartitle}>Carrello</span>
                      {this.state.alreadyOrder ? <p className={style.wait}>Hai già un ordine in corso,attendi</p>:
                         <>
                            {this.state.prods.length > 0 ?<>
                            <span className={style.recap}>Riepilogo</span>
                            <div className={style.total}>Totale: <span>{this.state.total} €</span></div>
                            <button className={style.agree} onClick={this.handlePurchase}>Conferma Ordine</button></> :
                              <div className={style.noProd}>Nessun articolo nel carrello</div>
                            }
                            <ul className={style.cartList}>
                            {this.state.prods}
                           </ul>
                            
                         </>
                       }
                   </div>}
            
                    <ProductList onChange={this.handleOther} admin={false}/>
                      
                  
               </div>
                      <div className={style.orderStatus}>
                        {this.state.orderOpened &&
                         <OrderBox order={this.state.order} user={JSON.parse(sessionStorage.getItem('utente')).details.username}/>}
                        </div>
            </div>
        )
    }//
}