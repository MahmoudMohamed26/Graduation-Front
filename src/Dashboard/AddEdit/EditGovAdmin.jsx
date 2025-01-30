import { useParams } from "react-router-dom"

export default function EditGovAdmin(){
    const { id } = useParams()
    return(
        <div>
            <h1>Edit GovAdmin {id}</h1>
        </div>
    )
}