# Supabase Integration Setup Guide

This guide will help you set up Supabase to store your contact form submissions.

## Prerequisites

1. A Supabase account (free tier available at [supabase.com](https://supabase.com))
2. A Supabase project created

## Step 1: Create Supabase Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Run the following SQL to create the `contact_submissions` table:

```sql
-- Create the contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for form submissions)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows only authenticated users to view (optional)
CREATE POLICY "Allow authenticated select" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in your project root with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important**: Replace `your_project_url_here` and `your_anon_key_here` with your actual values.

## Step 3: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your Supabase dashboard under **Table Editor** → **contact_submissions** to see the data

## Step 4: View Submissions (Optional)

To view submissions in your Supabase dashboard:

1. Go to **Table Editor** in your Supabase dashboard
2. Click on the `contact_submissions` table
3. You'll see all form submissions with timestamps

## Security Features

- **Row Level Security (RLS)** is enabled by default
- Only authenticated users can view submissions (configurable)
- Anyone can submit forms (required for public contact forms)
- Data is validated both client-side and server-side

## Environment Variables

Make sure these are set in your `.env.local` file:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Check that your `.env.local` file exists and has the correct values
   - Restart your development server after adding environment variables

2. **Form submissions not appearing in Supabase**
   - Check the browser console for errors
   - Verify your Supabase credentials are correct
   - Ensure the table was created successfully

3. **CORS errors**
   - Check your Supabase project settings
   - Ensure your domain is allowed in the Supabase dashboard

### Testing:

You can test the Supabase connection by running this in your browser console:

```javascript
// Test Supabase connection
import { supabase } from './src/lib/supabase.js'
supabase.from('contact_submissions').select('*').limit(1).then(console.log)
```

## Next Steps

- Consider adding email notifications for new submissions
- Set up automated responses
- Add admin dashboard for managing submissions
- Implement rate limiting to prevent spam

## Support

If you encounter issues:
1. Check the Supabase documentation
2. Review the browser console for error messages
3. Verify your table structure matches the schema
4. Ensure your environment variables are correctly set
