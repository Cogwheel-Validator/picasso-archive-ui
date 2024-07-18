export default function Page() {
  return (
    <main className="bg-gradient-to-br from-purple-700 via-blue-800 to-teal-500 relative flex min-h-screen flex-col w-full">
    <section className="py-10 px-4">
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-md rounded-lg shadow-2xl" />
        <div className="text-center" >
          <h1 className="text-5xl font-bold">About Picasso Archive</h1>
          <p className="py-6">
            Picasso archive is  app that enables you to search for transactions on the Picasso 
            network prior to address prefix change.<br/>
            You can use the app to find all transactions that had occurred when address prefix
            were banksy or centauri.<br/>
          </p>
        </div>
      </div>
    </div>
    </section>

    <section className="py-10 px-4">
      <div className="grid-rows-1 grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Why is there a need for this app?</h2>
          <p className="py-6 text-center">
            Picasso blockchain has achieved many great things. It connected Cosmos, Polkadot, Ethereum
            Solana ecosystems using IBC. During the development some changes were implemented
            and the chain had to rebrand multiple times and each time address prefix changed.<br/>
            Unfortunately there was no way to find all transactions that had occurred when address
            changed prefix in the chain. They were stored and executed on the chain but without heavy
            modification to the chain or creating some specialized explorer or app that would show this
            data there was no way to do query old data. So we create Picasso Archive a "lite" explorer.
          </p>
        </div>
      </div>
    </section>

    <section className="py-10 px-4">
      <div className="grid-rows-1 grid-cols-1 md:grid-cols-2">
        <div>
          <div>
            *Image
          </div>
          <h2 className="text-3xl font-bold text-center mb-8">How does the app work?</h2>
          <p className="py-6 text-center">
            Picasso Archive is a lite explorer that shows only certain type of data tied to your
            address. For example your address, amount of tokens sent, block height, time, date etc.<br/>
            What this app won't show is all of the data from the transactions. So it will only
            show the essentials.<br/>
            What we did is we collected data from the start of the blockchain all up to the block height
            5079000 (when address prefix were changed from centauri to pica) and have all of the 
            transactions and essential data stored into a database. Hence the use of term "lite" 
            explorer.<br/>
            Any transaction you want to look into more details you will be redirected to the Ping.Pub
            where you can see more details about the transaction.
          </p>
        </div>
      </div>
    </section>
    </main>
  )
}