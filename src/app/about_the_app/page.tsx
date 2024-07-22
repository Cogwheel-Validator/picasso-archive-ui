import Image from 'next/image';


export default function Page() {
  return (
    <main className="w-full align-middle items-center justify-center">
      <section className="flex py-10 px-4">
        <div className="w-full rounded-lg bg-base-200 min-h-72 grid grid-cols-1 md:grid-cols-2
          items-center p-1 justify-items-center gap-5">
          <div className="px-6 flex-1 items-center justify-center text-left">
            <h1 className="text-5xl font-bold">About Picasso Archive</h1>
            <p className="py-6 text-pretty">
              Picasso archive is app that enables you to search for transactions on the Picasso
              network prior to address prefix change.
              You can use the app to find all transactions that had occurred when address prefix
              were banksy or centauri.<br/>
            </p>
          </div>
          <div className='flex-1 w-full flex justify-center'>
            <Image 
              src="/about-img-1.png" 
              alt="Cubes falling" 
              width={400} 
              height={600} 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full max-w-[300px] md:max-w-[400px] h-auto"
            />
          </div>
        </div>
      </section>

    <section className="py-10 px-4">
      <div className="flex-auto rounded-xl bg-base-100 ring-primary ring-2 shadow-md">
      <h2 className="pt-4 text-3xl font-bold text-center mb-8">Why is there a need for this app?</h2>
        <div className="min-h-72 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center
         align-middle p-4">
        <Image 
              src="/about-img-2.png" 
              alt="robot with the cubes" 
              width={700} 
              height={500} 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full max-w-[300px] md:max-w-[400px] h-auto"
            />
          <div className="py-6 px-2 text-left text-pretty space-y-6">
            <p>
              Picasso blockchain has achieved many great things. It connected Cosmos, Polkadot, Ethereum
              Solana ecosystems using IBC. During the development some changes were implemented
              and the chain had to rebrand multiple times and each time address changed.<br />
            </p>
            <p>
              Unfortunately there was no way to find all transactions that had occurred when address
              changed prefix in the chain. They were stored and executed on the chain but without heavy
              modification to the chain or creating some specialized explorer or app that would show this
              data there was no way to do query old data. So we create Picasso Archive a 
              <b>&quot;lite&quot; explorer</b>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-10 px-4">
      <div className="flex-auto rounded-xl bg-base-100 ring-primary ring-2 shadow-md">
          <h2 className="pt-4 text-3xl font-bold text-center mb-8">How does the app work?</h2>
          <div className="min-h-72 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center
         align-middle p-4">
            <div className="py-6 px-2 text-left space-y-6 text-pretty">
              <p>
                Picasso Archive is a lite explorer that shows only basic data tied to your
                address. For example your address, amount of tokens sent, block height, time, date etc.
                What this app won&apos;t show is all of the data from the transactions. So it will only
                show the essentials.<br/>
              </p>
              <p>
                What we did is we collected data from the start of the blockchain all up to the block height
                5079000 (from June 6th 2023 to May 8th 2024) and have all of the 
                transactions and essential data stored into a database. Hence the use of term lite 
                explorer.<br/>
                Any transaction you want to look into more details you will be redirected to the Ping.Pub
                where you can see more details about the transaction.
              </p>
            </div>
          <Image 
              src="/about-img-3.png" 
              alt="robot with the cubes" 
              width={300} 
              height={450} 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full max-w-[250px] md:max-w-[300px] h-auto"
            />
          </div>
        </div>
    </section>
    </main>
  )
}