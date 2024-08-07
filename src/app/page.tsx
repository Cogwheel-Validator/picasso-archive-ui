'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const steps = [
    {
      text: "Type in your pica address into the search bar and press the search button.",
      image: "/home-img-1.png",
      alt: "Search bar illustration"
    },
    {
      text: "You will then get a list of all transactions that had occurred when address prefix were banksy or centauri.",
      image: "/home-img-2.png",
      alt: "Transaction list illustration"
    },
    {
      text: "Press on the Ping.Pub button to get more information about the transaction.",
      image: "/home-img-3.png",
      alt: "Explorer ping.pub button"
    }
  ]
  return (
    <>
    <section className="w-full">
      <div 
        className="hero min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url(./background_1920x1080.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Picasso Archive</h1>
            <p className="mb-5">
              Picasso archive app is here to enable all of the Picasso users to look into their
              transactions prior to address prefix change.
            </p>
            <Link href="/search" className="btn btn-primary border-secondary">
              Search for transactions
            </Link>
          </div>
        </div>
      </div>
    </section>

      <section className="py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How to use this App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`card bg-base-100 shadow-xl opacity-0 ${isVisible ? 'animate-slideIn' : ''}`} 
              style={{animationDelay: `${index * 200}ms`}}
            >
              <figure className="px-10 pt-10">
                <Image 
                  src={step.image} 
                  alt={step.alt} 
                  width={400} 
                  height={200} 
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}