import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'marie.walter16@ethereal.email',
      pass: 'mC2Emf7w2yd8Bpch9a'
  }
});

export const sendEmail = async (email:string) => {
   const res = await transporter.sendMail({
    from: '"From Concord Messaging Applicaion 📃" <servicesconcord2@gmail.com>',
    to: "shettyabhijith930@gmail.com",
    subject: "Authenticate Yourslef",
    text: "Hello world?",
    html: "<b>450098</b>",
  });
};

