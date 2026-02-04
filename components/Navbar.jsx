'use client'
import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const [user, setUser] = useState(null)
    const cartCount = useSelector(state => state.cart.total)

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            setUser(null)
            toast.success('Logged out successfully')
            router.push('/')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
            toast.error('Logout failed')
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-slate-900">FLASH</span> <span className="text-red-600">⚡</span> <span className="text-slate-900">MAN</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <User size={18} />
                                    <span className="text-sm">{user.name}</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-slate-600 hover:bg-slate-700 transition text-white rounded-full flex items-center gap-2 text-sm"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                                Login
                            </Link>
                        )}

                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">
                        {user ? (
                            <button 
                                onClick={handleLogout}
                                className="px-6 py-1.5 bg-slate-600 hover:bg-slate-700 text-sm transition text-white rounded-full flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar