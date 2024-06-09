'use client'

import Image from "next/image";
import React, {useEffect, useState} from 'react'
import {getArtists} from "@/app/api/state";
import {ar} from "@faker-js/faker";
import {useGlobalContext} from "@/app/state-provider";

export default function Admin() {
    const { addCollectible} = useGlobalContext()
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('artist', artist)
        formData.append('euroPrice', euroPrice)
        formData.append('xrpPrice', xrpPrice)
        formData.append('artistProfitMargin', artistProfitMargin)
        formData.append('artwork', artwork)
        formData.append('biometrics', biometrics)
    const resp = await fetch('/admin/api', {
      method: 'POST',
      body: formData,
    })

        const item = await resp.json()
        addCollectible(item)

    }



    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [euroPrice, setEuroPrice] = useState("")
    const [xrpPrice, setXRPPrice] = useState("")
    const [artistProfitMargin, setArtistProfitMargin] = useState(0)
    const [artwork, setArtwork] = useState(null)
    const [biometrics, setBiometrics] = useState(null)

    const [artists, setArtists] = useState({});

    const handleArtistChange = (event) => {
        setArtist(event.target.value)
    };

    useEffect(() => {
        setArtists(getArtists())
    }, []);


    const handleArtworkUpload = (e) => {
        setArtwork(e.target.files[0]);
  }

    const handleBiometricsUpload = (e) => {
        setBiometrics(e.target.files[0]);
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="arwork-upload">Upload artwork file</label>
                    <input onChange={e => handleArtworkUpload(e)}
                           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                           id="arwork-upload" type="file"/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="biometrics-upload">Upload artist biometrics</label>
                    <input onChange={e => handleBiometricsUpload(e)}
                           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                           id="biometrics-upload" type="file"/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="name-input">Name</label>
                    <input onChange={e => setName(e.target.value)} value={name}
                           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                           id="name-input"/>
                    <br/>
                    <br/>
                    <h3 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-2xl dark:text-white">Artist
                        Info</h3>

                      <select
        id="artist-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
        onChange={handleArtistChange}
        defaultValue=""
      >
        <option value="" disabled>
          -- Select an Artist --
        </option>
        {Object.entries(artists).map(([slug, artist]) => (
          <option key={slug} value={slug}>
            {artist.name}
          </option>
        ))}
      </select>

                    <label htmlFor="euro-price-input"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Euro Price</label>
                    <input type="number" id="euro-price-input" aria-describedby="helper-text-explanation"
                           onChange={e => setEuroPrice(e.target.value)} value={euroPrice}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="10€" required/>

                    <label htmlFor="xrp-price-input"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">XRP Price</label>
                    <input type="number" id="xrp-price-input" aria-describedby="helper-text-explanation"
                           onChange={e => setXRPPrice(e.target.value)} value={xrpPrice}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="10 XRP" required/>

                    <label htmlFor="artist-profit-margin-input"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Artist profit margin
                        (up to 25%)</label>
                    <input type="number" id="artist-profit-margin-input" aria-describedby="helper-text-explanation"
                           onChange={e => setArtistProfitMargin(e.target.value)} value={artistProfitMargin}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="10%" max='25' required/>

                    <br/>
                    <p>10.2% of price goes to the platform</p>

                    <br/>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        List
                    </button>
                </form>

            </div>
    </main>
  );
}
