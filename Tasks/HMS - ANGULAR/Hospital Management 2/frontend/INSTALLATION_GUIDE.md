# Installation Guide

## ✅ All Files Created Successfully!

Your Angular frontend project is now complete with 179 files including:
- All TypeScript components
- All HTML templates  
- Complete NgRx store
- Configuration files (package.json, tsconfig.json, angular.json)

---

## 📦 Install Dependencies

### Option 1: Using Command Prompt (CMD) - RECOMMENDED

1. Open **Command Prompt** (not PowerShell)
2. Navigate to the frontend directory:
   ```cmd
   cd "C:\Users\arunkumar.r7\OneDrive - Mphasis\Learnings\TASKS\Hospital Management 2\frontend"
   ```
3. Run npm install:
   ```cmd
   npm install
   ```

### Option 2: Using PowerShell (if you have execution policy set)

1. Open PowerShell as Administrator
2. Set execution policy (one-time):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Navigate to frontend directory and run:
   ```powershell
   npm install
   ```

### Option 3: Using Git Bash or WSL

```bash
cd frontend
npm install
```

---

## 🚀 After Installation

### 1. Start Development Server

```cmd
npm start
```

The application will be available at: `http://localhost:4200`

### 2. Build for Production

```cmd
npm run build
```

Output will be in `dist/hospital-management-frontend/`

---

## 📋 What Gets Installed

The following packages will be installed (from package.json):

### Angular Core (v18)
- @angular/animations
- @angular/common
- @angular/compiler
- @angular/core
- @angular/forms
- @angular/platform-browser
- @angular/platform-browser-dynamic
- @angular/router

### NgRx State Management (v18)
- @ngrx/store
- @ngrx/effects
- @ngrx/store-devtools

### Other Dependencies
- rxjs (v7.8.0)
- zone.js (v0.14.0)
- tslib (v2.6.0)

### Development Dependencies
- @angular-devkit/build-angular
- @angular/cli
- @angular/compiler-cli
- @types/node
- typescript (v5.4.0)

**Total Installation Size**: Approximately 400-500 MB

---

## ⚠️ Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Install Node.js from https://nodejs.org/ (LTS version recommended)

### Issue: "PowerShell execution policy error"
**Solution**: Use Command Prompt (CMD) instead, or set execution policy as shown above

### Issue: "ENOENT: no such file or directory"
**Solution**: Make sure you're in the frontend directory:
```cmd
cd frontend
dir
```
You should see `package.json` in the list

### Issue: Installation fails or hangs
**Solution**: 
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` folder if it exists
3. Try again: `npm install`

### Issue: Port 4200 already in use
**Solution**: 
- Stop other Angular apps running on port 4200
- Or use a different port: `ng serve --port 4300`

---

## 🔗 Backend Connection

The frontend is configured to connect to the backend at:
```
http://localhost:8080
```

Make sure your Spring Boot backend is running before testing the frontend.

---

## 📁 Project Structure Verification

After installation, your structure should look like:

```
frontend/
├── node_modules/          ← Created after npm install
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── store/
│   │   ├── features/
│   │   ├── shared/
│   │   └── layouts/
│   ├── assets/
│   ├── environments/
│   └── styles/
├── angular.json           ✅
├── package.json           ✅
├── tsconfig.json          ✅
├── tsconfig.app.json      ✅
├── .gitignore             ✅
└── README.md              ✅
```

---

## ✅ Next Steps After Installation

1. **Install dependencies** (you're here!)
2. **Start backend**: Run your Spring Boot application on port 8080
3. **Start frontend**: Run `npm start` in the frontend directory
4. **Open browser**: Navigate to `http://localhost:4200`
5. **Test login**: Try logging in with different roles (Admin, Doctor, Patient, Nurse)

---

## 🎉 You're Ready!

Once `npm install` completes successfully, you can start developing!

Run `npm start` and your Hospital Management System frontend will be live!
