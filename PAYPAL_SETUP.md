# PayPal Payment Gateway Integration Guide

## Setup Instructions

### 1. Install Dependencies

The PayPal SDK has been added to `package.json`. Run:

```bash
npm install
```

### 2. Get PayPal API Credentials

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Sign in with your PayPal account
3. Navigate to **Dashboard** → **My Apps & Credentials**
4. Create a new app or use an existing one
5. Copy your **Client ID** (for sandbox or live)

### 3. Configure Environment Variables

Add to your `.env` file:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id-here

# For Sandbox (Testing):
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=AeA1QIZXiflr1_-ctLJyHsgAsg9f6WyVZ47EI...

# For Production:
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=AeA1QIZXiflr1_-ctLJyHsgAsg9f6WyVZ47EI...
```

### 4. Update Database Schema

Run the migration to add PAYPAL to PaymentMethod enum:

```bash
npx prisma migrate dev --name add_paypal_payment_method
```

Or manually update the database:

```sql
ALTER TYPE "PaymentMethod" ADD VALUE 'PAYPAL';
```

### 5. Test PayPal Integration

1. **Sandbox Testing:**
   - Use PayPal sandbox accounts
   - Go to [PayPal Sandbox](https://www.sandbox.paypal.com/)
   - Use test buyer/seller accounts

2. **Test Flow:**
   - Add items to cart
   - Go to checkout
   - Select PayPal as payment method
   - Select an address
   - Click PayPal button
   - Login with sandbox account
   - Complete payment

### 6. Production Setup

When ready for production:

1. Switch to **Live** mode in PayPal Developer Dashboard
2. Update `NEXT_PUBLIC_PAYPAL_CLIENT_ID` with production Client ID
3. Test thoroughly before going live

## How It Works

### Flow:

1. **User selects PayPal** in OrderSummary component
2. **PayPal button appears** when address is selected
3. **Create Order:** When user clicks PayPal button:
   - Order is created in database (pending payment)
   - PayPal order is created via PayPal SDK
   - User is redirected to PayPal
4. **Approve Payment:** After user approves:
   - PayPal order is captured
   - Backend updates order as paid
   - User is redirected to orders page

### API Endpoints:

- **POST `/api/payments/paypal/create`** - Creates order in database and returns order details
- **POST `/api/payments/paypal/capture`** - Captures PayPal payment and updates order status

## Troubleshooting

### PayPal button not showing:
- Check if `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
- Verify user is logged in
- Ensure address is selected
- Check browser console for errors

### Payment fails:
- Verify PayPal credentials
- Check network tab for API errors
- Ensure order was created before capture
- Check backend logs

### Common Issues:
- **"PayPal SDK not loaded"**: Check if PayPalProvider is wrapping the app in `app/layout.jsx`
- **"Invalid client ID"**: Verify your Client ID is correct
- **"Order not found"**: Ensure order creation completed before payment capture

## Notes

- PayPal is currently configured for USD currency
- Update currency in `components/PayPalProvider.jsx` if needed
- Webhooks can be added for additional security (optional)
- Currently supports one-time payments only (not subscriptions)


