// 1. Замените на свой endpoint Formspree:
//    регистрация на formspree.io → создайте форму → получите URL вида
//    https://formspree.io/f/xxxxxxxx
// вместо FORMSPREE_ENDPOINT используйте путь к вашему скрипту
const res = await fetch("/send.php", {
  method: "POST",
  body: new FormData(form)
});

const form = document.getElementById("signup-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // проверка чекбокса согласия (required работает, но подстрахуемся)
  if (!form.consent.checked) {
    setStatus("Нужно согласие на обработку данных", "err");
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  setStatus("Отправляем...", "");

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    });

    if (res.ok) {
      form.reset();
      setStatus("Заявка отправлена! Мы свяжемся с вами.", "ok");
    } else {
      setStatus("Не удалось отправить. Попробуйте ещё раз или напишите в ВК.", "err");
    }
  } catch (err) {
    setStatus("Ошибка сети. Попробуйте позже или напишите в ВК.", "err");
  } finally {
    submitBtn.disabled = false;
  }
});

function setStatus(text, cls) {
  statusEl.textContent = text;
  statusEl.className = "status " + cls;
}