function Error({errormessage}){
    return(
        <>
            <h1>{errormessage || "error"}</h1>
        </>
    )
}

export default Error