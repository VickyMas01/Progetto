import React from 'react'
import Header from "../Components/Header";
import OrderList from "../Components/OrderList";
import Services from "../Services/services";
import style from '../Styles/chef.module.css'


export default class Chef extends React.Component {
    constructor(props) {
        super(props);


        this.handleAccept = this.handleAccept.bind(this)
        this.handleRefuse = this.handleRefuse.bind(this)

    }

    handleAccept(order) {
        Services.updateOrder(order._id,{
            orderId:order._id,
            taken:order.target
        });
        order.src.parentNode.remove();
    }


    handleRefuse(order) {
        Services.updateOrder(order._id,{
            orderId:order._id,
            taken:order.target
        });
        order.src.parentNode.remove();
    }


    handleDelete(order){
        Services.deleteOrder(order.userId,{
            id:order.userId
        });
        order.src.parentNode.remove();
    }

    render() {
        return (
            <div>
                {sessionStorage.length === 0 ? <></> :
                    <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                            isAdmin={JSON.parse(sessionStorage.getItem('utente')).isAdmin}
                            isChef={JSON.parse(sessionStorage.getItem('utente')).isChef}/>}
                             
             <div id="changeChef" className={style.main}>
                <span className={style.lastOrders}>Ultimi ordini</span>
                <ul className={style.list}>
                    <OrderList onChange1={this.handleAccept} onChange2={this.handleRefuse} onChange3={this.handleDelete}/>
                </ul>
             </div>

           </div>
        )
    }
}