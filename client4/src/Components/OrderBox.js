import React from 'react';

export default class OrderBox extends React.Component {

    render() {
        return (
            <div>
                {this.props.order.length === 0 ? <div>Ancora nessun ordine effettuato</div> :
                    <div>
                        <h1>Ordine di {this.props.user}</h1>
                        <p>Prodotti ordinati : {this.props.order.products.map(e =>e.title).join(', ')}</p>
                        <p>Stato dell'ordine: {this.props.order.taken}</p>
                        {this.props.order.taken === 'pending' && <p>Attendi che il cuoco accetti o rifiuti l'ordine</p>}
                        {this.props.order.taken === 'Accepted' && <p>A breve il suo ordine le verrà consegnato e potrà continuare ad ordinare</p>}
                        {this.props.order.taken === 'Rejected' && <p>Per qualche motivo il suo ordine non è stato accettato</p>}
                        <p>Prezzo totale: {this.props.order.total}</p>
                    </div>}
            </div>
        )
    }
}