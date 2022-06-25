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
                <div className={style.title}>{this.props.prod.title}</div>
                  <img src={this.props.prod.photo} alt='Immagine prodotto' className={style.image}/>
                <div className={style.ingredients}>Ingredienti : {this.props.prod.ingredients}</div>
                <div className={style.description}>{this.props.prod.desc}</div>
                <div className={style.price}>{this.props.prod.price} € </div>

                <div className={style.isIn}>
                {this.props.admin ?
                    this.props.prod.disp ? <><div className={style.in}>Disponibile</div>
                            <div>
                                <button onClick={this.handleAdmin}>Aggiorna</button>
                                <button onClick={this.handleAdmin}>Elimina</button>
                            </div></>
                        :
                        <>
                        <div className={style.notIn}>Non disponibile</div>
                    <div>
                        <button onClick={this.handleAdmin}>Aggiorna</button>
                        <button onClick={this.handleAdmin}>Elimina</button>
                    </div></>

                :
                 this.props.showDisp ?
                 this.props.prod.disp ? <><div className={style.in}>Disponibile</div>
                    <div>
                        <button className={style.addToOrder} onClick={this.handleClick}>
                            +
                        </button>
                    </div></>
                    :
                    <div className={style.notIn}>Non disponibile</div> : <></>}
                </div>
                

            </li>

        )
    }
}