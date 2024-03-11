const emailNotifierBody = (appicantName,formattedDate,siteAdminName)=>{
    return   `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>US Appointment Notifier</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="text-align: center;">US Appointment Notifier</h2>
            <p>Dear ${appicantName},</p>
            <p>I hope this email finds you well. I am writing to inform you that the system has found an earlier US appointment date.</p>
            <p>The new appointment date is ${formattedDate}. Please confirm if this date works for you. If not, your previously scheduled time will not update.</p>
            <p>Please let me know your availability at your earliest convenience so that we can finalize the  date.</p>
            <p>Thank you for your attention to this matter.</p>
            <p>Sincerely,</p>
            <p>${siteAdminName}</p>
        </div>
    </body>
    </html>`
}
module.exports = {emailNotifierBody}