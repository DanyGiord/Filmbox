import HomeNavbar from "./_components/home-navbar";


const HomeLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className="bg-black_main">
            <HomeNavbar />
            {children}
        </div>
    );
}
 
export default HomeLayout;