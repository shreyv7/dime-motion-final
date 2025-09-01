# Supabase Integration Setup

This project has been integrated with Supabase for the contact form functionality.

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard: https://fgrgwzaftiycvnpiyigj.supabase.co
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase_setup.sql` into the SQL editor
4. Run the script to create the necessary table and policies

### 2. Verify Configuration

The Supabase client is already configured in `src/lib/supabase.ts` with your project credentials:
- Project URL: https://fgrgwzaftiycvnpiyigj.supabase.co
- API Key: (configured in the file)

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the contact form
4. Check your Supabase dashboard under "Table Editor" > "contact_submissions" to see the submitted data

## Database Schema

The `contact_submissions` table includes:
- `id`: Unique identifier (UUID)
- `name`: Contact name (required)
- `email`: Contact email (required)
- `phone`: Phone number (optional)
- `company`: Company/organization (optional)
- `project_type`: Type of project (required)
- `message`: Project description (required)
- `created_at`: Submission timestamp
- `updated_at`: Last update timestamp

## Security Features

- Row Level Security (RLS) is enabled
- Anonymous users can insert new submissions
- Only authenticated users can view submissions
- Automatic timestamp updates

## Troubleshooting

### Common Issues

1. **"relation does not exist" error**: Make sure you've run the SQL setup script
2. **"permission denied" error**: Check that RLS policies are properly configured
3. **CORS errors**: Verify your Supabase project settings allow your domain

### Testing the Connection

You can test the Supabase connection by opening the browser console and running:
```javascript
// This should return your Supabase client configuration
console.log(window.supabase);
```

## Next Steps

Consider implementing:
- Email notifications for new submissions
- Admin dashboard to view submissions
- Form validation and spam protection
- Rate limiting for submissions





