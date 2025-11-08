
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { type ServiceAccount } from 'firebase-admin';

// --------------------------------------------------------------------------
// 🔥 SECURE FIX: Read Service Account from Vercel Environment Secret 🔥
// --------------------------------------------------------------------------


// 2. Access the secure secret you set on Vercel
const serviceAccountJsonString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

// 3. Define the serviceAccount object
let serviceAccount: ServiceAccount;

if (!serviceAccountJsonString) {
    // This check is important for the build to fail early if the secret is missing
    throw new Error("FATAL ERROR: FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set on Vercel.");
}

try {
    // 4. Parse the JSON string into the required ServiceAccount object
    serviceAccount = JSON.parse(serviceAccountJsonString) as ServiceAccount;
} catch (error) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_JSON:", error);
    throw new Error("FATAL ERROR: Failed to parse Firebase Service Account JSON secret.");
}


// --- Updated Initialization Logic ---

const appName = "server-admin";
let adminApp;

// Check if an app with the name "server-admin" has already been initialized
if (getApps().length === 0 || getApps().find(app => app.name === appName) === undefined) {
  
  // If it doesn't exist, initialize the app
  adminApp = initializeApp({
    // Use the parsed serviceAccount object here
    credential: cert(serviceAccount), 
  }, appName);
  console.log(`Firebase Admin app '${appName}' initialized.`);
  
} else {
  // If it already exists, retrieve the existing instance
  adminApp = getApps().find(app => app.name === appName);
  console.log(`Firebase Admin app '${appName}' retrieved.`);
}

// Auth instance for SERVER-SIDE operations (like verifyIdToken)
export const adminAuth = getAuth(adminApp!);

// Firestore instance for SERVER-SIDE operations
export const adminDb = getFirestore(adminApp!);