import SearchInput from "@/components/SearchInput"
import Providers from "@/components/Provider"
import Preloader from "@/components/Preloader"

import { store } from '@/store'
import { setStartupPokemon } from "@/store/searchSlice"

export default async function Home() {
  const  req = await fetch('http://localhost:3000/api/search')
  const data = await req.json()

  store.dispatch(setStartupPokemon(data))
  
  return (
    <main>
      {/* Move data from server to client */}
      <Preloader pokemons={data} />
      
      <Providers> {/* Which store to look into? */}
        <SearchInput />
      </Providers>
    </main>
  )
}