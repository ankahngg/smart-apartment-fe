import Header from "./header"
import Menu from "./menu"
import Main from "./main"
export default function HomePage() {
    return (
        <>
            <title>HomePage</title>
            <div>
                <Header />  
                <Menu />
                <Main />
            </div>
        </>
    )
}