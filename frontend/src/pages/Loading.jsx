import React from "react"
import "../css/loading.css"

function Loading(){
    return(
        <div className="load-ctn">
            <div className="load-up">
                <h1 className="load">Loading...</h1>
                <p className="subLoad">Please wait a sec, while we load up your page</p>
            </div>
        </div>
    )
}

export default Loading