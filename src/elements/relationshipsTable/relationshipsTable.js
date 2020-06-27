import React, {useState} from 'react'
import { msDurationToString, timestampToDateString } from "../../utils/helpers";

export default function RelationshipsTable({relationships, handleRelationshipClick}){

    const [activeRelationshipIndex, setActiveRelationshipIndex] = useState(0)

    if (relationships === undefined) {
        return (<div>Loading...</div>)
    }

    else {
        return (
            <table className="table mb-0">
                <thead className="bg-light">
                <tr className="smaller">
                    <th scope="col" className="border-0">Contact</th>
                    <th scope="col" className="border-0">Time</th>
                    <th scope="col" className="border-0">Duration</th>
                    <th scope="col" className="border-0"># of Contacts</th>
                </tr>
                </thead>
                <tbody>
                {
                    relationships.map((r, i)=>{
                        let stringDate
                        if (r.timestampLatest != 0) {
                            stringDate = timestampToDateString(r.timestampLatest)
                        } else {
                            stringDate = "Never came into contact"
                        }

                        let displayDuration = msDurationToString(r.totalTime);

                        return(
                            <tr
                                onClick={()=>{
                                    handleRelationshipClick(r)
                                    setActiveRelationshipIndex(i)
                                }}
                                style={{
                                backgroundColor: i === activeRelationshipIndex ? "#007BFF" : "#FFFFFF",
                                color: i === activeRelationshipIndex ? "#FFFFFF" : "#000000",
                                }}
                            >
                                <td>{r.found.name}</td>
                                <td>{stringDate}</td>
                                <td>{displayDuration}</td>
                                <td>{r.totalEvents}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }

}
