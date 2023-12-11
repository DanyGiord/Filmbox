import Discover from "./_components/discover";
import DiscoverContextProvider from "./_context/discover-context-provider";

const DiscoverPage = () => {
    return (
        <DiscoverContextProvider>
            <Discover />
        </DiscoverContextProvider>
    );
}
 
export default DiscoverPage;