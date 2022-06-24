import React from 'react';
import style from '../Styles/product.module.css'

export default class Product extends React.Component{
    constructor(props) {
        super(props);

        this.state={
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleAdmin=this.handleAdmin.bind(this)

    }

    handleClick(){
        this.props.onChange({
            _id:this.props.prod._id,
            title:this.props.prod.title,
            price:this.props.prod.price,
        })
    }

    handleAdmin(e){
        this.props.onChange({
            _id:this.props.prod._id,
            title:this.props.prod.title,
            ingredients:this.props.prod.ingredients,
            desc:this.props.prod.desc,
            photo:this.props.prod.photo,
            price:this.props.prod.price,
            disp:this.props.prod.disp,
            source:e.target
        })
    }






    render(){
        return(
            <li className={style.card}>
                <div>{this.props.prod.title}</div>
                <div><img src={this.props.prod.photo} alt='Immagine prodotto' width='200' height='150'/></div>
                <div>Ingredienti : {this.props.prod.ingredients}</div>
                <div>{this.props.prod.desc}</div>
                <div>{this.props.prod.price} € </div>
                {this.props.admin ?
                    this.props.prod.disp ? <><div>Presente in magazzino</div>
                            <div>
                                <button onClick={this.handleAdmin}>Aggiorna</button>
                                <button onClick={this.handleAdmin}>Elimina</button>
                            </div></>
                        :
                        <>
                        <div>Prodotto esaurito</div>
                    <div>
                        <button onClick={this.handleAdmin}>Aggiorna</button>
                        <button onClick={this.handleAdmin}>Elimina</button>
                    </div></>

                :
                 this.props.showDisp ?
                 this.props.prod.disp ? <><div>Presente in magazzino</div>
                    <div>
                        <button onClick={this.handleClick}>
                            <img src='https://media.istockphoto.com/vectors/shopping-cart-icon-vector-id1128229893?k=20&m=1128229893&s=612x612&w=0&h=uOQYRr-vTDnW60Mn8MWSwt6i9uK2SGni8jR1CKKELK8=' alt='CLICCA' height='25' width='25'/>
                        </button>
                    </div></>
                    :
                    <div>Prodotto esaurito</div> : <></>}

            </li>

        )
    }
}