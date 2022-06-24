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
                console.log(data)
                if(data.length !== 0){
                    this.setState({
                        order:data[0],
                        alreadyOrder:true
                    })
                }console.log(this.state.order)

            })
            .catch(e => console.log(e))
    }

    handleClick1() {
        counter1++
        const op = counter1 % 2;
        if (op === 1) {
            this.setState({cartOpened: true})
        } else {
            this.setState({cartOpened: false})
        }
    }

    handleClick2() {
        counter2++
        const op = counter2 % 2;
        if (op === 1) {
            this.setState({orderOpened: true})
        } else {
            this.setState({orderOpened: false})
        }
    }



    handleOther(prod) {
        arr.push(prod);
        const f = 'i'+c;
        cArr.push(c);
        c++;
        const lastPrice = arr.slice(-1)[0].price
        vett.push(<div id={f}><Product prod={arr.slice(-1)[0]} showDisp={false}/><button onClick={this.handleDelete}>X</button></div>)
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

        if(arr.length !==0){
            this.setState({alreadyOrder: true})
        }
        arr=[];
        vett=[];
        sum=0;
        this.setState({prods:[]})
        this.setState({total:0})
        this.setState({alreadyOrder:true})
        console.log(this.state.order)
    }


    render() {
        return (
            <div>
            {sessionStorage.length === 0 ? <></>:
                <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                        isAdmin={JSON.parse(sessionStorage.getItem('utente')).details.isAdmin}
                        isChef={JSON.parse(sessionStorage.getItem('utente')).details.isChef}/>}
            
            {this.state.cartOpened &&
            <div>
                <span>Carrello</span>
                <ul>
                    {this.state.prods}
                </ul>
                <div>Prezzo totale: <span>{this.state.total}</span></div>
                <button onClick={this.handlePurchase}>Conferma Ordine</button>
          </div>}
            
                <button className={style.cart} onClick={this.handleClick1}></button>
                <p className={style.counter}>{this.state.prods.length}</p>
                <button className={style.order} onClick={this.handleClick2}>Il mio ordine</button>
                <div className={style.main}>
                <ProductList onChange={this.handleOther} admin={false}/>
                 {this.state.orderOpened &&
                    <OrderBox orders={this.state.order} />}
                </div>
                
            

        </div>
        )
    }
}