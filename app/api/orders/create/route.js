import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/orders/create - Create order (for COD and other non-PayPal payments)
export async function POST(request) {
    try {
        const body = await request.json()
        const { items, total, userId, storeId, addressId, paymentMethod, coupon } = body

        // Validation
        if (!items || !total || !userId || !storeId || !addressId || !paymentMethod) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create order in database
        const order = await prisma.order.create({
            data: {
                total: parseFloat(total),
                userId,
                storeId,
                addressId,
                paymentMethod,
                isPaid: paymentMethod === 'COD' ? false : true, // COD is not paid upfront
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
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                address: true
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Order created successfully',
            data: {
                order
            }
        }, { status: 201 })
    } catch (error) {
        console.error('Create order error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create order' },
            { status: 500 }
        )
    }
}


