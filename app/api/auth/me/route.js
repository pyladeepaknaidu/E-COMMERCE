import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// GET /api/auth/me - Get current user
export async function GET(request) {
    try {
        // Get token from cookie
        const token = request.cookies.get('auth-token')?.value

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            )
        }

        // Verify token
        let decoded
        try {
            decoded = jwt.verify(token, JWT_SECRET)
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'Invalid or expired token' },
                { status: 401 }
            )
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                cart: true,
                createdAt: true
            }
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: { user }
        })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to get user' },
            { status: 500 }
        )
    }
}
