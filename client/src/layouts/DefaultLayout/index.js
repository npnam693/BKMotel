import Header from "../components/Header";
import Footer from "../components/Footer";
function DefaultLayout({children}) {
    return ( 
        <div className="App">
            <Header />
            <Footer />
            {children}
        </div> 
    );
}

export default DefaultLayout;