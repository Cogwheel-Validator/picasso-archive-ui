import './globals.css'
import 'next/font/google'
import Link from 'next/link'
import ResponsiveMenu from '../components/ResponsiveMenu'
import Image from 'next/image'
import { Metadata } from 'next';

const baseUrl: string = 'https://picasso-archive.cogwheel.zone';

export const metadata: Metadata = {
  title: {
    default: 'Picasso Archive',
    template: '%s | Picasso Archive',
  },
  description: `Search for your transactions on the Picasso chain prior to 
    the address prefix changes to the address.`,
  keywords: ['picasso', 'blockchain', 'archive', 'transaction', 'search'],
  publisher: 'Cogwheel Validator',
  referrer: 'origin-when-cross-origin',
  category: 'Web3.0',
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
    noarchive: true,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicons/apple-touch-icon.png',
    shortcut: '/favicons/favicon-16x16.png',
    other: [
      { rel: 'mask-icon', url: '/favicons/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Picasso Archive',
    description: `Search for your transactions on the Picasso chain prior to
      the address prefix changes to the address.`,
    images: [
      `${baseUrl}/Og-image.jpg`,
    ],
  },
  openGraph: {
    title: 'Picasso Archive',
    description: `Search for your transactions on the Picasso chain prior to
      the address prefix changes to the address.`,
    url: baseUrl,
    siteName: 'Picasso Archive',
    images: [
      {
        url: `${baseUrl}/Og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" data-theme="night">
      <head>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/favicons/mstile-150x150.png"/>
      </head>
      <body>
        <div className="min-h-screen bg-base-200 text-neutral-content">
          <header className="navbar bg-opacity-30 backdrop-blur-lg bg-secondary fixed top-0 z-10 w-full">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost normal-case text-xl">Picasso Archive</Link>
            </div>
            <div className="flex-none hidden md:block">
              <ul className="menu menu-horizontal px-1 font-semibold text-lg">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/search">Search</Link></li>
                <li><Link href="/about_the_app">About the App</Link></li>
              </ul>
            </div>
            <div className="md:hidden">
              <ResponsiveMenu />
            </div>
          </header>

          <main className="container mx-auto px-4 pt-16">
            {children}
          </main>

          <footer className="footer bg-base-300 text-base-content p-10">
            <aside>
              <h2 className="text-xl font-semibold">
                Developed by
              </h2>
              <Link href="https://cogwheel.zone" target="_blank" rel="noopener noreferrer" className= "btn btn-link ">
                <Image 
                src="/fullLogo.png"
                width={300}
                height={55}
                alt='Cogwheel Logo'
                />
              </Link>
            </aside>
            <nav>
              <h6 className="footer-title">App</h6>
              <Link href="/" className="link link-hover">Home</Link>
              <Link href="/search" className="link link-hover">Search</Link>
              <Link href="/about_the_app" className="link link-hover">About the App</Link>
            </nav>
            <nav>
              <h6 className="footer-title">Cogwheel</h6>
              <Link href="https://cogwheel.zone" target="_blank" rel="noopener noreferrer" className="link link-hover">Website</Link>
              <Link href="https://cogwheel.zone/contact-us" target="_blank" rel="noopener noreferrer" className="link link-hover">Contact Us</Link>
              <Link href="https://cogwheel.zone/about-us/" target="_blank" rel="noopener noreferrer" className="link link-hover">About Us</Link>
            </nav>
            <nav>
              <h6 className="footer-title">Legal</h6>
              <Link href="https://cogwheel.zone/terms-of-use/" target="_blank" rel="noopener noreferrer" className="link link-hover">Terms of Use</Link>
              <Link href="https://cogwheel.zone/privacy-policy-2/" target="_blank" rel="noopener noreferrer" className="link link-hover">Privacy Policy</Link>
            </nav> 
          </footer>
          <div className=' bg-base-300 text-center font-bold'>
              <p>
                Cogwheel Validator Copyright © 2024
              </p>
          </div> 
        </div>
      </body>
    </html>
  )
}