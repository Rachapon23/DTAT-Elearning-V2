import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { checkToken } from "../function/auth";

const ResetPasswordRoute = () => {
    const {id} = useParams()
    const [isTokenValid, setIsTokenValid] = useState(true);
    const checkValideToken = () => {
        checkToken(id)
        .then((res) => {
            console.log(res.data.isValid)
            setIsTokenValid(res.data.isValid)
        })
    }

    useEffect(() => {
        checkValideToken()
    }, [])
    return  isTokenValid ? <Outlet/> : <Navigate to="/"/> 
  
}

export default ResetPasswordRoute