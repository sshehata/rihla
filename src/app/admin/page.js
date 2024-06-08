'use client'

import Image from "next/image";
import React, { useState } from 'react'


export default function Admin() {
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('price', price)
        formData.append('artistProfitMargin', artistProfitMargin)
        formData.append('artwork', artwork)
    const response = await fetch('/admin/api', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    }


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [price, setPrice] = useState("")
    const [artistProfitMargin, setArtistProfitMargin] = useState(0)
    const [artwork, setArtwork] = useState(null)

    const handleArtworkUpload = (e) => {
        setArtwork(e.target.files[0]);
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
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="biometrics-upload" type="file"/>
                    <br/>
                    <br/>
                    <h3 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-2xl dark:text-white">Artist
                        Info</h3>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="first-name-input">First name</label>
                    <input onChange={e => setFirstName(e.target.value)} value={firstName}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="first-name-input"/>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="last-name-input">Last name</label>
                    <input value={lastName} onChange={e => setLastName(e.target.value)}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="last-name-input"/>

                    <label htmlFor="price-input"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" id="price-input" aria-describedby="helper-text-explanation"  onChange={e => setPrice(e.target.value)} value={price}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="10€" required/>

                    <label htmlFor="artist-profit-margin-input"
                           className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Artist profit margin
                        (up to 25%)</label>
                    <input type="number" id="artist-profit-margin-input" aria-describedby="helper-text-explanation" onChange={e => setArtistProfitMargin(e.target.value)} value={artistProfitMargin}
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
