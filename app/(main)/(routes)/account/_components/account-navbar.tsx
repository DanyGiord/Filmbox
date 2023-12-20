import Image from 'next/image'

const AccountNavbar = () => {
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

export default AccountNavbar