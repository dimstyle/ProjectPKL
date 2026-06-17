import React from "react"
import "../css/er.css"

function Error({errormessage}){
    return(
        <div className="er-ctn">
            <h1 className="er">{errormessage || "Error..."}</h1>
        </div>
    )
}

export default Error