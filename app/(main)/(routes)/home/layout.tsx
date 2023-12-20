import HomeNavbar from "./_components/home-navbar";


const HomeLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div>
            <HomeNavbar />
            {children}
        </div>
    );
}
 
export default HomeLayout;