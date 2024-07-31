import { createTransport } from 'nodemailer';

const config = {
    mailHost: 'sandbox.smtp.mailtrap.io',
    mailPort: 2525,
    mailUser: '4fdf6b774baebb',
    mailPass: 'cab0ca6856bc7f',
    mailFrom: 'Paradigm Research',
    mailFromName: 'Paradigm Research',
};

const sendMail = async (to: string, subject: string, html: string) => {
    const transporter = createTransport({
        host: config.mailHost,
        port: config.mailPort,
        secure: false,
        auth: {
            user: config.mailUser,
            pass: config.mailPass,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"${config.mailFromName}" <${config.mailFrom}>`,
            to,
            subject,
            html,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log('Error occurred');
        console.log((error as unknown as any).message);

        throw new Error('Error occurred while sending email');
    }
};

export default sendMail;
