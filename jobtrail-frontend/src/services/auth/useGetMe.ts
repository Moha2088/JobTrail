import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MeUserData } from "../users/types"


export function useGetMe() {
    return useQuery<MeUserData>({
        queryKey: ["me"],
        queryFn: async() => {
            const { data } = await axios.get<MeUserData>(`http://localhost:3003/api/auth/me`)
            console.log("Got me data!")
            console.log(data)
            return data
        }
    }) 
}