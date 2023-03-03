import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { routeAdmin } from "../function/funcroute";

const Privateadmin = () => {

    const [status, setStatus] = useState(true);

    const CheckAdmin = () => {
        routeAdmin(sessionStorage.getItem("token"))
            .then((res) => {
                // console.log(res.data)
                setStatus(res.data)
            }).catch(err => {
                // console.log(err)
                setStatus(false)
            })
    }

    useEffect(() => {
        CheckAdmin()
    }, [])
    return status ? <Outlet /> : <Navigate to="/" />

}

export default Privateadmin