'use client'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function PayPalButton({ 
    amount, 
    items, 
    userId, 
    storeId, 
    addressId, 
    coupon,
    onSuccess 
}) {
    const router = useRouter()
    const [{ isPending }] = usePayPalScriptReducer()
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const createOrder = async (data, actions) => {
        try {
            // Create order in your backend first
            const response = await fetch('/api/payments/paypal/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    total: amount,
                    userId,
                    storeId,
                    addressId,
                    coupon
                }),
            })

            const result = await response.json()

            if (!result.success) {
                toast.error(result.error || 'Failed to create order')
                throw new Error(result.error)
            }

            // Store orderId for later use in onApprove
            setOrderId(result.data.orderId)

            // Create PayPal order
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amount.toFixed(2),
                        currency_code: 'USD'
                    },
                    description: `Order from FLASH ⚡ MAN - ${items.length} item(s)`
                }]
            })
        } catch (error) {
            console.error('Create order error:', error)
            toast.error('Failed to create PayPal order')
            throw error
        }
    }

    const onApprove = async (data, actions) => {
        try {
            setLoading(true)
            
            // Capture the PayPal order
            const details = await actions.order.capture()

            if (!orderId) {
                toast.error('Order ID not found. Please try again.')
                return
            }

            // Capture payment in your backend
            const captureResponse = await fetch('/api/payments/paypal/capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    paypalOrderId: details.id,
                    payerId: details.payer?.payer_id
                }),
            })

            const captureResult = await captureResponse.json()

            if (captureResult.success) {
                toast.success('Payment successful!')
                if (onSuccess) {
                    onSuccess(captureResult.data.order)
                }
                router.push('/orders')
                router.refresh()
            } else {
                toast.error(captureResult.error || 'Payment failed')
            }
        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Payment processing failed')
        } finally {
            setLoading(false)
        }
    }

    const onError = (err) => {
        console.error('PayPal error:', err)
        toast.error('Payment was cancelled or failed')
    }

    if (isPending || loading) {
        return (
            <div className="w-full bg-slate-100 rounded-lg p-4 text-center text-slate-600">
                Loading PayPal...
            </div>
        )
    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal"
            }}
        />
    )
}

