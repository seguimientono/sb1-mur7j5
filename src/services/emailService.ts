import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailjs';

interface EmailData {
  from_email: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
    throw new Error('EmailJS configuration is incomplete');
  }

  try {
    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        to_email: emailConfig.defaultEmail,
        from_email: data.from_email,
        message: data.message,
      },
      emailConfig.publicKey
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email notification');
  }
};