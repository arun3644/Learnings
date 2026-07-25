# 🚀 Quick Start Guide

## ⚠️ IMPORTANT: Use Command Prompt (CMD), NOT PowerShell!

PowerShell has script execution disabled on your system. Use CMD instead.

---

## 📝 Available Commands

### Start Development Server
```cmd
npm start
```
This runs `ng serve` and starts the app at `http://localhost:4200`

### Build for Production
```cmd
npm run build
```

### Run Tests
```cmd
npm test
```

### Watch Mode (Auto-rebuild)
```cmd
npm run watch
```

---

## 🎯 How to Run the Application

### Step 1: Open Command Prompt (CMD)
- Press `Windows + R`
- Type `cmd`
- Press Enter

### Step 2: Navigate to Frontend Directory
```cmd
cd "C:\Users\arunkumar.r7\OneDrive - Mphasis\Learnings\TASKS\Hospital Management 2\frontend"
```

### Step 3: Start the Application
```cmd
npm start
```

### Step 4: Open Browser
Navigate to: `http://localhost:4200`

---

## ✅ What You Should See

When you run `npm start`, you should see:
```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **

✔ Compiled successfully.
```

---

## 🔗 Backend Connection

Make sure your Spring Boot backend is running on `http://localhost:8080` before using the frontend.

To start the backend:
```cmd
cd Backend
./gradlew bootRun
```
Or if using the batch file:
```cmd
cd Backend
clean-build.bat
```

---

## 📋 Common Commands Reference

| Command | What it does |
|---------|-------------|
| `npm start` | Start development server (port 4200) |
| `npm run build` | Build for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests |
| `npm run lint` | Lint the code |

---

## ⚠️ Troubleshooting

### "npm is not recognized"
Install Node.js from https://nodejs.org/

### "PowerShell execution policy error"
**Solution**: Use Command Prompt (CMD) instead!

### "Port 4200 is already in use"
**Solution**: 
- Stop other Angular apps
- Or use: `ng serve --port 4300`

### "Cannot find module '@angular/core'"
**Solution**: Run `npm install` first

---

## 🎉 You're All Set!

Just run `npm start` in CMD and you're good to go!
