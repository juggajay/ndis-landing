# NDIS Compliance Pro Lead Magnet Setup Guide

## Overview
This guide explains how to set up the complete lead magnet delivery system for the NDIS Compliance Checklist.

## What's Been Implemented

### 1. Thank You Page Flow
- ✅ Updated `/thank-you.html` with lead magnet CTA
- ✅ Added checklist modal with form
- ✅ Email pre-fill functionality from waitlist submissions
- ✅ Mobile-responsive design matching site aesthetic

### 2. Analytics Tracking
- ✅ GA4 events for:
  - `checklist_modal_open` - When user opens the checklist modal
  - `checklist_download` - When user submits checklist form
- ✅ Both events track in the 'conversion' category

### 3. Email Template
- ✅ Professional HTML email template at `/email-template-checklist.html`
- ✅ Responsive design with download button
- ✅ Preview of checklist contents
- ✅ Automation pitch section

## Setup Required

### 1. PDF Hosting
**Action Required:** Host your NDIS Compliance Checklist PDF and update these files:

1. **Email Template**: Replace `[INSERT_YOUR_GOOGLE_DRIVE_OR_DROPBOX_LINK]` in `/email-template-checklist.html` with your PDF download URL

2. **Recommended hosting options:**
   - Google Drive (public link)
   - Dropbox (public link)
   - AWS S3 bucket
   - Your own server

### 2. Email Automation Setup
**Formspree Configuration:**

1. In your Formspree dashboard, set up an autoresponder for the form endpoint
2. Use the subject: "Your NDIS Compliance Checklist is here!"
3. Upload the HTML email template with your PDF link

**Alternative:** Use services like:
- Mailchimp automations
- ConvertKit sequences
- ActiveCampaign workflows

### 3. Form Configuration
The checklist form submits to the same Formspree endpoint (`f/xeozqjpo`) with:
- `_source: "checklist_download"`
- `_subject: "NDIS Compliance Checklist Download Request"`

This allows you to:
- Differentiate checklist downloads from waitlist signups
- Tag users appropriately in your email system
- Track conversion rates

## User Flow

1. **User joins waitlist** → Email stored in localStorage
2. **User lands on thank-you page** → Sees checklist CTA
3. **User clicks "Get My Free Compliance Checklist"** → Modal opens (tracked)
4. **Form pre-filled with email** → User completes name field
5. **User submits form** → Conversion tracked, form sent to Formspree
6. **Autoresponder sends email** → With PDF download link
7. **User downloads PDF** → Lead magnet delivered

## Testing Checklist

- [ ] Test modal opens/closes properly
- [ ] Test form validation works
- [ ] Test email pre-fill from waitlist
- [ ] Test GA4 events fire correctly
- [ ] Test mobile responsiveness
- [ ] Test email template renders correctly
- [ ] Test PDF download link works

## Analytics Events

Monitor these events in GA4:
- `waitlist_submit` (existing)
- `checklist_modal_open` (new)
- `checklist_download` (new)

## Files Modified/Created

### Modified:
- `/thank-you.html` - Added lead magnet system
- `/index.html` - Added email storage for pre-fill

### Created:
- `/email-template-checklist.html` - Professional email template
- `/LEAD_MAGNET_SETUP.md` - This setup guide

## Next Steps

1. Host your NDIS Compliance Checklist PDF
2. Update the email template with your PDF URL
3. Configure Formspree autoresponder
4. Test the complete flow
5. Monitor conversion rates in GA4

## Support

If you need help with any part of this setup, the system is designed to be:
- Independent of the main waitlist flow
- Mobile-responsive
- Properly tracked with analytics
- Following the same design patterns as your main site

All forms work independently, so users can access the checklist even if they haven't joined the waitlist.