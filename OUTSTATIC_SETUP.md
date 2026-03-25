# Outstatic CMS Setup Instructions

## GitHub OAuth App Setup (Required)

You need to create a GitHub OAuth App to allow Outstatic to access your repository.

### Steps:

1. **Go to GitHub Developer Settings**
   - Visit: https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"

2. **Fill in the OAuth App Details**

   **For Local Development:**
   - Application name: `Grown & Sexy CMS (Local)`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/outstatic/callback`

   **For Production:**
   - Application name: `Grown & Sexy CMS`
   - Homepage URL: `https://www.grownandsexy.vip`
   - Authorization callback URL: `https://www.grownandsexy.vip/api/outstatic/callback`

3. **Get Your Credentials**
   - After creating the app, you'll see:
     - **Client ID** - Copy this
     - Click "Generate a new client secret" → **Client Secret** - Copy this

4. **Update Environment Variables**

   **Local Development** (`.env.local`):
   ```bash
   OST_GITHUB_ID=paste_your_client_id_here
   OST_GITHUB_SECRET=paste_your_client_secret_here
   OST_TOKEN_SECRET=ubtlK1z/IHJgk/Ibt2nXM9A57AqnPMKe7orG8HsWE4c=
   OST_REPO_SLUG=madezmedia/grown-sexy-site
   OST_REPO_BRANCH=main
   ```

   **Production (Vercel)**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add each variable:
     - `OST_GITHUB_ID`
     - `OST_GITHUB_SECRET`
     - `OST_TOKEN_SECRET`
     - `OST_REPO_SLUG`
     - `OST_REPO_BRANCH`

5. **Test Access**
   - Run `npm run dev`
   - Navigate to `http://localhost:3000/outstatic`
   - Click "Login with GitHub"
   - Authorize the app
   - You should see the Outstatic dashboard!

## Creating Collections

Once logged in to `/outstatic`, create these collections:

### 1. Events Collection
Custom fields:
- `subtitle` (Text)
- `date` (Date)
- `time` (Text)
- `location` (Text)
- `price` (Text)
- `category` (Select: Spades, Wine, Dance, Comedy, Wellness)
- `isFeatured` (Boolean)
- `prizePool` (Text - optional)
- `spots` (Number)
- `highlights` (Tags/Array)
- `status` (Select: upcoming, sold-out, completed)

### 2. Artists Collection
Custom fields:
- `stageName` (Text)
- `genre` (Tags/Array)
- `socialLinks` (JSON/Object)
- `featuredOnHomepage` (Boolean)

### 3. Blog Collection
Custom fields:
- `author` (Text)
- `category` (Select: Events, Community, News, Artist Spotlight)
- `excerpt` (Textarea)
- `tags` (Tags/Array)

## Troubleshooting

**Issue: "Unauthorized" error**
- Check that OST_GITHUB_ID and OST_GITHUB_SECRET are correct
- Verify callback URL matches exactly (no trailing slash)

**Issue: Can't see dashboard**
- Make sure you've authorized the GitHub app
- Check browser console for errors
- Verify all environment variables are set

**Issue: Build fails**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild

## Next Steps After Setup

1. Create your first Event in the dashboard
2. Test that it appears on the events page
3. Upload images via the editor
4. Publish and verify on the live site

---

**Need help?** Check the Outstatic docs: https://outstatic.com/docs
