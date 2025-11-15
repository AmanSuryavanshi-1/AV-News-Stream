# 🔧 Vercel 404 Fix - Quick Guide

## ✅ What to Do

### 1. Update Your `.env.local` File

Your `.env.local` should look like this:

```env
# NewsAPI - Server-side (NO VITE_ prefix)
NEWS_API_KEY_1=your_key_1
NEWS_API_KEY_2=your_key_2
NEWS_API_KEY_3=your_key_3

# GNews - Client-side (MUST have VITE_ prefix)
VITE_GNEWS_API_KEY_1=your_key_1
VITE_GNEWS_API_KEY_2=your_key_2
VITE_GNEWS_API_KEY_3=your_key_3

# YouTube - Client-side (MUST have VITE_ prefix)
VITE_YT_API_KEY_1=your_key_1
VITE_YT_API_KEY_2=your_key_2
VITE_YT_API_KEY_3=your_key_3

PORT=3001
```

### 2. Test Locally

```bash
# Build the project
npm run build

# Test the build
npm run preview

# If that works, test with server
npm run dev
```

### 3. Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

**Server-side (no warnings):**
```
NEWS_API_KEY_1=xxx
NEWS_API_KEY_2=xxx
NEWS_API_KEY_3=xxx
PORT=3001
```

**Client-side (will show warnings - click "Add" anyway):**
```
VITE_GNEWS_API_KEY_1=xxx
VITE_GNEWS_API_KEY_2=xxx
VITE_GNEWS_API_KEY_3=xxx
VITE_YT_API_KEY_1=xxx
VITE_YT_API_KEY_2=xxx
VITE_YT_API_KEY_3=xxx
```

### 4. Redeploy

```bash
git add .
git commit -m "fix: vercel deployment configuration"
git push origin main
```

---

## 🎯 Why This Happened

1. **Vite requires `VITE_` prefix** for client-side variables
2. **Server-side can use any name** (more secure)
3. **Vercel needs proper build configuration**

---

## ✅ Correct Setup

| Variable | Location | Prefix | Reason |
|----------|----------|--------|--------|
| NEWS_API_KEY_* | Server | NO | More secure |
| VITE_GNEWS_API_KEY_* | Client | YES | Vite requirement |
| VITE_YT_API_KEY_* | Client | YES | Vite requirement |

---

## 🚀 After Fix

Your app will:
- ✅ Build successfully
- ✅ Deploy to Vercel
- ✅ Load without 404 errors
- ✅ Fetch news from all APIs

---

**Status**: Ready to redeploy!
