import { getUser } from "../users/getUser"

interface ValidateEmailOptions {
    id: number
    email: string
}

export async function validateEmail(options: ValidateEmailOptions) {
    const { id, email: emailToDelete } = options
    const { email } = await getUser(id)
    return email == emailToDelete

}