// Translations
const translations = {
  de: { title: "Umzugsanfrage", welcomeMessage: "Willkommen! Bitte füllen Sie das Formular aus und wir melden uns bei Ihnen.", labelA: "Punkt A (Adresse)", labelB: "Punkt B (Adresse)", etageA: "Etage (A)", liftA: "Aufzug vorhanden (A)", etageB: "Etage (B)", liftB: "Aufzug vorhanden (B)", distA: "Parkdistanz A (Meter)", distB: "Parkdistanz B (Meter)", tragerLabel: "Gibt es Träger?", packing: "Verpackungsmaterial nötig?", datetime: "Datum & Uhrzeit", info: "Zusätzliche Infos", contactLabel: "Kontaktart:", submitBtn: "Absenden", kleinanzeigenLink: "Meine Kleinanzeigen" },
  en: { title: "Moving Request", welcomeMessage: "Welcome! Please fill out the form and we will contact you.", labelA: "Point A (Address)", labelB: "Point B (Address)", etageA: "Floor (A)", liftA: "Elevator available (A)", etageB: "Floor (B)", liftB: "Elevator available (B)", distA: "Parking distance A (meters)", distB: "Parking distance B (meters)", tragerLabel: "Do you need movers?", packing: "Need packing material?", datetime: "Date & Time", info: "Additional Information", contactLabel: "Contact method:", submitBtn: "Submit", kleinanzeigenLink: "My Classifieds" },
  ru: { title: "Заявка на переезд", welcomeMessage: "Добро пожаловать! Заполните форму, и мы свяжемся с вами.", labelA: "Точка А (адрес)", labelB: "Точка Б (адрес)", etageA: "Этаж (А)", liftA: "Есть лифт (А)", etageB: "Этаж (Б)", liftB: "Есть лифт (Б)", distA: "Расстояние до парковки A", distB: "Расстояние до парковки B", tragerLabel: "Нужны грузчики?", packing: "Нужен упаковочный материал?", datetime: "Дата и время", info: "Дополнительная информация", contactLabel: "Способ связи:", submitBtn: "Отправить", kleinanzeigenLink: "Мои объявления" },
  ua: { title: "Запит на переїзд", welcomeMessage: "Ласкаво просимо! Будь ласка, заповніть форму, і ми зв'яжемося з вами.", labelA: "Точка А (адреса)", labelB: "Точка Б (адреса)", etageA: "Поверх (А)", liftA: "Є ліфт (А)", etageB: "Поверх (Б)", liftB: "Є ліфт (Б)", distA: "Відстань до паркування A", distB: "Відстань до паркування B", tragerLabel: "Потрібні вантажники?", packing: "Потрібен пакувальний матеріал?", datetime: "Дата і час", info: "Додаткова інформація", contactLabel: "Спосіб зв'язку:", submitBtn: "Надіслати", kleinanzeigenLink: "Мої оголошення" },
  ar: { title: "طلب نقل", welcomeMessage: "مرحبًا! يرجى ملء النموذج وسنتصل بك.", labelA: "النقطة أ (العنوان)", labelB: "النقطة ب (العنوان)", etageA: "الطابق (أ)", liftA: "يوجد مصعد (أ)", etageB: "الطابق (ب)", liftB: "يوجд مصعد (ب)", distA: "المسافة إلى الموقف أ", distB: "المسافة إلى الموقف ب", tragerLabel: "هل تحتاج إلى عمال؟", packing: "هل تحتاج مواد تغليف؟", datetime: "التاريخ والوقت", info: "معلومات إضافية", contactLabel: "طريقة التواصل:", submitBtn: "إرسال", kleinanzeigenLink: "إعلاناتي" }
};

// Language setter
function setLang(lang) {
  localStorage.setItem('selectedLang', lang);
  const t = translations[lang];
  for (const key in t) {
    document.querySelectorAll(`[id="${key}"]`).forEach(el => el.textContent = t[key]);
  }
  document.documentElement.lang = lang;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLang') || 'de';
  setLang(savedLang);

  const form = document.getElementById('movingForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-pulse">Wird gesendet...</span>';

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        alert('Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.');
        form.reset();
      } else {
        throw new Error('Fehler beim Senden der Anfrage');
      }
    } catch (error) {
      alert('Fehler: ' + error.message);
      console.error('Form submission error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = translations[savedLang].submitBtn;
    }
  });
});
