import { cookies } from 'next/headers';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'OWNER' | 'ADMIN';
}

const SESSION_COOKIE = 'tlh_admin_session';

// Dynamic in-memory password store (allows changing password inside Admin Panel during session)
let customOwnerPassword: string | null = null;
let customManagerPassword: string | null = null;
let resetOTPStore: { [email: string]: { code: string; expiresAt: number } } = {};

export function setCustomPasswords(ownerPass?: string, managerPass?: string) {
  if (ownerPass) customOwnerPassword = ownerPass.trim();
  if (managerPass) customManagerPassword = managerPass.trim();
}

export function getAdminUsers() {
  const envOwnerEmail = (process.env.ADMIN_OWNER_EMAIL || 'Vikramshekhawat3177@gmail.com').trim().toLowerCase();
  const ownerName = (process.env.ADMIN_OWNER_NAME || 'Vikram Shekhawat (Owner & MD)').trim();
  const ownerPassword = customOwnerPassword || (process.env.ADMIN_OWNER_PASSWORD || 'TLH_Owner_#2026').trim();

  const managerEmail = (process.env.ADMIN_MANAGER_EMAIL || 'admin@theluxuryhub.com').trim().toLowerCase();
  const managerName = (process.env.ADMIN_MANAGER_NAME || 'Showroom Manager').trim();
  const managerPassword = customManagerPassword || (process.env.ADMIN_MANAGER_PASSWORD || 'TLH_Manager_#2026').trim();

  const adminUsers = [
    {
      id: 'user-owner-1',
      email: envOwnerEmail,
      name: ownerName,
      role: 'OWNER' as const,
      password: ownerPassword
    },
    {
      id: 'user-owner-2',
      email: 'vikramshekhawat3177@gmail.com',
      name: 'Vikram Shekhawat (Owner & MD)',
      role: 'OWNER' as const,
      password: ownerPassword
    },
    {
      id: 'user-owner-3',
      email: 'riyachauhan2608@gmail.com',
      name: 'Riya Chauhan (Owner)',
      role: 'OWNER' as const,
      password: ownerPassword
    },
    {
      id: 'user-admin-4',
      email: managerEmail,
      name: managerName,
      role: 'ADMIN' as const,
      password: managerPassword
    }
  ];

  return adminUsers;
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: 'Please enter both email and password.' };
  }
  
  const users = getAdminUsers();
  let userMatch = users.find(u => u.email.toLowerCase() === cleanEmail);

  // If email matches any admin/owner keyword fallback
  if (!userMatch) {
    if (cleanEmail.includes('vikram') || cleanEmail.includes('riya') || cleanEmail.includes('owner') || cleanEmail.includes('admin')) {
      userMatch = users[0];
    }
  }

  if (!userMatch) {
    return { success: false, error: 'Invalid email address or password. Please check your credentials.' };
  }

  // Accept configured password, hardcoded fallback passwords, or env vars
  const validPasswords = [
    userMatch.password.trim(),
    'TLH_Owner_#2026',
    'TLH_Manager_#2026',
    (process.env.ADMIN_OWNER_PASSWORD || '').trim(),
    (process.env.ADMIN_MANAGER_PASSWORD || '').trim()
  ].filter(Boolean);

  const isValidPassword = validPasswords.includes(cleanPassword);

  if (!isValidPassword) {
    return { success: false, error: 'Invalid email address or password. Please check your credentials.' };
  }

  const sessionUser: AdminUser = {
    id: userMatch.id,
    email: userMatch.email,
    name: userMatch.name,
    role: userMatch.role
  };

  // Set HTTP-only secure session cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(sessionUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return { success: true, user: sessionUser };
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string; requireOtp?: boolean }> {
  const cleanEmail = email.trim().toLowerCase();
  const users = getAdminUsers();
  const userMatch = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!userMatch) {
    return {
      success: false,
      message: `No admin account found for "${cleanEmail}". Please check your ADMIN_OWNER_EMAIL setting.`
    };
  }

  // Generate 6-digit verification OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  resetOTPStore[cleanEmail] = {
    code: otpCode,
    expiresAt: Date.now() + 15 * 60 * 1000 // 15 mins
  };

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'THE LUXURY HUB <onboarding@resend.dev>',
          to: [cleanEmail],
          subject: `${otpCode} is your Security Reset Verification Code - THE LUXURY HUB`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #050505; color: #FDFBF7; padding: 30px; border: 1px solid #C5A85C; max-width: 500px; margin: 0 auto;">
              <h2 style="color: #C5A85C; margin-bottom: 5px; font-weight: normal; letter-spacing: 2px;">THE LUXURY HUB</h2>
              <p style="font-size: 11px; color: #C5A85C; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">ADMINISTRATIVE SECURITY PORTAL</p>
              <hr style="border: 0; border-top: 1px solid #333333; margin: 20px 0;" />
              <p style="font-size: 14px; color: #E5E5E5;">Hello <strong>${userMatch.name}</strong>,</p>
              <p style="font-size: 13px; color: #AAAAAA; line-height: 1.5;">You requested to reset your password for your Administrative Portal account.</p>
              
              <div style="background-color: #111111; border: 1px solid #C5A85C; text-align: center; padding: 20px; margin: 25px 0;">
                <p style="margin: 0 0 10px 0; font-size: 10px; color: #888888; letter-spacing: 2px; text-transform: uppercase;">YOUR RESET VERIFICATION CODE</p>
                <div style="font-size: 32px; font-weight: bold; color: #C5A85C; letter-spacing: 6px; font-family: monospace;">${otpCode}</div>
                <p style="margin: 10px 0 0 0; font-size: 11px; color: #666666;">Expires in 15 minutes</p>
              </div>

              <p style="font-size: 12px; color: #888888; line-height: 1.4;">Enter this 6-digit code on the reset form along with your new password to update your credentials securely.</p>
            </div>
          `
        })
      });

      const resData = await res.json();

      if (res.ok) {
        return {
          success: true,
          requireOtp: true,
          message: `Verification code sent to ${cleanEmail}! Please check your inbox and enter the 6-digit code below.`
        };
      } else {
        console.error('Resend API error:', resData);
        return {
          success: false,
          message: `Resend Error: ${resData.message || 'Unable to send email.'}`
        };
      }
    } catch (e: any) {
      console.error('Resend fetch exception:', e);
      return {
        success: false,
        message: `Connection error: ${e.message || 'Failed to reach Resend email service.'}`
      };
    }
  }

  return {
    success: true,
    requireOtp: true,
    message: `Account verified for ${cleanEmail}. Verification code: ${otpCode}. Enter the code and your new password below.`
  };
}

export async function confirmPasswordReset(email: string, code: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();
  const cleanPassword = newPassword.trim();

  if (!cleanCode || !cleanPassword) {
    return { success: false, error: 'Please enter both the verification code and your new password.' };
  }

  if (cleanPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const stored = resetOTPStore[cleanEmail];
  if (!stored || stored.code !== cleanCode || Date.now() > stored.expiresAt) {
    return { success: false, error: 'Invalid or expired verification code. Please request a new code.' };
  }

  const users = getAdminUsers();
  const userMatch = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!userMatch) {
    return { success: false, error: 'Admin account not found.' };
  }

  if (userMatch.role === 'OWNER') {
    customOwnerPassword = cleanPassword;
  } else {
    customManagerPassword = cleanPassword;
  }

  delete resetOTPStore[cleanEmail];

  return loginAdmin(cleanEmail, cleanPassword);
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);
    
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const user: AdminUser = JSON.parse(sessionCookie.value);
    return user;
  } catch (e) {
    return null;
  }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
