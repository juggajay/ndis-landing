# Formspree Configuration Instructions

## 🔧 How to Configure Email Notifications in Formspree

### 1. **Enable Auto-Reply for Users (Confirmation Email)**

1. Log in to your Formspree dashboard at https://formspree.io
2. Click on your form (xeozqjpo)
3. Go to **Settings** → **Automation**
4. Enable **Auto-Reply**
5. Configure the auto-reply email:
   - **Subject**: "Welcome to NDIS Pulse - We've Received Your Application"
   - **Message**: 
   ```
   Hi {{firstName}},

   Thank you for joining the NDIS Pulse waitlist!

   We've received your application and you're now on our exclusive early access list. 
   Here's what happens next:

   ✅ You'll receive priority access when we launch
   ✅ 20% discount on your first year subscription
   ✅ Exclusive training sessions and support

   We'll be in touch within the next few days with more information about our beta program.

   If you have any questions, feel free to reply to this email.

   Best regards,
   The NDIS Pulse Team
   ```

### 2. **Add jaysonryan2107@gmail.com as Notification Recipient**

1. In your Formspree dashboard, click on your form
2. Go to **Settings** → **Notifications**
3. Under **Email Notifications**, add: `jaysonryan2107@gmail.com`
4. You can have multiple recipients - just add them separated by commas

### 3. **Optional: Configure Webhook for Advanced Integration**

If you want to integrate with other services later:
1. Go to **Settings** → **Integrations**
2. You can add webhooks to connect to:
   - Zapier
   - Make (Integromat)
   - Your own API endpoint
   - CRM systems

### 4. **Test Your Configuration**

1. Submit a test entry through your live website
2. Check that you receive:
   - ✅ Notification at jaysonryan2107@gmail.com
   - ✅ Auto-reply at the test email address
   - ✅ Formspree dashboard shows the submission

### 5. **Troubleshooting**

**If emails aren't arriving:**
- Check spam/promotions folders
- Verify email addresses are correct in Formspree
- Ensure Formspree plan supports auto-replies (some features require paid plans)
- Check Formspree's email logs in the dashboard

**Current Form Fields Being Captured:**
- `email` - User's email address
- `firstName` - User's first name  
- `organization` - Company/organization name
- `providerType` - Type of NDIS provider
- `state` - Australian state
- `_subject` - Email subject line
- `_replyto` - Sets reply-to address

## 📊 Viewing Submissions

1. Log in to Formspree dashboard
2. Click on your form
3. View all submissions under **Submissions** tab
4. Export data as CSV if needed

## 🎯 Pro Tips

- Set up email filters to organize waitlist emails
- Consider upgrading Formspree plan if you expect high volume
- Regular export submissions to backup your waitlist data
- Monitor spam submissions and add reCAPTCHA if needed