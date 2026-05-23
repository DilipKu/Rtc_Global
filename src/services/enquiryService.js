import api from './api';

export const enquiryService = {
  submitEnquiry: async (enquiryData) => {
    // Map frontend fields to backend DTO
    const dto = {
      contactName: enquiryData.name,
      companyName: enquiryData.businessName,
      email: enquiryData.email || `${enquiryData.phone}@whatsapp.com`, // Default email if not provided
      phone: enquiryData.phone,
      subject: `Inquiry for ${enquiryData.itemOfInterest || 'General'}`,
      message: `${enquiryData.message}\n\nQuantity: ${enquiryData.quantity}`,
      source: 'Website'
    };
    return api.post('/enquiries', dto);
  }
};

export default enquiryService;
