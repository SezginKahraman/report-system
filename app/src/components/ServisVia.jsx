import React from 'react';
import {
    Search, Globe, Menu, User, Heart, ChevronRight
} from 'lucide-react';

const BoatCard = ({ image, location, type, capacity, rating, reviews, price }) => {
    return (
        <div className="rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="relative">
                <img src={image} alt={location} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11.6667 4.16667L16.6667 6.66667V15L11.6667 12.5V4.16667Z" />
                        <path d="M8.33333 4.16667L3.33333 6.66667V15L8.33333 12.5V4.16667Z" />
                    </svg>
                    Anında Rezerve
                </div>
                <button className="absolute top-3 right-3 text-white">
                    <Heart className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{location}</h3>
                    <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold">{rating}</span>
                        <span className="text-gray-500">({reviews})</span>
                    </div>
                </div>
                <div className="text-gray-600 mb-2">{type}</div>
                <div className="text-gray-600 mb-4">Kapasite: {capacity}</div>
                <div className="flex justify-between items-center">
                    <div className="font-bold text-lg">₺{price}</div>
                    <div className="text-gray-500">/saat</div>
                </div>
            </div>
        </div>
    );
};

const BoatRentalWebsite = () => {
    const boats = [
        {
            image: "/api/placeholder/400/300",
            location: "Ünkapanı, İstanbul",
            type: "Motoryat",
            capacity: "10 kişi",
            rating: "4.97",
            reviews: "74",
            price: "2.500,00"
        },
        {
            image: "/api/placeholder/400/300",
            location: "Ünkapanı, İstanbul",
            type: "Motoryat",
            capacity: "36 kişi",
            rating: "4.97",
            reviews: "36",
            price: "2.500,00"
        },
        {
            image: "/api/placeholder/400/300",
            location: "Arnavutköy, İstanbul",
            type: "Motoryat",
            capacity: "20 kişi",
            rating: "4.97",
            reviews: "9",
            price: "4.999,75"
        },
        {
            image: "/api/placeholder/400/300",
            location: "Arnavutköy, İstanbul",
            type: "Motoryat",
            capacity: "35 kişi",
            rating: "4.97",
            reviews: "26",
            price: "5.500,00"
        }
    ];

    const EventCard = ({ image, title, description }) => {
        return (
            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                <div className="relative h-64">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        );
    };

    const BoatRentalWebsite = () => {
        // Previous boat data remains the same
        const events = [
            {
                image: "/api/placeholder/400/300",
                title: "Yatta Evlilik Teklifi",
                description: "Boğazın ortasında ilanı aşk edin"
            },
            {
                image: "/api/placeholder/400/300",
                title: "Teknede Doğum Günü",
                description: "Yeni yaşınızı arkadaşlarınızla denizde kutlayın"
            },
            {
                image: "/api/placeholder/400/300",
                title: "Teknede Düğün",
                description: "Dünya evine harika bir teknede girin"
            },
            {
                image: "/api/placeholder/400/300",
                title: "Teknede Kurumsal Eğlence",
                description: "Çalışanlarınıza eğlence molası verin"
            }
        ];

        return (
            <div className="min-h-screen bg-white">
                {/* Previous sections remain the same */}

                {/* Event Categories Section */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Ne İçin Tekne Kiralamak İstiyorsun?</h2>
                            <p className="text-gray-600">Saatlik tekne kiralayarak yapabileceğiniz organizasyonlar</p>
                        </div>
                        <button className="flex items-center text-blue-600 hover:text-blue-700">
                            Tümünü Gör
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {events.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                </div>

                {/* Rest of the previous code remains the same */}
            </div>
        );
    };

    const Footer = () => {
        const socialLinks = [
            // { icon: <Facebook className="w-6 h-6" />, href: "#" },
            // { icon: <Instagram className="w-6 h-6" />, href: "#" },
            // { icon: <Linkedin className="w-6 h-6" />, href: "#" },
            // { icon: <Youtube className="w-6 h-6" />, href: "#" },
            // { icon: <TikTok className="w-6 h-6" />, href: "#" },
            // { icon: <Pinterest className="w-6 h-6" />, href: "#" },
            // { icon: <WhatsApp className="w-6 h-6" />, href: "#" },
        ];

        const footerSections = [
            {
                title: "Teknevia",
                links: [
                    "Hakkımızda",
                    "Basında Biz",
                    "Kampanyalar",
                    "Yardım Merkezi",
                    "Tekneni Ekle",
                    "Kullanım Şartları",
                    "İptal Şartları",
                    "KVKK - Aydınlatma",
                ]
            },
            {
                title: "Tekne Organizasyonları",
                links: [
                    "Teknede Doğum Günü",
                    "Yatta Evlilik Teklifi",
                    "Yatta Sevgililer Günü",
                    "Teknede Düğün",
                    "Teknede Bekarlığa Veda",
                    "Yatta Baby Shower",
                    "Teknede Yıl Dönümü",
                    "Teknede Nişan Kına",
                    "Teknede Mezuniyet",
                    "After Party",
                    "Teknede Özel Partiler",
                    "Teknede İş Yemeği",
                    "Teknede Lansman",
                    "Teknede Kurumsal Eğlence",
                    "Boğaz Turu",
                    "Adalar Turu",
                    "Balık Tutma Turları",
                    "Adalar Yüzme Turu",
                    "Karadeniz Yüzme Turu"
                ]
            },
            {
                title: "Popüler Tekne & Yat Kiralama Lokasyonları",
                links: [
                    "İstanbul Yat Kiralama",
                    "Bodrum Yat Kiralama",
                    "Göcek Tekne Kiralama",
                    "Fethiye Yat Kiralama"
                ]
            },
            {
                title: "Seçenekler",
                links: [
                    "Tekne Kiralama",
                    "Gulet Kiralama",
                    "Motoryat Kiralama"
                ]
            }
        ];

        return (
            <footer className="bg-gray-50 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    {/* Social Media Links */}
                    <div className="flex justify-center gap-6 mb-12">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {footerSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900 mb-4">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="text-center mb-8">
                        <a href="mailto:info@teknevia.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                            info@teknevia.com
                        </a>
                        <p className="text-gray-600 mt-2">+90 552 858 23 70</p>
                    </div>

                    {/* App Store Links */}
                    <div className="flex justify-center gap-4">
                        <a href="#" className="block w-32">
                            <img
                                src="/api/placeholder/120/40"
                                alt="Download on App Store"
                                className="w-full"
                            />
                        </a>
                        <a href="#" className="block w-32">
                            <img
                                src="/api/placeholder/120/40"
                                alt="Get it on Google Play"
                                className="w-full"
                            />
                        </a>
                    </div>

                    {/* Blog Button */}
                    <div className="text-center mt-8">
                        <a
                            href="#"
                            className="inline-block border border-teal-600 text-teal-600 px-6 py-2 rounded hover:bg-teal-600 hover:text-white transition-colors"
                        >
                            Blog
                        </a>
                    </div>
                </div>
            </footer>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-transparent absolute w-full z-10 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">TEKNEvia</div>
                    <div className="flex items-center gap-4">
                        <Globe className="text-white w-6 h-6" />
                        <div className="bg-blue-600 rounded-full p-2">
                            <Menu className="text-white w-6 h-6" />
                            <User className="text-white w-6 h-6" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-screen">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center bg-blue-900 bg-blend-overlay"></div>

                {/* Content */}
                <div className="service relative h-full flex flex-col items-center justify-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                        Tek tıkla tekne kirala!
                    </h1>

                    {/* Search Box */}
                    <div className="bg-white rounded-full p-2 flex items-center w-full max-w-3xl gap-2">
                        <input
                            type="text"
                            placeholder="Nereden Binmek İstiyorsun?"
                            className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="Tarih ekleyin"
                            className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="Misafir ekleyin"
                            className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-full"
                        />
                        <button className="bg-teal-500 p-3 rounded-full">
                            <Search className="text-white w-6 h-6" />
                        </button>
                    </div>

                    <p className="text-center mt-8 text-xl">
                        Teknevia: Türkiye'nin ilk anında rezervasyon yapabileceğiniz tekne kiralama platformu!
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-teal-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Anında Rezervasyon</h3>
                        <p className="text-gray-600">
                            Takvim özelliğinin kullanıldığı tekneleri anında kiralayabilirsin.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-teal-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">En Uygun Fiyat Garantisi</h3>
                        <p className="text-gray-600">
                            Teknevia'da fiyatları doğrudan tekne sahipleri belirler.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-teal-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Güvenli Rezervasyon</h3>
                        <p className="text-gray-600">
                            Ön ödeme turunuz tamamlanana kadar tekne sahibinin hesabına yatırılmaz.
                        </p>
                    </div>
                </div>
            </div>

            {/* Available Boats Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Anında Rezervasyon Yapabileceğiniz Tekneler</h2>
                        <p className="text-gray-600">Tekne sahibinden onay beklemeden rezervasyon yapabileceğiniz tekneler</p>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                        Tümünü Gör
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {boats.map((boat, index) => (
                        <BoatCard key={index} {...boat} />
                    ))}
                </div>
            </div>
            <BoatRentalWebsite>
            </BoatRentalWebsite>
            {/* Boat Owner Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tekne Sahibi misin?</h2>
                        <p className="text-gray-600 text-lg mb-6">
                            Ücretsiz bir şekilde Teknevia partneri ol ve 7/24 rezervasyon alabilme şansını yakala.
                        </p>
                        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                            Tekneni ekle
                        </button>
                    </div>

                    <div className="w-full md:w-1/3">
                        <svg viewBox="0 0 400 400" className="w-full h-auto">
                            {/* Circular background */}
                            <circle cx="200" cy="200" r="200" fill="#2C7A7B" />

                            {/* Captain's Hat */}
                            <g transform="translate(80, 100)">
                                {/* Hat Base */}
                                <path d="M240 120 C240 180 120 180 120 120 L120 80 L240 80 Z" fill="#FFFFFF" />

                                {/* Hat Band */}
                                <rect x="120" y="100" width="120" height="20" fill="#4A5568" />

                                {/* Logo Circle */}
                                <circle cx="180" cy="110" r="15" fill="#2C7A7B" />

                                {/* Trident Icon */}
                                <path d="M175 100 L185 100 L180 120 Z" fill="#FFFFFF" />

                                {/* Decorative leaves */}
                                <path d="M80 160 C120 140 160 140 200 160" stroke="#FFFFFF" fill="none" strokeWidth="2" />
                                <path d="M100 140 C140 120 180 120 220 140" stroke="#FFFFFF" fill="none" strokeWidth="2" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <Footer>

            </Footer>
        </div>

    );
};

export default BoatRentalWebsite;