import React from "react"

const LandingPage: React.FC = () => {
  return (
    <section className="relative flex gap-4 items-center flex-col min-h-dvh text-white min-w-dvw h-screen bg-zinc-900 p-5">
      <div className="mx-0 flex items-center justify-between w-full">
        <a
          href="/"
          className="text-zinc-600 hover:text-white transition duration-200 ease-in-out"
        >
          urunan.app
        </a>
        <button
          type="button"
          className="bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full text-sm transition hover:bg-zinc-200 hover:cursor-not-allowed duration-200 ease-in-out"
        >
          Log-in
        </button>
      </div>
      <div className="flex items-center justify-center h-full w-full rounded-lg bg-zinc-800/50">
        <div className="flex gap-10 items-center flex-col m-0 w-full md:p-5 sm:p-3 p-2">
          <h1 className="lg:text-5xl  text-4xl font-semibold tracking-tighter text-white font-sans text-center text-balance lg:w-2/5 md:w-2/3 w-full">
            Cari teman urunan kini lebih mudah dan nyaman
          </h1>
          <p className="lg:text-xl xl:w-1/3 text-lg md:w-2/3 tracking-tight w-full text-center text-zinc-500">
            Urunan merupakan social marketplace untuk mencari teman urunan
            membership akun social media terkini
          </p>
          <a
            type="button"
            href="https://api.whatsapp.com/send/?phone=6285211595508&text=Halo+kak+aku+mau+order+urunan+sekarang&app_absent=0"
            target="_blank"
            className="bg-white cursor-pointer text-zinc-900 px-5 py-2 rounded-full text-sm transition hover:bg-zinc-300 duration-200 ease-in-out"
          >
            Order Sekarang
          </a>
        </div>
      </div>
    </section>
  )
}

export default LandingPage
