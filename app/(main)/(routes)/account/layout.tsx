import AccountNavbar from "./_components/account-navbar";
import AccountContextProvider from "./_context/account-context-provider";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AccountContextProvider>
            <div className="h-screen">
                <AccountNavbar />
                {children}
            </div>
        </AccountContextProvider>
    );
}

export default AccountLayout;