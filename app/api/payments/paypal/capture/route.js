import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/payments/paypal/capture - Capture PayPal payment after approval
export async function POST(request) {
    try {
        const body = await request.json()
        const { orderId, paypalOrderId, payerId } = body

        if (!orderId || !paypalOrderId) {
            return NextResponse.json(
                { success: false, error: 'Missing order information' },
                { status: 400 }
            )
        }

        // Find the order
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        })

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            )
        }

        // Update order as paid
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                status: 'PROCESSING',
                // Store PayPal transaction ID in coupon field as JSON for reference
                coupon: {
                    ...(typeof order.coupon === 'object' ? order.coupon : {}),
                    paypalOrderId,
                    payerId,
                    paymentDate: new Date().toISOString()
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Payment captured successfully',
            data: {
                order: updatedOrder
            }
        })
    } catch (error) {
        console.error('PayPal capture error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to capture payment' },
            { status: 500 }
        )
    }
}


