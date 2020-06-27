import React, {Fragment, useEffect, useState} from 'react'
import io from 'socket.io-client'
import {Card, Col, Container, Row, CardText } from "shards-react";
import UserList from '../../elements/userList/userList'
import EventTable from '../../elements/eventTable/eventTable'
import RelationshipsTable from "../../elements/relationshipsTable/relationshipsTable";

export default () => {

    const [users, setUsers] = useState();
    const [events, setEvents] = useState();
    const [socket, setSocket] = useState(null)
    const [relationships, setRelationships] = useState([])
    // const [activeRelationship, setActiveRelationship] = useState()
    const [activeUser, setActiveUser] = useState()
    const [isSocketSetUp, setIsSocketSetUp] = useState(false);

    const handleUserClick = async (user) => {
        await setActiveUser(user);
        //socket.emit("getEvents", user);
        socket.emit("getRelationships", user);
    }

    const handleRelationshipClick = async (relationship) => {
        // await setActiveRelationship(relationship)
        setEvents(relationship.events)
    }

    useEffect(()=> {
        setSocket(io("http://localhost:2000"))
    }, []);

    useEffect(()=>{
        if (socket !== null && !isSocketSetUp ) {

            socket.emit("getUsers");

            socket.on("users", users => {
                setUsers(users)
                setActiveUser(users[0])
                socket.emit("getRelationships", users[0])
            })

            // socket.on("events", events => {
            //     setEvents(events)
            // })

            socket.on("relationships", relationships=>{
                console.log("!!!")
                setRelationships(relationships)
                setEvents( relationships.length > 0 ? relationships[0].events : null)
            })

            setIsSocketSetUp(true);
        }

    }, [socket])

    return (
        <Fragment>
            <Container fluid>
                <Row>
                    <Col sm={12} lg={2} xs={12}>
                        <Card>
                            {users ?
                                <UserList users={users} handleUserClick={handleUserClick}/>
                                :
                                null
                            }
                        </Card>
                    </Col>
                    <Col sm={12} lg={5} xs={12}>
                        <Card>
                            {relationships ?
                                <RelationshipsTable relationships={relationships}
                                                    handleRelationshipClick={handleRelationshipClick}/>
                                :
                                null
                            }
                        </Card>
                    </Col>
                    <Col sm={12} lg={5} xs={12}>
                            <Card>
                                {events ?
                                    <EventTable events={events}/>
                                    :
                                    null
                                }
                            </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
