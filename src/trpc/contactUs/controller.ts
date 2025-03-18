import { NodeMailerTransporter } from '@/utils/nodeMailer';
import { TRPCError } from '@trpc/server';

export const sendMessage = async (input: any) => {
    const { name, email, message } = input;

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'info@thesupernaturaluniversity.com',
        subject: `New Contact Us Message from ${name}`,
        text: `You have received a new message from ${name} (${email}).\n\nMessage:\n${message}`,
    };

    try {
        await NodeMailerTransporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to send the message.',
        });
    }
};
