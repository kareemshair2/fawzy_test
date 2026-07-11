/**
 * فريق الميديا — استمارة الانضمام
 * Google Apps Script
 *
 * التعليمات:
 * 1. افتح Google Sheets وأنشئ Sheet جديد
 * 2. اذهب إلى Extensions > Apps Script
 * 3. الصق الكود ده كله
 * 4. غير اسم الـ Sheet في السطر 17 لو عايز
 * 5. اعمل Save > Deploy > New Deployment > Web App
 * 6. تأكد من الإعدادات:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. انسخ الـ URL اللي هيظهرك وحطه في ملف HTML
 *    مكان YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 */

const SHEET_NAME = 'فريق_الميديا'; // غير اسم الشيت لو حابب

function doGet() {
  return HtmlService.createHtmlOutput('<h2>فريق الميديا API</h2><p>الاستمارة شغالة ✅</p>');
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // لو الشيت مش موجود، اعمله
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // عنوان الأعمدة
      sheet.appendRow([
        'التاريخ',
        'الاسم كامل',
        'السن',
        'رقم الموبايل',
        'المحافظة',
        
        'الكلية / الشغل',
        'مجال التطوع',
        'خبرة سابقة',
        'أعمال سابقة (بورتفوليو)',
        'عرفنا بنفسك',
        'ليه حابب تنضم',
        'تطوعت قبل كده؟',
        'تفاصيل التطوع السابق',
        'ساعات أسبوعيًا',
        'المهارة المطلوب تعلمها',
        'ملاحظات إضافية',
        'Timestamp'
      ]);
    }

    // قراءة البيانات
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    // صف البيانات
    const row = [
      new Date(),
      data.full_name || '',
      data.age || '',
      data.phone || '',
      data.governorate || '',

      data.occupation || '',
      data.media_field || '',
      data.prev_experience || '',
      data.portfolio || '',
      data.about_you || '',
      data.why_join || '',
      data.prev_work || '',
      data.prev_work_details || '',
      data.weekly_hours || '',
      data.goal || '',
      data.notes || '',
      data.timestamp || new Date().toISOString()
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'تم التسجيل بنجاح' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
