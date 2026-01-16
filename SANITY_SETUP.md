# Sanity CMS Setup Guide

## Step 1: Create Sanity Project

1. **Go to Sanity Management Console:**
   - Visit: https://sanity.io/manage
   - Log in with your Sanity account

2. **Create New Project:**
   - Click "Create new project" button
   - **Project name:** `reclaim-my-life` (or your preferred name)
   - Click "Create project"

3. **Copy Project ID:**
   - After creation, you'll see your project in the dashboard
   - Copy the **Project ID** (looks like: `abc123xyz`)

4. **Add Dataset:**
   - Click on your project
   - Go to "Datasets" tab
   - The `production` dataset should already be created
   - If not, click "Add dataset" and name it `production`

## Step 2: Update Environment Variables

1. **Open `.env.local` in your code editor**

2. **Replace the placeholder:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=REPLACE_WITH_YOUR_PROJECT_ID
```

With your actual project ID:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
```

3. **Save the file**

> Tip: For workspace-local setup, you can also mirror these values in `/web/.env.local`.


## Step 3: Configure CORS (Important!)

1. **In Sanity Management Console:**
   - Go to your project → Settings → API
   - Scroll to "CORS Origins"

2. **Add these origins:**
   - Click "Add CORS origin"
   - Origin: `http://localhost:3000` (for Next.js dev)
   - ✓ Allow credentials
   - Click "Add"
   
   - Click "Add CORS origin" again
   - Origin: `http://localhost:3333` (for Sanity Studio dev)
   - ✓ Allow credentials
   - Click "Add"

## Step 4: Start Sanity Studio

1. **In your terminal, run:**
   ```bash
   pnpm sanity
   ```

2. **The Studio should open at:**
   ```
   http://localhost:3333
   ```

3. **You'll see two content types:**
   - Site Settings
   - Home Page

## Step 5: Add Initial Content

### Create Site Settings Document:

1. Click "Site Settings"
2. Click "Create" (if prompted)
3. Fill in:
   - **General Info tab:**
     - Site Name: `Reclaim My Life`
     - Tagline: `Supporting your journey to recovery`
   
   - **Contact Information tab:**
     - Phone: `(555) 123-4567` (placeholder)
     - Email: `info@reclaimyourlife.com` (placeholder)
     - Address:
       - Street: `123 Recovery Lane`
       - City: `Your City`
       - State: `CA`
       - ZIP: `12345`
   
   - **Social Media tab:**
     - Leave empty for now (you can add links later)

4. Click "Publish"

### Create Home Page Document:

1. Click "Home Page"
2. Click "Create"
3. Fill in:
   
   **Hero Section tab:**
   - Main Headline: `Reclaim Your Life`
   - Subtitle: `A safe, supportive environment for recovery and personal growth`
   - Background Image: 
     - Click "Upload" → Select a placeholder image (or skip for now)
     - Alt Text: `Peaceful recovery environment with natural sunlight`
   - Primary Button:
     - Button Text: `Start Your Journey`
     - Link URL: `/register`
   - Secondary Button:
     - Button Text: `Contact Us`
     - Link URL: `/contact`
   
   **Mission Section tab:**
   - Section Title: `Our Mission`
   - Mission Content: (Paste the Lorem ipsum text from the current site, or replace with real content)
     ```
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
     quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
     consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
     cillum dolore eu fugiat nulla pariatur.

     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
     deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste 
     natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
     eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
     dicta sunt explicabo.

     Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
     sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
     Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
     adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
     dolore magnam aliquam quaerat voluptatem.

     Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
     laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure 
     reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
     vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
     ```
   
   **Call-to-Action Section tab:**
   - Section Title: `Ready to Take the Next Step?`
   - Supporting Text: `Join our supportive community and start your journey to recovery today.`
   - Button:
     - Button Text: `Register Now`
     - Link URL: `/register`
   
   **SEO Settings tab:**
   - Page Title: `Reclaim Your Life - Sober Living Home`
   - Meta Description: `A safe, supportive environment for recovery and personal growth`
   - Social Share Image: (Skip for now, or use same as hero image)

4. Click "Publish"

## Step 6: Test the Studio

Try these actions to familiarize yourself with the interface:

1. **Edit text:** Change the hero headline and save
2. **Format text:** In Mission Content, try making some text **bold** or *italic*
3. **Add a link:** Highlight text and click the link icon
4. **Add social link:** Go to Site Settings → Social Media → Click "Add item"
   - Platform: `Facebook`
   - Profile URL: `https://facebook.com/yourpage`
5. **Preview:** Click around the different tabs and sections

## Troubleshooting

### "Project ID not found" error
- Make sure you've updated `.env.local` with your actual project ID
- Restart the Sanity dev server: Stop it (Ctrl+C) and run `pnpm sanity` again

### CORS errors in console
- Go to Sanity Management Console → Your Project → Settings → API → CORS Origins
- Make sure `http://localhost:3333` is added with credentials enabled

### Can't upload images
- Check your browser's network tab for errors
- Ensure you're logged into Sanity
- Try logging out and back in

## Next Steps

After completing this setup, you're ready for **Batch 2**, where we'll:
- Connect the Next.js frontend to Sanity
- Display CMS content on the home page
- Set up image optimization

---

**Questions?** Let me know if anything is unclear!
