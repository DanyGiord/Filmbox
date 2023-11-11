import { UserButton } from "@clerk/nextjs";

const HomeNavbar = () => {
    return (
        <div className="flex justify-end p-5">
          <UserButton afterSignOutUrl="/sign-in" appearance={{
            elements: {
                avatarBox: "rounded-full border border-2 border-red"
            }
          }} />
        </div>
    );
}
 
export default HomeNavbar;