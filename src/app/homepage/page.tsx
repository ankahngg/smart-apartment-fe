import Header from "./header"
import Menu from "./menu"
import Main from "./main"
import Footer from "./footer"
import ThongBao from "./thongbao"
export default function HomePage() {
    return (
        <>
            <title>HomePage</title>
            <div>
                <Header />  
                <Menu />
                <Main />
                <ThongBao />
                <Footer />
            </div>
        </>
    )
}