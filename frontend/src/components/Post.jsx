import "../css/post.css"
import DatePicker from 'react-datepicker'
import { Calendar, Search, User} from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useEffect } from "react"
import Posts from "./posts"
import { posts_data } from "../mocks/userdata"
import Loading from "../pages/Loading"
import Error from "../pages/Error"
import { useOutletContext, useParams } from "react-router-dom"


export default function Post() {
    const { UserID } = useParams("userId")
    const { user } = useOutletContext()
    
    const [filteredData, setFilteredData] = useState([])
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(()=>{
        ;(async ()=>{
            setError("")
            try{
                const params = new URLSearchParams();
                const start = startDate ?? new Date();
                const end = endDate ?? new Date(Date.now() + 6 * 86400000);  

                if (start) params.append('start_date', start.toISOString().split("T")[0]);
                if (end) params.append('end_date', end.toISOString().split("T")[0]);

                const url = `/api/users/post/${user.id}?${params}`

                const response = await fetch(url)
                
                if(!response.ok){
                    throw new Error("posts not found")
                }
                
                const dataJSON = await response.json()

                setFilteredData(dataJSON.posts ?? [])
                
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }

        })()
    }, [dateRange])

    if(loading) return <Loading />
    if (error) return <Error errormessage={error.message} />
    console.log(filteredData)
    return (
        <>
            <nav className="userprofilenav">
                <div className="datesearch">
                    <h2>
                        <Calendar />
                    </h2>
                    <div>
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => setDateRange(update)}
                            isClearable={true}
                            placeholderText="Set date range"
                            Search
                            dateFormat="dd/MM/yyyy"
                            onChangeRaw={(e) => e.preventDefault()}
                        />
                    </div>
                </div>
            </nav>
            <div className="post">
                <h1>Posts</h1>
                <div>
                    <div>
                        <h3 className="postresults">Results</h3>
                        {startDate && endDate && (
                            <span className="filtered">Filetered</span>
                        )}
                    </div>
                    <div>
                        {filteredData.length === 0 ? (
                            <p className="notfoundpost">There's no data in this range</p>
                        ) : (
                        <div>
                            {filteredData.map((item) => (
                                <Posts id={item.id} username={item.username} title={item.title} content={item.content} date={item.created_at} />
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}