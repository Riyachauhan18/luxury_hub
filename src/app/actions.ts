'use server';

import { 
  createEnquiry, 
  updateEnquiryStatus,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  createBrand,
  updateBrand,
  deleteBrand,
  createCollection,
  updateCollection,
  deleteCollection,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  updateSettings
} from '../lib/db';
import { 
  Enquiry, Product, ProductVariant, Category, Brand, 
  Collection, GalleryImage, TeamMember, FAQ, WebsiteSettings 
} from '../lib/types';
import { getAdminSession } from '../lib/auth';

/**
 * Server-side authorization helpers
 */
async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || (session.role !== 'OWNER' && session.role !== 'ADMIN')) {
    throw new Error('Unauthorized: Admin session required');
  }
  return session;
}

async function requireOwner() {
  const session = await getAdminSession();
  if (!session || session.role !== 'OWNER') {
    throw new Error('Unauthorized: Owner session required');
  }
  return session;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  items?: {
    product_id: string | null;
    product_name: string;
    product_code: string | null;
    quantity: number;
    variant_finish: string | null;
  }[];
}

/**
 * Server Action to submit a contact or product enquiry list form (Public)
 */
export async function submitContactForm(data: ContactFormData) {
  try {
    if (!data.name || data.name.trim() === '') {
      return { success: false, error: 'Customer name is required.' };
    }
    if (!data.phone || data.phone.trim() === '') {
      return { success: false, error: 'Customer phone number is required.' };
    }
    if (!data.message || data.message.trim() === '') {
      return { success: false, error: 'Message description is required.' };
    }

    const fullMessage = data.subject 
      ? `[Subject: ${data.subject}]\n\n${data.message}`
      : data.message;

    const newEnquiry = await createEnquiry({
      customer_name: data.name.trim(),
      customer_email: data.email ? data.email.trim() : null,
      customer_phone: data.phone.trim(),
      message: fullMessage.trim(),
      status: 'new',
      items: data.items || []
    });

    // Auto-sync payload to Google Sheets Webhook if URL is configured
    const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetsWebhookUrl) {
      try {
        const productListStr = (data.items || []).map(i => `${i.product_name} (Qty: ${i.quantity})`).join(', ');
        fetch(googleSheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name.trim(),
            phone: data.phone.trim(),
            email: data.email ? data.email.trim() : 'N/A',
            products: productListStr || 'General Enquiry',
            message: fullMessage.trim()
          })
        }).catch(err => console.error('Google Sheets sync error:', err));
      } catch (err) {
        console.error('Google Sheets fetch trigger error:', err);
      }
    }

    return { 
      success: true, 
      enquiryId: newEnquiry.id,
      message: 'Enquiry submitted successfully. Our team will contact you shortly!' 
    };
  } catch (e: any) {
    console.error('submitContactForm Server Action error:', e);
    return { success: false, error: 'Failed to process request. Please try again later.' };
  }
}

/**
 * Server Action to update an enquiry status (Admin only)
 */
export async function updateEnquiryStatusAction(id: string, status: Enquiry['status']) {
  try {
    await requireAdmin();
    const success = await updateEnquiryStatus(id, status);
    return { success };
  } catch (e: any) {
    console.error('updateEnquiryStatusAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update enquiry status' };
  }
}

/**
 * Products Actions
 */
export async function createProductAction(
  product: Omit<Product, 'id' | 'images' | 'variants'>,
  images: string[],
  variants: Omit<ProductVariant, 'id' | 'product_id'>[]
) {
  try {
    await requireAdmin();
    const res = await createProduct(product, images, variants);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createProductAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create product' };
  }
}

export async function updateProductAction(
  id: string,
  product: Partial<Product>,
  images?: string[],
  variants?: Omit<ProductVariant, 'id' | 'product_id'>[]
) {
  try {
    await requireAdmin();
    const res = await updateProduct(id, product, images, variants);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateProductAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update product' };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteProduct(id);
    return { success };
  } catch (e: any) {
    console.error('deleteProductAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete product' };
  }
}

/**
 * Categories Actions
 */
export async function createCategoryAction(category: Omit<Category, 'id'>) {
  try {
    await requireAdmin();
    const res = await createCategory(category);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createCategoryAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create category' };
  }
}

export async function updateCategoryAction(id: string, category: Partial<Category>) {
  try {
    await requireAdmin();
    const res = await updateCategory(id, category);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateCategoryAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update category' };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteCategory(id);
    return { success };
  } catch (e: any) {
    console.error('deleteCategoryAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete category' };
  }
}

/**
 * Brands Actions
 */
export async function createBrandAction(brand: Omit<Brand, 'id'>) {
  try {
    await requireAdmin();
    const res = await createBrand(brand);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createBrandAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create brand' };
  }
}

export async function updateBrandAction(id: string, brand: Partial<Brand>) {
  try {
    await requireAdmin();
    const res = await updateBrand(id, brand);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateBrandAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update brand' };
  }
}

export async function deleteBrandAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteBrand(id);
    return { success };
  } catch (e: any) {
    console.error('deleteBrandAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete brand' };
  }
}

/**
 * Collections Actions
 */
export async function createCollectionAction(collection: Omit<Collection, 'id'>) {
  try {
    await requireAdmin();
    const res = await createCollection(collection);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createCollectionAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create collection' };
  }
}

export async function updateCollectionAction(id: string, collection: Partial<Collection>) {
  try {
    await requireAdmin();
    const res = await updateCollection(id, collection);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateCollectionAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update collection' };
  }
}

export async function deleteCollectionAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteCollection(id);
    return { success };
  } catch (e: any) {
    console.error('deleteCollectionAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete collection' };
  }
}

/**
 * Gallery Actions
 */
export async function createGalleryImageAction(img: Omit<GalleryImage, 'id'>) {
  try {
    await requireAdmin();
    const res = await createGalleryImage(img);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createGalleryImageAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create gallery image' };
  }
}

export async function updateGalleryImageAction(id: string, img: Partial<GalleryImage>) {
  try {
    await requireAdmin();
    const res = await updateGalleryImage(id, img);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateGalleryImageAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update gallery image' };
  }
}

export async function deleteGalleryImageAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteGalleryImage(id);
    return { success };
  } catch (e: any) {
    console.error('deleteGalleryImageAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete gallery image' };
  }
}

/**
 * Team Actions
 */
export async function createTeamMemberAction(member: Omit<TeamMember, 'id'>) {
  try {
    await requireAdmin();
    const res = await createTeamMember(member);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createTeamMemberAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create team member' };
  }
}

export async function updateTeamMemberAction(id: string, member: Partial<TeamMember>) {
  try {
    await requireAdmin();
    const res = await updateTeamMember(id, member);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateTeamMemberAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update team member' };
  }
}

export async function deleteTeamMemberAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteTeamMember(id);
    return { success };
  } catch (e: any) {
    console.error('deleteTeamMemberAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete team member' };
  }
}

/**
 * FAQ Actions
 */
export async function createFAQAction(faq: Omit<FAQ, 'id'>) {
  try {
    await requireAdmin();
    const res = await createFAQ(faq);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('createFAQAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to create FAQ' };
  }
}

export async function updateFAQAction(id: string, faq: Partial<FAQ>) {
  try {
    await requireAdmin();
    const res = await updateFAQ(id, faq);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateFAQAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update FAQ' };
  }
}

export async function deleteFAQAction(id: string) {
  try {
    await requireAdmin();
    const success = await deleteFAQ(id);
    return { success };
  } catch (e: any) {
    console.error('deleteFAQAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to delete FAQ' };
  }
}

/**
 * Website Settings Action (OWNER ONLY)
 */
export async function updateSettingsAction(settings: WebsiteSettings) {
  try {
    await requireOwner();
    const { updateSettings } = await import('../lib/db');
    const res = await updateSettings(settings);
    return { success: true, data: res };
  } catch (e: any) {
    console.error('updateSettingsAction error:', e.message || e);
    return { success: false, error: e.message || 'Failed to update settings' };
  }
}

/**
 * Auth Actions
 */
export async function loginAdminAction(email: string, password: string) {
  const { loginAdmin } = await import('../lib/auth');
  return loginAdmin(email, password);
}

export async function requestPasswordResetAction(email: string) {
  const { requestPasswordReset } = await import('../lib/auth');
  return requestPasswordReset(email);
}

export async function confirmPasswordResetAction(email: string, code: string, newPassword: string) {
  const { confirmPasswordReset } = await import('../lib/auth');
  return confirmPasswordReset(email, code, newPassword);
}

export async function updateAdminPasswordsAction(ownerPassword?: string, managerPassword?: string) {
  try {
    await requireOwner();
    const { setCustomPasswords } = await import('../lib/auth');
    setCustomPasswords(ownerPassword, managerPassword);
    return { success: true, message: 'Admin passwords updated successfully.' };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to update passwords.' };
  }
}

export async function logoutAdminAction() {
  const { logoutAdmin } = await import('../lib/auth');
  return logoutAdmin();
}

