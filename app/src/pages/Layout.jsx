import React from 'react';
import { Menu } from 'lucide-react';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-[#003507] text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between max-w-7xl items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#F6BE00]">LOGO</span>
                    </div>

                    {/* Project Name - Desktop */}
                    <div className="hidden md:block text-xl font-semibold">
                        Reports Dashboard
                    </div>

                    {/* Login Button - Desktop */}
                    <div className="hidden md:block">
                        <button className="bg-[#aa8a20] hover:bg-[#E66E24] text-[#003507] font-bold py-2 px-4 rounded transition-colors duration-300">
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4 p-4">
                        <div className="text-center text-xl font-semibold mb-4">
                            EntraID Dashboard
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-[#F6BE00] hover:bg-[#E66E24] text-[#003507] font-bold py-2 px-4 rounded w-full transition-colors duration-300">
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#003507] text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-sm">
                            © {new Date().getFullYear()} EntraID Dashboard. All rights are preserved.
                        </p>
                        <p className="text-xs mt-2 text-[#D0D0CD]">
                            EntraID Dashboard, Best Microsoft EntraID management system.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;