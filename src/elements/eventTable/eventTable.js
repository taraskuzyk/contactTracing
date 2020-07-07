import React from 'react'
import { msDurationToString, timestampToDateString } from "../../utils/helpers";

export default function EventTable({events}){
    if (events === undefined) {
        return (<div>Loading...</div>)
    }
    else {
        return (
            <table className="table mb-0">
                <thead className="bg-light">
                    <tr className="smaller">
                        {/*<th scope="col" className="border-0">Contact</th>*/}
                        <th scope="col" className="border-0">Time</th>
                        <th scope="col" className="border-0">Duration</th>
                    </tr>
                </thead>
                <tbody>
                {
                    events.map((e, i)=>{

                        const stringDate = timestampToDateString(e.timestamp_start)
                        let duration
                        if (e.hasOwnProperty("timestamp_end")){
                            duration = msDurationToString(e.timestamp_end - e.timestamp_start)
                        } else
                            duration = i === 0 ? "Ongoing..." : "Less than 1 minute"
                        return(
                            <tr>
                                {/*<td>{e.found.name}</td>*/}
                                <td>{stringDate}</td>
                                <td>{duration}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }

}
