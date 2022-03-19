import React from 'react'
import useProduct from '../hooks/useProduct'

export default function ProductDisplay() {
    const { product, error, submitItem } = useProduct()

    const items = product.data.line_items
    console.log(items)
    return ( 
        <>
        {items.length > 0 && items.map( (item) => 
            <section>
                <div className="product">
                    <img
                        src="https://i.imgur.com/EHyR2nP.png"
                        alt="The cover of Stubborn Attachments"
                    />
                <div className="description">
                    <h3>{item.item_name}</h3>
                    <h5>MYR {item.price}</h5>
                </div>
                </div>
                    <button onClick={() => submitItem({price: item.price_id, quantity: 1})}>
                        Checkout
                    </button>
                </section>
            )}
        </>
    )
}