'use client'
import { useState } from "react";
import Phichungcu from "./chungcu/phichungcu";
import Phiquyengop from "./quyengop/phiquyengop";
import { Provider } from "react-redux";
function Page({ }) {

    const [page, setPage] = useState("chungcu")
    return (

        <div>
            <div className="flex items-center">
                <div className="text-2xl font-bold p-5">Cổng dịch vụ công</div>
                <div className="text-xl font-bold p-5">
                    <select onChange={(e) => setPage(e.target.value)} value={page} className="border-2 border-black rounded-xl p-2">
                        <option value="chungcu">
                            Quản lí Phí chung cư
                        </option>
                        <option value="quyengop">
                            Quản lí Quỹ quyên góp
                        </option>

                    </select>
                </div>
            </div>
            {
                page == "chungcu" ?
                    <div className="p-3">
                        <Phichungcu />
                    </div>
                    :
                    <div className="p-3">
                        <Phiquyengop />
                    </div>
            }
        </div>
    );
}

export default Page;