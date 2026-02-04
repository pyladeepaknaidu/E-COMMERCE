import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/payments/paypal/create - Create PayPal order
export async function POST(request) {
    try {
        const body = await request.json()
        const { items, total, userId, storeId, addressId, coupon } = body

        // Validation
        if (!items || !total || !userId || !storeId || !addressId) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create order in database first (pending payment)
        const order = await prisma.order.create({
            data: {
                total: parseFloat(total),
                userId,
                storeId,
                addressId,
                paymentMethod: 'PAYPAL',
                isPaid: false,
                status: 'ORDER_PLACED',
                isCouponUsed: coupon ? true : false,
                coupon: coupon || {},
                orderItems: {
                    create: items.map(item => ({
                        productId: item.productId || item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        })

        // For PayPal, we'll use PayPal Orders API
        // You'll need to set up PayPal SDK on the frontend
        // This endpoint returns order details for PayPal button

        return NextResponse.json({
            success: true,
            data: {
                orderId: order.id,
                total: order.total,
                order
            }
        })
    } catch (error) {
        console.error('PayPal create order error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create PayPal order' },
            { status: 500 }
        )
    }
}


