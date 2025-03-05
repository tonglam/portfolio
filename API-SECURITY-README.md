# API Security Testing with Cloudflare

This document provides instructions for testing the authentication mechanism of your API and verifying Cloudflare protection.

## Authentication Mechanism

The project uses middleware (`middleware.js`) to protect API routes under `/api/cloudflare/*`. The authentication works as follows:

1. All requests to `/api/cloudflare/*` routes are checked for authentication (except the test route)
2. Authentication can be provided in two ways:
   - Using the `Authorization: Bearer <token>` header
   - Using the `api_key` query parameter
3. The token must match the `CLOUDFLARE_API_TOKEN` in your environment variables
4. Unauthorized requests receive a 401 status code with an error message

## Testing Authentication

### Prerequisites

1. Make sure your Next.js development server is running:

   ```bash
   npm run dev
   ```

2. Ensure your `.env` file contains the `CLOUDFLARE_API_TOKEN` variable.

### Running Authentication Tests

Run the authentication test script:

```bash
node auth-test.mjs
```

This script performs five tests:

1. Access with a valid token in the Authorization header
2. Access with an invalid token in the Authorization header
3. Access with a valid token as a query parameter
4. Access without any token
5. Access to the test route (which should be accessible without authentication)

Expected results:

- Tests 1 and 3 should show "Success: Authentication passed"
- Tests 2 and 4 should show "Request failed: Unauthorized access"
- Test 5 should be successful regardless of authentication

## Verifying Cloudflare Protection

To check if your API is properly protected by Cloudflare, run:

```bash
node check-cloudflare-protection.mjs https://your-deployed-api-url.com/api/cloudflare/test
```

This script:

1. Makes a request to the specified URL
2. Examines the response headers for Cloudflare-specific headers
3. Analyzes the presence of important security headers
4. Provides recommendations for enhancing security

### What to Look For

- The presence of `cf-ray` header confirms that the request passed through Cloudflare
- Security headers like HSTS, Content-Security-Policy, and X-Content-Type-Options enhance your API's security

## Setting Up Cloudflare for API Protection

To protect your API with Cloudflare:

1. Sign up for a Cloudflare account at https://dash.cloudflare.com/sign-up
2. Add your domain to Cloudflare and follow the DNS setup instructions
3. Configure security settings in the Cloudflare dashboard:

   - Enable "Security Level" under the "Security" tab
   - Set up WAF (Web Application Firewall) rules for API endpoints
   - Configure rate limiting to prevent abuse
   - Enable Bot Fight Mode to block malicious bots

4. For enhanced API security, consider using Cloudflare API Shield:
   - Set up API schema validation
   - Enable mutual TLS authentication for API clients
   - Configure custom firewall rules specific to your API endpoints

## Additional Security Recommendations

1. Use HTTPS for all API endpoints
2. Implement rate limiting to prevent abuse
3. Add logging for authentication failures
4. Consider using JWTs for more sophisticated authentication flows
5. Implement CORS policies to restrict which domains can access your API
