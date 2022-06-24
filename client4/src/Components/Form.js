import React from 'react';
import Services from "../Services/services";



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
        }else{Services.createProduct(this.state)}
    }





    render() {
        return (
            <>
                <button onClick={this.handleClick}>X</button>
                <form onSubmit={this.handleSubmit}>
                    <div >
                        <label htmlFor='title'>Nome prodotto: </label>
                        <br/>
                        <input  placeholder="Nome prodotto" type="text" required
                                onChange={this.handleChange} value={this.state.title} name="title"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='ingredients'> Ingredienti: </label>
                        <br/>
                        <input  placeholder="Ingredienti" type="text" required
                                onChange={this.handleChange} value={this.state.ingredients} name="ingredients"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='description'>Descrizione: </label>
                        <br/>
                        <input placeholder="Descrizione" type="text" required
                               onChange={this.handleChange} value={this.state.desc} name="desc"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='photo'>Url foto: </label>
                        <br/>
                        <input placeholder="Foto" type="text"
                               onChange={this.handleChange} value={this.state.photo} name="photo"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='price'>Prezzo: </label>
                        <br/>
                        <input placeholder="Prezzo" type="number" required
                               onChange={this.handleChange} value={this.state.price} name="price"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='disp'>Disponibile? </label>
                        <br/>
                        {this.props.product.disp ? <>
                            <input  type="radio" required id='si'
                                   onChange={this.handleChange} value={true} name="disp" checked/>
                            <input  type="radio" required id='no'
                                    onChange={this.handleChange} value={false} name="disp" /> </> :
                            <>
                                <input  type="radio" required id='si'
                                        onChange={this.handleChange} value={true} name="disp"/>
                                <input  type="radio" required id='no'
                                        onChange={this.handleChange} value={false} name="disp" checked /> </>}

                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </>
        );
    }
}

