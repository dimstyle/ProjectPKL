import "../css/post.css"
import DatePicker from 'react-datepicker'
import { Calendar, Search} from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'
import { useMemo, useState, useEffect } from "react"
import { useAuthStore } from "../stores/authStore"
import Posts from "./posts"
import { posts_data } from "../mocks/userdata"


export default function Post() {
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange
    const accessToken = useAuthStore(state => state.accessToken)

    useEffect(()=>{
        (async ()=>{
            try{
                const response = await fetch("/api/user/post",{
                    headers: accessToken
                })
                
                if(!response.ok){
                    throw new Error("posts not found")
                }

                

            }catch(err){

            }

        })()
    })

    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return posts_data;
        const startStr = startDate?.toISOString().split('T')[0];
        const endStr = endDate?.toISOString().split('T')[0]

        return posts_data.filter((item) => {
            return item.date >= startStr && item.date <= endStr;
        })
    }, [startDate, endDate])

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
                                <Posts id={item.id} name={item.name} date={item.date} />
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}