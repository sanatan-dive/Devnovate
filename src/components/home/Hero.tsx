import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  {/* Hero Section */}
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Next Generation of Innovation
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Devnovate connects developers, designers, and innovators through exciting hackathons that inspire creativity and foster groundbreaking solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/hackathons">
              <Button variant="primary" className="bg-white text-blue-700 hover:bg-blue-50">
                Browse Hackathons
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero