import React from 'react';
import Services from "../Services/services";
import style from '../Styles/formProd.module.css'



export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title:this.props.product.title ,
            ingredients:this.props.product.ingredients,
            desc:this.props.product.desc ,
            photo:this.props.product.photo  ,
            price:this.props.product.price ,
            disp:this.props.product.disp,
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        // console.log(this.props.product.photo)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick() {
        this.props.hide()
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.hide()
        if(this.props.upd) {
            Services.updateProduct(this.props.product._id, this.state)
                .then(() =>{
                    window.location.reload();
                })
                .catch(e => console.log(e))
        }else{
            Services.createProduct(this.state)
            .then(() =>{
                window.location.reload();
            })
            .catch(e => console.log(e))}
    }





    render() {
        return (
            <>
                
                <button className={style.close} onClick={this.handleClick}>X</button>
                <form onSubmit={this.handleSubmit}>
                    <div className={style.name} >
                        <label htmlFor='title'>Nome prodotto </label>
                        <br/>
                        <input className={style.nIn} placeholder="Nome prodotto" type="text" required
                                onChange={this.handleChange} value={this.state.title} name="title"/>
                    </div>
                    <br/>
                    <div className={style.ing}>
                        <label htmlFor='ingredients'> Ingredienti </label>
                        <br/>
                        <textarea className={style.iIn} placeholder="Ingredienti"  required onChange={this.handleChange}  id="ingredients" name='ingredients'>{this.state.ingredients}</textarea>
                    </div>
                    <br/>
                    <div className={style.desc}>
                        <label htmlFor='description'>Descrizione</label>
                        <br/>
                        <textarea className={style.dIn} placeholder="Descrizione"  required onChange={this.handleChange} id='desc' name="desc" maxLength='30'>{this.state.desc}</textarea>
                    </div>
                    <br/>
                    <div className={style.urlPh}>
                        <label htmlFor='photo'>Url foto</label>
                        <br/>
                        <input className={style.phIn} placeholder="Foto" type="text"
                               onChange={this.handleChange} value={this.state.photo} name="photo"/>
                    </div>
                    <br/>
                    <div className={style.price}>
                        <label htmlFor='price'>Prezzo </label>
                        <br/>
                        <input className={style.pIn} placeholder="Prezzo" type="number" required
                               onChange={this.handleChange} value={this.state.price} name="price"/>
                    </div>
                    <br/>
                    <div className={style.isIn}>
                        <label className={style.disp} htmlFor='disp'>Disponibile? </label>
                        <br/>
                        {this.props.product.disp ? <>
                            <input className={style.radioYes} type="radio" required id='si'
                                   onChange={this.handleChange} value={true} name="disp" checked/>Si
                            <input className={style.radioNo} type="radio" required id='no'
                                    onChange={this.handleChange} value={false} name="disp" />No </> :
                            <>
                                <input  className={style.radioYes}  type="radio" required id='si'
                                        onChange={this.handleChange} value={true} name="disp"/>Si
                                <input className={style.radioNo}  type="radio" required id='no'
                                        onChange={this.handleChange} value={false} name="disp" checked />No</>}

                    </div>
                    <div >
                        <input id="pulse" className={style.submit} type="submit" value="Aggiorna"  />
                    </div>
                </form>
            </>
        );
    }
}

