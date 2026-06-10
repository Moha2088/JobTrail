import { emailExists } from "../users/emailExists"
import { getUser } from "../users/getUser"

interface ValidateEmailOptions {
    id: number
    email: string
}

export async function validateEmail(options: ValidateEmailOptions) {
    const { id, email: emailToDelete } = options
    const { email } = await getUser(id)

    const mailExists = await emailExists(email)

    if(!mailExists) {
        throw new Error(`User with email: ${email} does not exist!`)
    }

    return email == emailToDelete

}