import React from 'react'
import Services from '../Services/services'
import Order from '../Components/Order'
import style from '../Styles/orderlist.module.css'



let counter=0;

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders1: [],
            orders2: [],
            hideComplete:true
        }


        this.handleShow = this.handleShow.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.handleShow()
    }

    handleShow() {
        Services.getOrders()
            .then(data => {
                    let p1 = [];
                    let or1=[];
                    let or2 =[];
                    let p2 = [];
                    data.forEach( (el,i) =>{
                        // for(let i=0; i<data.length ; i++) {
                        if (el.taken === 'pending') {
                          //  o1.push(el)
                            p1.push(el.products.map(e => e.title))
                            console.log(p1)
                            or1.push(<Order user={el.user} products={p1[i]} status={el.taken}
                                            price={el.total} id={el._id}
                                            onChange1={this.props.onChange1} onChange2={this.props.onChange2}
                                            acceptor={true}/>)
                            this.setState({
                                orders1: or1
                            })
                        } else {
                           // o2.push(data[i]);
                            p2.push(el.products.map(e => e.title))
                            console.log(p2)
                            or2.push( <Order user={el.user} products={p2[i]} status={el.taken} price={el.total}
                                             id={el._id} onChange3={this.props.onChange3} acceptor={false}/>)
                            this.setState({
                                    orders2:or2
                    })}
                    })
                }
            )
            .catch(e => console.log(e))
    }


    handleClick() {
        counter++
        const op = counter % 2;
        if (op === 1) {
            this.setState({hideComplete: false});
             
        } else {
            this.setState({hideComplete: true});
            
        }

        if(this.state.hideComplete){
            document.getElementById("changeChef").style="width:60vw";
         }else{document.getElementById("changeChef").style="width:100vw";}   
        

    }


    render() {
        return (
            <>
            <button className={style.orders} onClick={this.handleClick}>Ordini da completare/eliminare</button>
            <div className={style.newOrd}>
                {this.state.orders1.length > 0 ?
                this.state.orders1 :
                <p className={style.newOrd2}>Nessun ordine nuovo</p>}
             </div>

             <div className={style.sideOrd}>  
                {this.state.hideComplete ? <></> :
                 this.state.orders2.length > 0 ?
                    this.state.orders2 :
                    <p className={style.noOrd}>Nessun ordine da confermare</p>}
            </div>

            </>

        )
    }

    
}



