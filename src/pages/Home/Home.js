import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { StyledButton } from "../../components/Button/Button.elements"
import UserModel from "../../db/UserModel"
import { AuthContext } from "../../firebase/Auth"

export const Home = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    if (!!currentUser) {
        if (currentUser.access === 0 && currentUser.active === false) {
            let userModel = new UserModel()
            userModel.logout()
        }
    }

    const handleListUsers = () => {
        navigate("/usuarios", { replace: true });
    }

    if (!!currentUser) {
        return (
            <>
                <StyledButton onClick={handleListUsers} primary>lista de usuários</StyledButton>
            </>
        )
    } else {
        return (
            <>
                <h1>Home</h1>
            </>
        )
    }
}