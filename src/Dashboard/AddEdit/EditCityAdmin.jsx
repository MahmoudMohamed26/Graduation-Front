import { useParams } from "react-router-dom"

export default function EditCityAdmin(){
    const { id } = useParams()
    return(
        <div>
            <h1>Edit CityAdmin {id}</h1>
        </div>
    )
}