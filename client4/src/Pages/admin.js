import React from 'react'
import Services from "../Services/services";
import Header from "../Components/Header";
import ProductList from "../Components/ProductList";
import Form from '../Components/Form'



const user=sessionStorage.getItem('utente');

export default class Admin extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            formUpdate:'',
            formCreate:'',
            showUpdate:false,
            showCreate:false
        }

        this.handleCheck=this.handleCheck.bind(this)
        this.handleOther=this.handleOther.bind(this)
        this.handleHide=this.handleHide.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }


    componentDidMount() {
        return this.handleCheck();
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


     handleOther(prod) {
        if(prod.source.innerHTML==='Aggiorna'){
            this.setState({
                showUpdate:true,
                formUpdate: <Form product={prod} hide={this.handleHide} upd={true}/>
            })
        }else{
            prod.source.parentNode.parentNode.remove()
            Services.deleteProduct(prod._id)
        }
        }

        handleHide(){
        this.setState({
            showUpdate:false,
            showCreate:false
        })
        }


        handleClick(){
        const prod={
            title:'',
            ingredients:'',
            desc:'',
            photo:'',
            price:'',
            disp:'',
        }
        this.setState({
            showCreate:true,
            formCreate:<Form product={prod} hide={this.handleHide} upd={false}/>
        })

        }






    render(){
        return(
            <div>
                {sessionStorage.length === 0 ? <></> :
                    <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                            isAdmin={JSON.parse(sessionStorage.getItem('utente')).isAdmin}
                            isChef={JSON.parse(sessionStorage.getItem('utente')).isChef}/>}
                <ProductList onChange={this.handleOther} admin={true}/>
                <button onClick={this.handleClick}>Aggiungi Prodotto</button>
                <aside>
                    {this.state.showUpdate && this.state.formUpdate}
                    {this.state.showCreate && this.state.formCreate}
                </aside>
            </div>
        )
    }
}