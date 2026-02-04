'use client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function PayPalProvider({ children }) {
    // Get PayPal client ID from environment variable
    // For production, use: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    // For now, using sandbox mode - replace with your PayPal Client ID
    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    )
}


