# AWS Contact Form Setup Guide

This guide walks you through setting up the serverless contact form using AWS Lambda and SES.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18+ installed locally

## Step 1: Set up Amazon SES (Simple Email Service)

### 1.1 Verify Email Addresses

1. Go to AWS SES Console: https://console.aws.amazon.com/ses/
2. Click "Verified identities" in the left sidebar
3. Click "Create identity"
4. Choose "Email address" and enter:
   - Your admin email (ahwurm1@gmail.com) - where you'll receive form submissions
   - Your "from" email (noreply@awurm.com) - sender address for emails
5. Check your email and click the verification links

### 1.2 Move Out of Sandbox (Production Only)

By default, SES is in sandbox mode. To send emails to any address:

1. In SES Console, click "Account dashboard"
2. Request production access
3. Fill out the use case form
4. Wait for approval (usually 24 hours)

## Step 2: Create Lambda Function

### 2.1 Package the Function

```bash
cd api
npm install
zip -r function.zip .
```

### 2.2 Create the Lambda Function

1. Go to AWS Lambda Console: https://console.aws.amazon.com/lambda/
2. Click "Create function"
3. Choose:
   - Function name: `awurm-contact-handler`
   - Runtime: Node.js 18.x
   - Architecture: x86_64
4. Click "Create function"

### 2.3 Upload Function Code

1. In the function page, under "Code source"
2. Click "Upload from" → ".zip file"
3. Upload the `function.zip` file
4. Click "Save"

### 2.4 Configure Environment Variables

1. Go to "Configuration" → "Environment variables"
2. Add the following:
   ```
   ADMIN_EMAIL=ahwurm1@gmail.com
   FROM_EMAIL=noreply@awurm.com
   ALLOWED_ORIGIN=https://awurm.com
   AWS_REGION=us-east-1
   ```

### 2.5 Set Lambda Permissions

1. Go to "Configuration" → "Permissions"
2. Click on the execution role
3. Add the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

## Step 3: Create API Gateway

### 3.1 Create REST API

1. Go to API Gateway Console: https://console.aws.amazon.com/apigateway/
2. Click "Create API"
3. Choose "REST API" (not private)
4. Settings:
   - API name: `awurm-contact-api`
   - Endpoint Type: Regional

### 3.2 Create Resource and Method

1. Click "Actions" → "Create Resource"
   - Resource Name: contact
   - Resource Path: /contact
   - Enable CORS: ✓
2. Select `/contact` resource
3. Click "Actions" → "Create Method" → "POST"
4. Integration type: Lambda Function
5. Lambda Function: `awurm-contact-handler`
6. Click "Save" and "OK" to add permission

### 3.3 Configure CORS

1. Select `/contact` resource
2. Click "Actions" → "Enable CORS"
3. Configure:
   - Access-Control-Allow-Origin: `'https://awurm.com'` (or `'*'` for testing)
   - Access-Control-Allow-Headers: `'Content-Type'`
   - Access-Control-Allow-Methods: `'POST,OPTIONS'`
4. Click "Enable CORS and replace existing CORS headers"

### 3.4 Deploy API

1. Click "Actions" → "Deploy API"
2. Deployment stage: New Stage
3. Stage name: `prod`
4. Click "Deploy"
5. Copy the "Invoke URL" - this is your API endpoint

## Step 4: Configure Next.js Application

### 4.1 Set Environment Variable

1. In AWS Amplify Console, go to your app
2. Go to "Environment variables"
3. Add:
   ```
   NEXT_PUBLIC_CONTACT_API_URL=https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/contact
   ```
   (Replace with your actual API Gateway URL)

### 4.2 Redeploy Application

The app will automatically redeploy with the new environment variable.

## Step 5: Test the Integration

### 5.1 Test Lambda Function

1. In Lambda console, create a test event:
```json
{
  "httpMethod": "POST",
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test Subject\",\"message\":\"Test message\"}"
}
```
2. Click "Test" to verify function works

### 5.2 Test API Gateway

1. In API Gateway console, select POST method
2. Click "TEST"
3. Add request body:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Subject",
  "message": "Test message from API Gateway"
}
```
4. Click "Test"

### 5.3 Test Full Integration

1. Visit https://awurm.com/contact
2. Fill out and submit the form
3. Check that you receive both emails

## Monitoring and Logs

### CloudWatch Logs

- Lambda logs: `/aws/lambda/awurm-contact-handler`
- API Gateway logs: Enable in API Gateway settings

### Metrics

- Lambda: Invocations, Errors, Duration
- API Gateway: Count, 4XXError, 5XXError
- SES: Sends, Bounces, Complaints

## Troubleshooting

### Common Issues

1. **"AccessDenied" error**: Check Lambda execution role has SES permissions
2. **"MessageRejected" error**: Verify email addresses in SES
3. **CORS errors**: Check API Gateway CORS configuration
4. **Form doesn't submit**: Check browser console for errors
5. **No emails received**: Check SES sandbox status

### Debug Steps

1. Check CloudWatch logs for Lambda function
2. Test Lambda function directly in console
3. Test API Gateway endpoint with curl:
```bash
curl -X POST https://YOUR-API-URL/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

## Security Best Practices

1. **Rate Limiting**: Add API Gateway throttling
2. **Input Validation**: Lambda validates all inputs
3. **CORS**: Restrict to your domain only
4. **Environment Variables**: Never commit sensitive data
5. **IAM**: Use least privilege principle

## Cost Estimates

- **Lambda**: First 1M requests/month free
- **API Gateway**: First 1M calls/month free  
- **SES**: $0.10 per 1000 emails
- **Typical contact form**: < $1/month

## Next Steps

1. Add reCAPTCHA for spam protection
2. Set up CloudWatch alarms for errors
3. Add rate limiting in API Gateway
4. Consider adding a database to store submissions
5. Set up custom domain for API