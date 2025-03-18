import { User } from '@/models';
import NewsletterUser from '@/models/NewsLatter';
import { NodeMailerTransporter } from '@/utils/nodeMailer';
import { TRPCError } from '@trpc/server';

export const sendNewsletter = async (input: { emails: string[]; message: string; }) => {
    const { emails, message, } = input;

    const mailOptions = (recipient: string) => ({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: `Newsletter from ${'SupperU'}`,
        html: `
            <div>
                <p>${message}</p>
            </div>
        `,
    });


    try {
        await Promise.all(
            emails.map((email) => NodeMailerTransporter.sendMail(mailOptions(email)))
        );

        return { success: true };
    } catch (error) {
        console.error('Error sending newsletter:', error);
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to send the newsletter.',
        });
    }
};


export const createEmailUser = async (email: string) => {
    const existingUser = await NewsletterUser.findOne({ email });
    const existingRegisterUser = await User.findOne({ email });
    if (existingUser || existingRegisterUser) {
        throw new Error("This email is already subscribed.");
    }

    const newUser = new NewsletterUser({ email });
    await newUser.save();

    return { message: "Successfully subscribed to the newsletter." };
};

export const getAllEmailUsers = async () => {
    try {
        const users = await NewsletterUser.find();
        return users;
    } catch (error) {
        throw new Error("Failed to retrieve newsletter users.");
    }
};
