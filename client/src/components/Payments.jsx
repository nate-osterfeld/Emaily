import React from 'react'
import { useDispatch } from 'react-redux'
import { handleToken } from '../actions'
import StripeCheckout from 'react-stripe-checkout'

function Payments() {
    const dispatch = useDispatch()

    return (
        <StripeCheckout
            name="Emaily"
            description="$5 for 5 email credits"
            amount={500}
            token={(token) => dispatch(handleToken(token))}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        >
            <button className="btn">
                Add credits
            </button>
        </StripeCheckout>
    )
}

export default Payments
