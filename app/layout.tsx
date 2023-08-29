"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/Navbar'
import AuthProvider from "../providers/authProvider.tsx"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
        <html lang="en">
        <body>
        
            <Navbar/>
            {children}
        
         </body>
    </html>

    </AuthProvider>
    
    
  )
}
