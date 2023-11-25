"use client"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/Payment/CheckoutForm'

function Payment() {
   
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
    );
    const options:any ={
        mode: 'payment',
        amount: 50,
        currency: 'eur'
    }

  return (
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm/>
    </Elements>
  )
}

export default Payment


