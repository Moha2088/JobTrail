import { resendClient } from "../../clients/resendClient";
import { getUser } from "../users/getUser";
import { MailOptions } from "./types";
import { validateEmail } from "./validateEmail";


export async function sendDeleteRequestMail(options: MailOptions) {
    const { id, email } = options

    const user = await getUser(id)

    if (!user) {
        throw new Error(`User with id: ${id} doesn't exist!`)
    }

    if(!validateEmail({ id, email })) {
        throw new Error("Email doesn't belong to user!")
    }

    const { error } = await resendClient.emails.send({
        from: Bun.env.RESEND_FROM!,
        to: [email],
        subject: `Deletion of account: ${id}`,
        html: `
            <div style="font-size:13px;">
                <p style="font-weight: normal; margin-bottom: 40px;">
                    You're getting this mail, because you requested to delete your account. 
                    If you think you made a mistake, you can cancel the deletion by logging into the app. 
                    If no further action is taken, your account will be deleted in 24 hours.
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