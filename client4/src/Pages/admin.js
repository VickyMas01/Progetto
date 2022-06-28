import React from 'react'
import Services from "../Services/services";
import Header from "../Components/Header";
import ProductList from "../Components/ProductList";
import Form from '../Components/Form'
import style from '../Styles/admin.module.css'



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
        this.handleHide1=this.handleHide1.bind(this)
        this.handleHide2=this.handleHide2.bind(this)
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
        if(prod.source.innerHTML==="aggiorna"){
            this.setState({
                showUpdate:true,
                formUpdate: <Form product={prod} hide={this.handleHide1} upd={true}/>
            });
          document.getElementById("change").style.width="60vw"
        }else{
            prod.source.parentNode.parentNode.remove()
            Services.deleteProduct(prod._id)
        }
        }

        handleHide1(){
        this.setState({
            showUpdate:false,

        })
        document.getElementById("change").style.width="100vw"
        }

    handleHide2(){
        this.setState({
            showCreate:false,

        })
        document.getElementById("change").style.width="100vw"
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
            formCreate:<Form product={prod} hide={this.handleHide2} upd={false}/>
        })
        document.getElementById("change").style.width="60vw"
        }






    render(){
        return(
           <div>
                {sessionStorage.length === 0 ? <></> :
                    <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                            isAdmin={JSON.parse(sessionStorage.getItem('utente')).isAdmin}
                            isChef={JSON.parse(sessionStorage.getItem('utente')).isChef}/>}
               <div id="change" className={style.main}><ProductList onChange={this.handleOther} admin={true}/></div>
                <button className={style.addProd} onClick={this.handleClick}>Aggiungi Prodotto</button>
                <div className={style.formProduct}>
                    {this.state.showUpdate && this.state.formUpdate}
                    {this.state.showCreate && this.state.formCreate}
                </div>
                    
           </div>    
           
        )
    }
}