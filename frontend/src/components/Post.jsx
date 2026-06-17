import "../css/post.css"
import DatePicker from 'react-datepicker'
import { Calendar, Search} from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'
import { useMemo, useState } from "react"

const MOCK_DATA = [
    { id: 1, name: "Dola", date: "2026-06-01", amount: "Rp 150.000" },
    { id: 2, name: "Dora", date: "2026-06-05", amount: "Rp 450.000" },
    { id: 3, name: "Dimsum", date: "2026-06-10", amount: "Rp 200.000" },
    { id: 4, name: "Dimas", date: "2026-06-15", amount: "Rp 800.000" },
    { id: 5, name: "Dadang", date: "2026-06-17", amount: "Rp 2.500.000" }
]

export default function Post() {
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange

    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return MOCK_DATA;
        const startStr = startDate?.toISOString().split('T')[0];
        const endStr = endDate?.toISOString().split('T')[0]

        return MOCK_DATA.filter((item) => {
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
                                <>
                                    <div key={item.id} className="posts">
                                        <div>
                                            <p>{item.name}</p>
                                            <p>{item.date}</p>
                                        </div>
                                        <span>{item.amount}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}