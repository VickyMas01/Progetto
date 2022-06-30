import React from 'react';
import style from '../Styles/order.module.css'


export default class Order extends React.Component{
    constructor(props) {
        super(props);

        this.state = {}
        console.log(this.props.user)
        this.handleAcc=this.handleAcc.bind(this)
        this.handleRef=this.handleRef.bind(this)
        this.handleDel=this.handleDel.bind(this)
    }


    handleAcc(e) {
        this.props.onChange1({
            src: e.target,
            _id: this.props.id,
            target: 'Accepted'
        })
    }

    handleRef(e){
        this.props.onChange2({
            src:e.target,
            _id:this.props.id,
            target:'Rejected'
        })
    }



    handleDel(e){
        this.props.onChange3({
            src:e.target,
            _id:this.props.id,
            userId:this.props.user
        })

    }





    render(){
        return(
            <div  className={style.orderCard} >
            <li>
                <div className={style.userId}>User id: {this.props.user}</div>
                <div className={style.prdo}>Prodotti: {this.props.products.join(', ')}</div>
                <div className={style.status}>Status: {this.props.status}</div>
                <div className={style.price}>{this.props.price} € </div>
                {this.props.acceptor ?<>
                <button className={style.accept} onClick={this.handleAcc}>Accetta</button>
                <button className={style.noAcc} onClick={this.handleRef}>Rifiuta</button></>:
                    <button className={style.end} onClick={this.handleDel}>Termina ed elimina</button>}
            </li>
            </div>

        )
    }
}