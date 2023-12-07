'use client';

import { useRouter } from "next/navigation";

const MainComponent = () => {
    const router = useRouter();

    return router.push("/home")
}

export default MainComponent;