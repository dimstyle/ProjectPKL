function Error({errormessage}){
    return(
        <div className="er-ctn">
            <h1 className="er">{errormessage || "error"}</h1>
        </div>
    )
}

export default Error