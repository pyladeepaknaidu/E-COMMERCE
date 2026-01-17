import { NextResponse } from 'next/server'

// POST /api/auth/logout - Logout user
export async function POST(request) {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logout successful'
        })

        // Clear auth cookie
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0
        })

        return response
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Logout failed' },
            { status: 500 }
        )
    }
}
