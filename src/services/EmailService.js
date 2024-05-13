const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email, createdOrder) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'tthu13222@gmail.com', // generated ethereal user
            pass: 'lhmf qeim yuny bijw', // generated ethereal password
        },

    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    let listItem = '';
    const attachImage = []
    createdOrder.orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`
        attachImage.push({ path: order.image })
    })

    const content = `
    <div><h3>Cảm ơn quý khách ${createdOrder.fullName} đã đặt hàng tại StateofTV,</h3></div>
    <p>Tiki rất vui thông báo đơn hàng #${createdOrder._id} của quý khách đã được tiếp nhận và đang trong quá trình xử lý. Chúng tôi sẽ thông báo đến quý khách ngay khi hàng chuẩn bị được giao.</p>
<p>Chi tiết đơn hàng: ${listItem}</p>
    `

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'tthu13222@gmail.com', // sender address
        to: 'tthu13222@gmail.com', // list of receivers
        subject: `Xác nhận đơn hàng #${createdOrder._id}`, // Subject line
        text: "Hello world?", // plain text body
        html: content,
        attachments: attachImage,
    });
}

module.exports = {
    sendEmailCreateOrder
}