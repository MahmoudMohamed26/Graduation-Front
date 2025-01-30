import { useParams } from "react-router-dom"

export default function EditEmployee(){
    const { id } = useParams()
    return(
        <div>
            <h1>Edit Employee {id}</h1>
        </div>
    )
}