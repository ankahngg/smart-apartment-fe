'use client'

import Setting from "./setting";

function Page() {
    return (
        <div>
            <div className="flex items-center">
                <div className="text-2xl font-bold p-5">Cài đặt</div>
            </div>
            <div>
                <Setting />    
            </div>
            
        </div>
    );
}

export default Page;