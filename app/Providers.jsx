'use client'

import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Providers({ children }) {
    const paypalOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <StoreProvider>
                <Toaster />
                {children}
            </StoreProvider>
        </PayPalScriptProvider>
    );
}



