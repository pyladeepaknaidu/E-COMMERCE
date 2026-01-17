import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// POST /api/auth/register - Register a new user
export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                image: '',
                cart: {}
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true
            }
        })

        return NextResponse.json(
            { 
                success: true, 
                message: 'User registered successfully',
                data: user 
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Registration failed' },
            { status: 500 }
        )
    }
}
