import { resendClient } from "../../clients/resendClient"
import { emailExists } from "../users/emailExists"
import { getUser } from "../users/getUser"
import { MailOptions } from "./types"
import { validateEmail } from "./validateEmail"


export async function sendDeletionCancelledMail(options: MailOptions) {
    const { id, email } = options

    const user = await getUser(id)

    if (!user) {
        throw new Error(`User with id: ${id} doesn't exist!`)
    }

    const mailExists = await emailExists(email)

    if(!mailExists) {
        throw new Error(`User with email: ${email} does not exist!`)
    }

    if(!validateEmail({ id, email })) {
        throw new Error("Email doesn't belong to user!")
    }

    const { error } = await resendClient.emails.send({
        from: Bun.env.RESEND_FROM!,
        to: [email],
        subject: `Your account is no longer being deleted!`,
        html: `
            <div style="font-size:13px">
                <p style="font-weight: normal; margin-bottom: 40px;">
                    The scheduled deletion of your account, has now been cancelled!
                </p>

                <p>
                    Kind regards
                </p>

                <b>
                Jobtrail team</b>
            </div>`
    })

    if (error) {
        const { name, message } = error
        throw new Error(`${name} - ${message}`)
    }
}