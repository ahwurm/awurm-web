const AWS = require('aws-sdk');

// Initialize SES
const ses = new AWS.SES({ region: process.env.AWS_REGION || 'us-east-1' });

// Email configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ahwurm1@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@awurm.com';
const WEBSITE_NAME = 'awurm.com';

// CORS headers for API Gateway
const headers = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Lambda handler for contact form submissions
 */
exports.handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Prepare email to admin
    const adminEmailParams = {
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [ADMIN_EMAIL]
      },
      Message: {
        Subject: {
          Data: `[${WEBSITE_NAME}] New Contact Form Submission: ${subject}`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #0a1628; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                      New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <p><strong>From:</strong> ${name}</p>
                      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                      <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                      <h3 style="color: #0a1628; margin-top: 0;">Message:</h3>
                      <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                      <p style="margin: 0; font-size: 12px; color: #666;">
                        This email was sent from the contact form on ${WEBSITE_NAME}
                      </p>
                    </div>
                  </div>
                </body>
              </html>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `
New Contact Form Submission from ${WEBSITE_NAME}

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from the contact form on ${WEBSITE_NAME}
            `,
            Charset: 'UTF-8'
          }
        }
      }
    };

    // Prepare confirmation email to user
    const userEmailParams = {
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: `Thank you for contacting Alexander H. Wurm`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #0a1628; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                      Thank You for Your Message
                    </h2>
                    
                    <p>Hi ${name},</p>
                    
                    <p>Thank you for reaching out through ${WEBSITE_NAME}. I've received your message and will get back to you as soon as possible.</p>
                    
                    <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h3 style="color: #0a1628; margin-top: 0;">Your Message:</h3>
                      <p><strong>Subject:</strong> ${subject}</p>
                      <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <p>Best regards,<br>Alexander H. Wurm<br>Principal Analyst & Researcher</p>
                    
                    <div style="margin-top: 30px; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                      <p style="margin: 0; font-size: 12px; color: #666;">
                        This is an automated confirmation email. Please do not reply to this address.
                      </p>
                    </div>
                  </div>
                </body>
              </html>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `
Hi ${name},

Thank you for reaching out through ${WEBSITE_NAME}. I've received your message and will get back to you as soon as possible.

Your Message:
Subject: ${subject}
${message}

Best regards,
Alexander H. Wurm
Principal Analyst & Researcher

---
This is an automated confirmation email. Please do not reply to this address.
            `,
            Charset: 'UTF-8'
          }
        }
      }
    };

    // Send emails
    await Promise.all([
      ses.sendEmail(adminEmailParams).promise(),
      ses.sendEmail(userEmailParams).promise()
    ]);

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully!'
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};