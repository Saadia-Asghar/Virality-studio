# 🚀 Virality Studio - Setup Guide

## ✅ Issues Fixed

All TypeScript errors have been resolved:
1. ✅ **HookLibrary.tsx**: Added missing `Plus` icon import from lucide-react
2. ✅ **firebase.ts**: Fixed `import.meta.env` TypeScript errors by adding Vite client types

## 📋 What You Need to Do to Make It Fully Functional

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Firebase

1. **Create a Firebase Project** (if you haven't already):
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add project" or select an existing project
   - Follow the setup wizard

2. **Get Your Firebase Configuration**:
   - In Firebase Console, go to **Project Settings** (gear icon)
   - Scroll down to "Your apps" section
   - Click the web icon `</>` to add a web app (or select existing)
   - Copy the configuration values

3. **Create `.env` File**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and replace the placeholder values with your actual Firebase config

### Step 3: Set Up Google Gemini AI

1. **Get Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Copy the API key

2. **Add to `.env` File**:
   - Open `.env` and add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_gemini_api_key
     ```

### Step 4: Enable Firebase Services

In your Firebase Console, enable these services:

1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable the authentication methods you want (Email/Password, Google, etc.)

2. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose production mode or test mode
   - Select a location

3. **Storage**:
   - Go to Storage
   - Click "Get started"
   - Set up security rules

### Step 5: Run the Application

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173` (or another port shown in terminal)

## 🔒 Security Notes

- ✅ `.env` is already in `.gitignore` - your secrets won't be committed
- ⚠️ Never commit your `.env` file to version control
- ⚠️ Keep your API keys secure
- ✅ Use Firebase security rules to protect your database

## 📁 Environment Variables Template

Your `.env` file should look like this:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=AIzaSyD...
```

## 🐛 Troubleshooting

### If you see "Firebase: Error (auth/invalid-api-key)"
- Check that your `VITE_FIREBASE_API_KEY` is correct in `.env`
- Make sure you've restarted the dev server after creating `.env`

### If you see "API key not valid"
- Verify your Gemini API key is correct
- Check that the API is enabled in Google Cloud Console

### If TypeScript errors persist
- Try restarting your IDE/editor
- Run `npm run build` to check for build errors

## 🎯 Next Steps

Once everything is running:
1. Test the authentication flow
2. Try generating content with the AI features
3. Explore the Hook Library
4. Customize the platform settings

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Google Gemini API Docs](https://ai.google.dev/docs)
