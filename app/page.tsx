import { UserButton } from "@clerk/nextjs";

const Page = () => {
    return (
        <UserButton afterSignOutUrl="/sign-in"/>
    );
}
 
export default Page;