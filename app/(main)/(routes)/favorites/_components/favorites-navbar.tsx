import Image from 'next/image'
import React from 'react'

const FavoritesNavbar = () => {
    return (
        <div className="w-full pt-5 flex justify-center">
            <Image
                src="/assets/logo.svg"
                alt="flexbox-logo"
                width={137}
                height={30}
            />
        </div>
    )
}

export default FavoritesNavbar