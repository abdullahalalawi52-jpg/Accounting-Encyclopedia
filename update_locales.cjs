const fs = require('fs');
const path = require('path');

const arPath = path.join(process.cwd(), 'src/locales/ar.json');
const enPath = path.join(process.cwd(), 'src/locales/en.json');

const ar = JSON.parse(fs.readFileSync(arPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

// FAQ
ar.faq = {
  "title": "الأسئلة الشائعة والدعم",
  "desc": "تجد هنا إجابات على أكثر الأسئلة شيوعاً، أو يمكنك مراسلتنا مباشرة.",
  "faq_title": "الأسئلة المتكررة",
  "contact_title": "تواصل معنا",
  "name": "الاسم الكامل",
  "name_ph": "أدخل اسمك...",
  "email": "البريد الإلكتروني",
  "email_ph": "example@mail.com",
  "subject": "موضوع الرسالة أو الاستفسار",
  "subject_ph": "كيف يمكننا مساعدتك؟",
  "submit": "إرسال الرسالة",
  "list": [
    {
      "question": "ما هي موسوعة المحاسبة؟",
      "answer": "موسوعة المحاسبة هي منصة تعليمية عربية مجانية تهدف إلى تبسيط المفاهيم المحاسبية والمالية للطلاب، المحاسبين المبتدئين، ورواد الأعمال."
    },
    {
      "question": "هل المقالات والدروس مجانية؟",
      "answer": "نعم، جميع المقالات والمصطلحات في الموسوعة متاحة مجاناً بالكامل ولا تتطلب أي اشتراك مدفوع."
    },
    {
      "question": "كيف يمكنني البدء في تعلم المحاسبة من الصفر؟",
      "answer": "ننصحك بالبدء بقسم 'المحاسبة المالية' حيث يحتوي على الأساسيات مثل فهم الميزانية العمومية، قائمة الدخل، والقيود اليومية، ثم الانتقال للأقسام المتقدمة."
    },
    {
      "question": "هل يمكنني المساهمة في كتابة مقالات؟",
      "answer": "نرحب بجميع الخبراء المحاسبين! يمكنك التواصل معنا عبر النموذج الموجود في هذه الصفحة وسنقوم بالرد عليك لترتيب عملية النشر."
    },
    {
      "question": "ما هو الفرق بين المحاسبة المالية والإدارية؟",
      "answer": "المحاسبة المالية تهتم بإعداد القوائم المالية للأطراف الخارجية (المستثمرين، البنوك)، بينما المحاسبة الإدارية تركز على توفير تقارير وتحليلات داخلية لمساعدة الإدارة في اتخاذ القرارات."
    }
  ]
};

en.faq = {
  "title": "Frequently Asked Questions & Support",
  "desc": "Find answers to the most common questions, or contact us directly.",
  "faq_title": "Common Questions",
  "contact_title": "Contact Us",
  "name": "Full Name",
  "name_ph": "Enter your name...",
  "email": "Email Address",
  "email_ph": "example@mail.com",
  "subject": "Message Subject",
  "subject_ph": "How can we help you?",
  "submit": "Send Message",
  "list": [
    {
      "question": "What is the Accounting Encyclopedia?",
      "answer": "The Accounting Encyclopedia is a free educational platform aimed at simplifying accounting and financial concepts for students, junior accountants, and entrepreneurs."
    },
    {
      "question": "Are the articles and lessons free?",
      "answer": "Yes, all articles and terms in the encyclopedia are completely free and do not require any paid subscription."
    },
    {
      "question": "How can I start learning accounting from scratch?",
      "answer": "We recommend starting with the 'Financial Accounting' section as it contains basics like understanding the balance sheet, income statement, and journal entries, then moving to advanced sections."
    },
    {
      "question": "Can I contribute by writing articles?",
      "answer": "We welcome all accounting experts! You can contact us via the form on this page and we will reply to arrange the publishing process."
    },
    {
      "question": "What is the difference between Financial and Managerial Accounting?",
      "answer": "Financial Accounting focuses on preparing financial statements for external parties (investors, banks), while Managerial Accounting focuses on providing internal reports and analysis to help management make decisions."
    }
  ]
};

// Glossary
ar.glossary = {
  "title": "القاموس المحاسبي",
  "desc": "مرجع سريع وسهل لأهم المصطلحات المحاسبية والمالية.",
  "search_ph": "ابحث عن مصطلح...",
  "loading": "جاري تحميل المصطلحات...",
  "no_results": "لم يتم العثور على مصطلحات تطابق بحثك",
  "listen": "استمع للمصطلح باللغة الإنجليزية"
};

en.glossary = {
  "title": "Accounting Glossary",
  "desc": "A quick and easy reference for the most important accounting and financial terms.",
  "search_ph": "Search for a term...",
  "loading": "Loading terms...",
  "no_results": "No terms found matching your search",
  "listen": "Listen to the term in English"
};

// Article Page
ar.article_page = {
  "loading": "جاري تحميل المقال...",
  "not_found": "عذراً، المقال غير موجود أو قيد الإعداد!",
  "not_found_desc": "نعمل على إضافة محتوى هذا المقال قريباً.",
  "back_cats": "العودة للأقسام",
  "home": "الرئيسية",
  "bookmark_add": "حفظ المقال",
  "bookmark_rem": "إزالة من المفضلة",
  "related": "مقالات ذات صلة",
  "forum_title": "هل لديك سؤال محاسبي؟",
  "forum_desc": "اطرح سؤالك في منتدى المحاسبين وسيجيبك الخبراء في أسرع وقت.",
  "forum_btn": "اطرح سؤالاً",
  "quiz_title": "اختبر معلوماتك 📝",
  "submit_answers": "إرسال الإجابات",
  "score": "نتيجتك: {{score}} من {{total}}",
  "score_perfect": "ممتاز! لقد فهمت الدرس جيداً 👏",
  "score_good": "يمكنك مراجعة المقال مرة أخرى لمحاولة أفضل."
};

en.article_page = {
  "loading": "Loading article...",
  "not_found": "Sorry, the article was not found or is under preparation!",
  "not_found_desc": "We are working on adding the content of this article soon.",
  "back_cats": "Back to Categories",
  "home": "Home",
  "bookmark_add": "Save Article",
  "bookmark_rem": "Remove from Bookmarks",
  "related": "Related Articles",
  "forum_title": "Have an accounting question?",
  "forum_desc": "Ask your question in the accountants forum and experts will answer you as soon as possible.",
  "forum_btn": "Ask a Question",
  "quiz_title": "Test your knowledge 📝",
  "submit_answers": "Submit Answers",
  "score": "Your Score: {{score}} out of {{total}}",
  "score_perfect": "Excellent! You understood the lesson well 👏",
  "score_good": "You can review the article again for a better attempt."
};

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log('Locales updated successfully!');
