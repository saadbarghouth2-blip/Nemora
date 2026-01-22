import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

const emptyOrderDetails = {
  name: '',
  email: '',
  phone: '',
  address: '',
  brandName: '',
  brandWebsite: '',
  brandSocial: '',
  quantity: '',
  shape: 'all',
  technique: 'all',
  embroidery: 'all',
  size: '',
  color: '',
  notes: ''
};

type OrderField = keyof typeof emptyOrderDetails;

export const Contact = () => {
  const { language, t, dir } = useLanguage();
  const [searchParams] = useSearchParams();
  const isAr = language === 'ar' || language === 'eg';

  const [uploadName, setUploadName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [statusTone, setStatusTone] = useState<'success' | 'error' | 'info'>('info');
  const [statusKey, setStatusKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewIsImage, setPreviewIsImage] = useState(false);
  const [orderDetails, setOrderDetails] = useState(emptyOrderDetails);
  const [formErrors, setFormErrors] = useState<Partial<Record<OrderField, string>>>({});

  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const cloudUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
  const cloudUploadUrl = cloudName ? `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload` : '';
  const emailSubject = orderDetails.name
    ? `${isAr ? 'طلب جديد' : 'New order'} - ${orderDetails.name}`
    : (isAr ? 'طلب جديد' : 'New order');

  const requiredFields: OrderField[] = ['name', 'email', 'phone', 'address', 'brandName', 'size'];

  const shapeOptions = [
    { id: 'all', label: isAr ? 'كل الاشكال' : 'All Shapes' },
    { id: 'tshirt', label: isAr ? 'تيشيرت' : 'T-Shirt' },
    { id: 'hoodie', label: isAr ? 'هودي' : 'Hoodie' },
    { id: 'polo', label: isAr ? 'بولو' : 'Polo' },
    { id: 'sweatshirt', label: isAr ? 'سويت شيرت' : 'Sweatshirt' },
    { id: 'jacket', label: isAr ? 'جاكيت' : 'Jacket' }
  ];

  const techniqueOptions = [
    { id: 'all', label: isAr ? 'كل التقنيات' : 'All Techniques' },
    { id: 'print', label: isAr ? 'طباعة' : 'Printing' },
    { id: 'embroidery', label: isAr ? 'تطريز' : 'Embroidery' },
    { id: 'both', label: isAr ? 'طباعة + تطريز' : 'Print + Embroidery' }
  ];

  const embroideryOptions = [
    { id: 'all', label: isAr ? 'كل التطريز' : 'All Embroidery' },
    { id: 'logo', label: isAr ? 'لوجو' : 'Logo' },
    { id: 'monogram', label: isAr ? 'مونوجرام' : 'Monogram' },
    { id: 'patch', label: isAr ? 'باتش' : 'Patch' },
    { id: 'text', label: isAr ? 'نص' : 'Text' }
  ];

  const sizeOptions = [
    { id: '', label: isAr ? 'اختار المقاس' : 'Select size' },
    { id: 'XS', label: 'XS' },
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' },
    { id: '2XL', label: '2XL' },
    { id: '3XL', label: '3XL' },
    { id: 'custom', label: isAr ? 'مقاس خاص' : 'Custom' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      const elements = ref.current.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const shape = searchParams.get('shape') || 'all';
    const technique = searchParams.get('technique') || 'all';
    const embroidery = searchParams.get('embroidery') || 'all';
    setOrderDetails((prev) => ({
      ...prev,
      shape,
      technique,
      embroidery
    }));
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateField = (field: OrderField, value: string) => {
    const trimmed = value.trim();
    const urlPattern = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost|\d{1,3}(\.\d{1,3}){3})(:\d{2,5})?([/?#].*)?$/;
    if (field === 'name') {
      return trimmed ? '' : (isAr ? 'الاسم مطلوب.' : 'Name is required.');
    }
    if (field === 'email') {
      if (!trimmed) return isAr ? 'البريد الالكتروني مطلوب.' : 'Email is required.';
      const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed);
      return isValid ? '' : (isAr ? 'البريد الالكتروني غير صحيح.' : 'Email is invalid.');
    }
    if (field === 'phone') {
      if (!trimmed) return isAr ? 'رقم الموبايل مطلوب.' : 'Phone is required.';
      const isValid = /^[0-9+\s()-]{7,}$/.test(trimmed);
      return isValid ? '' : (isAr ? 'رقم الموبايل غير صحيح.' : 'Phone number is invalid.');
    }
    if (field === 'address') {
      return trimmed ? '' : (isAr ? 'العنوان مطلوب.' : 'Address is required.');
    }
    if (field === 'brandName') {
      return trimmed ? '' : (isAr ? 'اسم البراند مطلوب.' : 'Brand name is required.');
    }
    if (field === 'brandWebsite') {
      if (!trimmed) return '';
      return urlPattern.test(trimmed)
        ? ''
        : (isAr ? 'لينك الموقع غير صحيح.' : 'Website link is invalid.');
    }
    if (field === 'brandSocial') {
      if (!trimmed) return '';
      const socialHandlePattern = /^@?[\w.]{2,}$/;
      const isValid = socialHandlePattern.test(trimmed) || urlPattern.test(trimmed);
      return isValid ? '' : (isAr ? 'لينك السوشيال غير صحيح.' : 'Social link is invalid.');
    }
    if (field === 'quantity') {
      if (!trimmed) return '';
      const isValid = /^\d+$/.test(trimmed) && Number(trimmed) > 0;
      return isValid ? '' : (isAr ? 'الكمية لازم تكون رقم موجب.' : 'Quantity must be a positive number.');
    }
    if (field === 'size') {
      return trimmed ? '' : (isAr ? 'من فضلك اختر المقاس.' : 'Please select a size.');
    }
    return '';
  };

  const clearFieldError = (field: OrderField) => {
    setFormErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const setFieldError = (field: OrderField, message: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateAllFields = () => {
    const nextErrors: Partial<Record<OrderField, string>> = {};
    requiredFields.forEach((field) => {
      const message = validateField(field, orderDetails[field]);
      if (message) nextErrors[field] = message;
    });
    ['brandWebsite', 'brandSocial'].forEach((field) => {
      const message = validateField(field as OrderField, orderDetails[field as OrderField]);
      if (message) nextErrors[field as OrderField] = message;
    });
    const quantityMessage = validateField('quantity', orderDetails.quantity);
    if (quantityMessage) nextErrors.quantity = quantityMessage;
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldBlur = (field: OrderField) => {
    const message = validateField(field, orderDetails[field]);
    if (message) {
      setFieldError(field, message);
      return;
    }
    clearFieldError(field);
  };

  const handleOrderChange = (field: OrderField, value: string) => {
    setOrderDetails((prev) => ({ ...prev, [field]: value }));
    setOrderStatus('');
    setStatusTone('info');
    if (formErrors[field]) {
      const message = validateField(field, value);
      if (message) {
        setFieldError(field, message);
        return;
      }
      clearFieldError(field);
    }
  };

  const showOrderStatus = (message: string, tone: 'success' | 'error' | 'info') => {
    setOrderStatus(message);
    setStatusTone(tone);
    setStatusKey((prev) => prev + 1);
  };

  const handleUploadChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadName(file ? file.name : '');
    setUploadStatus('');
    setOrderStatus('');
    setUploadedUrl('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    setPreviewIsImage(false);
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setPreviewIsImage(file.type.startsWith('image/'));

    if (!cloudName || !cloudUploadPreset || !cloudUploadUrl) {
      setUploadStatus(isAr ? 'رفع الملفات غير مفعّل.' : 'File upload is not configured.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus(isAr ? 'جاري رفع الملف...' : 'Uploading file...');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudUploadPreset);
      const response = await fetch(cloudUploadUrl, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();
      const url = data.secure_url || data.url || '';
      if (!url) {
        throw new Error('Upload failed');
      }
      setUploadedUrl(url);
      setUploadStatus(isAr ? 'تم رفع الملف بنجاح.' : 'File uploaded successfully.');
    } catch (error) {
      setUploadStatus(isAr ? 'فشل رفع الملف. حاول مرة اخرى.' : 'Upload failed. Try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateAllFields();
    if (isUploading) {
      setUploadStatus(isAr ? 'جاري رفع الملف...' : 'Uploading file...');
      return;
    }
    if (!isValid) {
      showOrderStatus(isAr ? 'راجع الحقول المظللة وسبب الخطأ.' : 'Please fix the highlighted fields.', 'error');
      return;
    }
    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      showOrderStatus(isAr ? 'خدمة الايميل غير مفعلة. تأكد من اعدادات EmailJS.' : 'Email service is not configured. Check EmailJS settings.', 'error');
      return;
    }
    if (!formRef.current) {
      showOrderStatus(isAr ? 'حصل خطأ في ارسال النموذج.' : 'Form reference is missing.', 'error');
      return;
    }
    try {
      setIsSubmitting(true);
      await emailjs.sendForm(emailServiceId, emailTemplateId, formRef.current, {
        publicKey: emailPublicKey
      });
      showOrderStatus(isAr ? 'تم ارسال طلبك وسيتم التواصل معك قريبا.' : 'Your request has been sent. We will contact you soon.', 'success');
      setShowSuccess(true);
      setUploadStatus('');
      setUploadName('');
      setUploadedUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl('');
      setPreviewIsImage(false);
      setFormErrors({});
      setOrderDetails((prev) => ({
        ...emptyOrderDetails,
        shape: prev.shape,
        technique: prev.technique,
        embroidery: prev.embroidery
      }));
    } catch (error) {
      showOrderStatus(isAr ? 'فشل الارسال. حاول مرة اخرى.' : 'Send failed. Try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isSubmitting || isUploading;
  const submitLabel = isUploading
    ? (isAr ? 'جاري رفع الملف...' : 'Uploading...')
    : (isSubmitting ? (isAr ? 'جاري الارسال...' : 'Sending...') : (isAr ? 'ارسال الطلب' : 'Send Order'));

  return (
    <div className="contact-page" dir={dir} ref={ref} style={{ paddingBottom: '80px' }}>
      <section className="contact-hero fade-in">
        <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>{isAr ? 'تواصل معنا' : t('getInTouch')}</h1>
        <p>
          {isAr ? 'عندك سؤال أو محتاج مساعدة؟ احنا حابين نسمع منك.' : 'Have a question or need help? We would love to hear from you.'}
        </p>
      </section>

      <div className="contact-content">
        <div className="contact-panel fade-in">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <Mail size={24} />
              </div>
              <div>
                <h3>{isAr ? 'الإيميل' : 'Email'}</h3>
                <p>info@nemora.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <Phone size={24} />
              </div>
              <div>
                <h3>{isAr ? 'التليفون' : 'Phone'}</h3>
                <p>+20 106 743 1264</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <MapPin size={24} />
              </div>
              <div>
                <h3>{isAr ? 'العنوان' : 'Address'}</h3>
                <p>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</p>
              </div>
            </div>
          </div>
          <div className="contact-note">
            {isAr ? 'نرد خلال 24-48 ساعة بحد اقصى.' : 'Replies within 24-48 hours.'}
          </div>
        </div>

        <form className={`contact-form fade-in${showSuccess ? ' form-locked' : ''}`} onSubmit={handleSubmit} ref={formRef}>
          <input type="hidden" name="title" value={emailSubject} />
          <input type="hidden" name="fileUrl" value={uploadedUrl} />
          <div className="contact-form-body">
          <div className="contact-form-header">
            <h2>{isAr ? 'تفاصيل الطلب' : 'Order Details'}</h2>
            <p>{isAr ? 'ارفع التصميم وسيب كل التفاصيل عشان نوصل لك بسرعة' : 'Upload your design and add the brand details for a fast response.'}</p>
          </div>
          <div className="form-group">
            <label htmlFor="design">
              {isAr ? 'ارفع التصميم' : 'Upload your design'} <span className="optional-tag">{isAr ? 'اختياري' : 'Optional'}</span>
            </label>
            <div className="contact-upload">
              <div className="upload-actions">
                <label className="btn-primary upload-button">
                  {isAr ? 'اختيار ملف' : 'Choose File'}
                  <input
                    className="upload-input"
                    type="file"
                    id="design"
                    accept="image/*,.pdf"
                    onChange={handleUploadChange}
                    ref={fileInputRef}
                  />
                </label>
                <span className="upload-filename">
                  {uploadName || (isAr ? 'لم يتم اختيار ملف' : 'No file chosen')}
                </span>
              </div>
              <small className="contact-hint">
                {isAr ? 'ابعت اللوجو او التصميم المبدئي وسنراجع التفاصيل.' : 'Send the logo or draft sketch and we will match the style.'}
              </small>
              {uploadStatus && <div className="contact-status">{uploadStatus}</div>}
              {previewUrl && (
                <div className="upload-preview">
                  {previewIsImage ? (
                    <img src={previewUrl} alt="Design preview" />
                  ) : (
                    <a href={previewUrl} target="_blank" rel="noreferrer">
                      {isAr ? 'معاينة التصميم' : 'Preview file'}
                    </a>
                  )}
                  {uploadedUrl && (
                    <a className="upload-link" href={uploadedUrl} target="_blank" rel="noreferrer">
                      {isAr ? 'فتح الملف المرفوع' : 'Open uploaded file'}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">
                {isAr ? 'الاسم' : 'Name'} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={orderDetails.name}
                onChange={(e) => handleOrderChange('name', e.target.value)}
                onBlur={() => handleFieldBlur('name')}
                className={formErrors.name ? 'input-error' : undefined}
              />
              {formErrors.name && <div className="field-error">{formErrors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">
                {isAr ? 'البريد الالكتروني' : 'Email'} <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={orderDetails.email}
                onChange={(e) => handleOrderChange('email', e.target.value)}
                dir="ltr"
                placeholder={isAr ? 'مثال: name@gmail.com' : 'e.g. name@gmail.com'}
                autoComplete="email"
                onBlur={() => handleFieldBlur('email')}
                className={formErrors.email ? 'input-error' : undefined}
              />
              {formErrors.email && <div className="field-error">{formErrors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                {isAr ? 'رقم الموبايل' : 'Phone'} <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={orderDetails.phone}
                onChange={(e) => handleOrderChange('phone', e.target.value)}
                dir="ltr"
                inputMode="numeric"
                autoComplete="tel"
                placeholder={isAr ? 'مثال: 01012345678' : 'e.g. 01012345678'}
                pattern="[0-9+\\s()-]{7,}"
                onBlur={() => handleFieldBlur('phone')}
                className={formErrors.phone ? 'input-error' : undefined}
              />
              {formErrors.phone && <div className="field-error">{formErrors.phone}</div>}
            </div>
            <div className="form-group full">
              <label htmlFor="address">
                {isAr ? 'العنوان' : 'Address'} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={orderDetails.address}
                onChange={(e) => handleOrderChange('address', e.target.value)}
                onBlur={() => handleFieldBlur('address')}
                className={formErrors.address ? 'input-error' : undefined}
              />
              {formErrors.address && <div className="field-error">{formErrors.address}</div>}
            </div>
          </div>
          <div className="section-divider">
            <span>{isAr ? 'تفاصيل البراند' : 'Brand details'}</span>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="brandName">
                {isAr ? 'اسم البراند' : 'Brand name'} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                required
                value={orderDetails.brandName}
                onChange={(e) => handleOrderChange('brandName', e.target.value)}
                onBlur={() => handleFieldBlur('brandName')}
                className={formErrors.brandName ? 'input-error' : undefined}
              />
              {formErrors.brandName && <div className="field-error">{formErrors.brandName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="brandWebsite">
                {isAr ? 'ويبسايت / لينك' : 'Website or link'} <span className="optional-tag">{isAr ? 'اختياري' : 'Optional'}</span>
              </label>
              <input
                type="text"
                id="brandWebsite"
                name="brandWebsite"
                value={orderDetails.brandWebsite}
                onChange={(e) => handleOrderChange('brandWebsite', e.target.value)}
                dir="ltr"
                placeholder={isAr ? 'مثال: https://example.com' : 'e.g. https://example.com'}
                onBlur={() => handleFieldBlur('brandWebsite')}
                className={formErrors.brandWebsite ? 'input-error' : undefined}
              />
              {formErrors.brandWebsite && <div className="field-error">{formErrors.brandWebsite}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="brandSocial">{isAr ? 'سوشيال / انستجرام' : 'Instagram / Social'}</label>
              <input
                type="text"
                id="brandSocial"
                name="brandSocial"
                value={orderDetails.brandSocial}
                onChange={(e) => handleOrderChange('brandSocial', e.target.value)}
                dir="ltr"
                placeholder={isAr ? 'مثال: @brand أو instagram.com/brand' : 'e.g. @brand or instagram.com/brand'}
                onBlur={() => handleFieldBlur('brandSocial')}
                className={formErrors.brandSocial ? 'input-error' : undefined}
              />
              {formErrors.brandSocial && <div className="field-error">{formErrors.brandSocial}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="quantity">{isAr ? 'الكمية المتوقعة' : 'Estimated quantity'}</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={orderDetails.quantity}
                onChange={(e) => handleOrderChange('quantity', e.target.value)}
                min={1}
                step={1}
                inputMode="numeric"
                placeholder={isAr ? 'مثال: 50' : 'e.g. 50'}
                onBlur={() => handleFieldBlur('quantity')}
                className={formErrors.quantity ? 'input-error' : undefined}
              />
              {formErrors.quantity && <div className="field-error">{formErrors.quantity}</div>}
            </div>
          </div>
          <div className="spec-grid">
            <div className="form-group">
              <label htmlFor="shape">{isAr ? 'الشكل' : 'Shape'}</label>
              <div className="contact-select-wrap">
                <select
                  id="shape"
                  name="shape"
                  className="contact-select"
                  value={orderDetails.shape}
                  onChange={(e) => handleOrderChange('shape', e.target.value)}
                >
                  {shapeOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="technique">{isAr ? 'التقنية' : 'Technique'}</label>
              <div className="contact-select-wrap">
                <select
                  id="technique"
                  name="technique"
                  className="contact-select"
                  value={orderDetails.technique}
                  onChange={(e) => handleOrderChange('technique', e.target.value)}
                >
                  {techniqueOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="embroidery">{isAr ? 'ستايل التطريز' : 'Embroidery Style'}</label>
              <div className="contact-select-wrap">
                <select
                  id="embroidery"
                  name="embroidery"
                  className="contact-select"
                  value={orderDetails.embroidery}
                  onChange={(e) => handleOrderChange('embroidery', e.target.value)}
                >
                  {embroideryOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="size">
                {isAr ? 'المقاس' : 'Size'} <span className="required">*</span>
              </label>
              <div className="contact-select-wrap">
                <select
                  id="size"
                  name="size"
                  className={`contact-select${formErrors.size ? ' input-error' : ''}`}
                  value={orderDetails.size}
                  onChange={(e) => handleOrderChange('size', e.target.value)}
                  onBlur={() => handleFieldBlur('size')}
                  required
                >
                  {sizeOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
              {formErrors.size && <div className="field-error">{formErrors.size}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="color">{isAr ? 'اللون' : 'Color'}</label>
              <input
                type="text"
                id="color"
                name="color"
                value={orderDetails.color}
                onChange={(e) => handleOrderChange('color', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">{isAr ? 'ملاحظات' : 'Notes'}</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={orderDetails.notes}
              onChange={(e) => handleOrderChange('notes', e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button" disabled={isBusy}>
            <Send size={20} />
            {submitLabel}
          </button>
          {orderStatus && (
            <div key={statusKey} className={`order-status ${statusTone}`}>
              <span className="status-icon">
                {statusTone === 'success' ? <CheckCircle size={18} /> : statusTone === 'error' ? <AlertTriangle size={18} /> : <Info size={18} />}
              </span>
              <span className="status-text">{orderStatus}</span>
            </div>
          )}
          </div>
        </form>
      </div>
      <div className={`order-success${showSuccess ? ' show' : ''}`} role="status" aria-live="polite">
        <div className="order-success-card">
          <div className="success-plane">
            <Send size={26} />
          </div>
          <div className="success-text">
            <div className="success-title">{isAr ? 'تم الإرسال' : 'Sent successfully'}</div>
            <div className="success-subtitle">{isAr ? 'هنكلمك قريبًا' : 'We will contact you soon'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
