import { useEffect, useState } from "react";
import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserList() {
    const event = useLocation().state.event;
    const eventId = event._id;

    // for back button
    const navigate = useNavigate();

    // for manage the userlist
    const [list, setList] = useState([]);

    useEffect(() => {
        const getUserList = async (eventId) => {
            try {
                const response = await axios.post("http://localhost:3000/userRegistrationapi/userList", { _id: eventId });
                setList(response.data.userList);
                if(response.status === 203){
                    Swal.fire({
                        icon: "info",
                        title: "No User found",
                        text: "No user in this event",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#3085d6",
                      });
                }
            } catch (error) {
                console.log("error during get the userlist", error)
            }
        }
        getUserList(eventId)
    }, [eventId])

    return (
        <>
            <HeaderComponent />
            <div  style={{ boxSizing: 'border-box' }} className="container-fluid p-2 pt-2 pb-2">
               <div className="border border-secondary rounded p-2">
               {list.length > 0 ? <h2>user list</h2> : ""}
                {list.length === 0 ? (
                    <>
                        <h2>No user found</h2>
                        <button onClick={()=>{navigate(-1)}} className="btn btn-outline-secondary">Back</button>
                    </>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">Address</th>

                                </tr>
                            </thead>
                            <tbody id="eventTableBody">
                                {list.map((user, index)=>(
                                    <tr key={user._id}>
                                        <td>{index+1}</td>
                                        <td>{user.eventId.title}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contactNumber}</td>
                                        <td>{user.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={()=>{navigate(-1)}}
                            className="btn btn-outline-secondary">
                            Back
                        </button>
                    </div>
                )
                }
               </div>
            </div>
            <FooterComponent />
        </>
    )
}