import React from 'react'
import Services from '../Services/services'
import Product from "./Product";
import style from '../Styles/product.module.css'


export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products:[],
        }


        this.handleShow=this.handleShow.bind(this);
    }

    componentDidMount() {
        this.handleShow()
    }

    handleShow(){
        Services.getProducts()
            .then(res=>res.json())
            .then(data =>data)
            .then(data => {
                    this.setState({
                        products:[ data.map(el =>
                             <Product  prod={el} onChange={this.props.onChange} admin={this.props.admin} showDisp={true}/>
                        )]
                    })
                })
            .catch(e => console.log(e))
    }


    render(){
        return(
            this.state.products.length > 0 ? (
            <div className={style.prodList}>
                {this.state.products}
                   </div>
            ) : <p>Non abbiamo prodotti</p>
        )
    }

}