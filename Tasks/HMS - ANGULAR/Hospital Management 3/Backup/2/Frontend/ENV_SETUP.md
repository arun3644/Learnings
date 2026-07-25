# Environment Variables Setup

This project uses a single `.env` file for configuration instead of hardcoded TypeScript environment files.

## Files Created

- `.env` - Environment variables (not committed to git)
- `.env.example` - Example template (committed to git)
- `src/vite-env.d.ts` - TypeScript definitions for environment variables

## Setup Instructions

### 1. Create Your Local .env File

Copy the example file:
```bash
cp .env.example .env
```

### 2. Update Variables

Edit `.env` with your settings:

**For Development:**
```env
VITE_USE_API=true
VITE_API_BASE_URL=http://localhost:3000
```

**For Production:**
```env
VITE_USE_API=true
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/prod
```

## Available Environment Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `VITE_USE_API` | boolean | Use API or local JSON | `true` or `false` |
| `VITE_API_BASE_URL` | string | Backend API URL | `http://localhost:3000` |

## How It Works

The `src/app/environments/environment.ts` file now reads from environment variables:

```typescript
export const environment = {
  useApi: (import.meta.env.VITE_USE_API === 'true'),
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
};
```

## Running the Application

### Development Mode
```bash
npm start
# Uses .env file
```

### Production Build
```bash
# Update .env with production values first, then:
npm run build
```

## Files Affected by This Change

1. **Created:**
   - `.env`
   - `.env.example`
   - `src/vite-env.d.ts`
   - `.gitignore`

2. **Modified:**
   - `src/app/environments/environment.ts` - Now reads from env variables
   - `tsconfig.json` - Added vite/client types

3. **No Changes Needed:**
   - `src/app/services/api.service.ts` - Still imports from environment.ts
   - `src/app/services/auth.service.ts` - Still imports from environment.ts
   - All components - No changes required

## Switching Between Development and Production

Simply update the `.env` file:

**Development:**
```env
VITE_USE_API=true
VITE_API_BASE_URL=http://localhost:3000
```

**Production:**
```env
VITE_USE_API=true
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/prod
```

Then restart your dev server or rebuild.

## Security Notes

⚠️ **Important:**
- `.env` file is in `.gitignore` and should NEVER be committed
- Only commit `.env.example` as a template
- Sensitive data (API keys, secrets) should be in `.env`, not in code

## Troubleshooting

### Environment variables not loading?
1. Restart the dev server after changing `.env`
2. Make sure variable names start with `VITE_`
3. Check that `.env` file is in the project root

### TypeScript errors about import.meta.env?
1. Make sure `src/vite-env.d.ts` exists
2. Check `tsconfig.json` includes `"types": ["vite/client"]`
3. Restart your IDE/editor

## Adding New Environment Variables

1. Add to `.env.example`:
   ```env
   VITE_NEW_VARIABLE=default_value
   ```

2. Add to `src/vite-env.d.ts`:
   ```typescript
   interface ImportMetaEnv {
     readonly VITE_NEW_VARIABLE: string;
   }
   ```

3. Use in `environment.ts`:
   ```typescript
   export const environment = {
     newVariable: import.meta.env.VITE_NEW_VARIABLE
   };
   ```
