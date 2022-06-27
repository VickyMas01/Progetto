import React from 'react';


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
            <li>
                <div>User id: {this.props.user}</div>
                <div>Prodotti: {this.props.products.join(', ')}</div>
                <div>Status: {this.props.status}</div>
                <div>{this.props.price}</div>
                {this.props.acceptor ?<>
                <button onClick={this.handleClick1}>Accetta</button>
                <button onClick={this.handleClick2}>Rifiuta</button></>:
                    <button onClick={this.handleDel}>Termina ed elimina</button>}
            </li>

        )
    }
}