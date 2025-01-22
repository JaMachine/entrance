const updateContent = (id, value, href) => {
    const element = document.getElementById(id);
    if (element && value) {
        element.innerHTML = value;
        if (href) { // Проверяем, есть ли ссылка для данного элемента
            element.href = href;
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.startsWith("ru") ? "ru" : userLang.startsWith("uk") ? "ua" : "en";
    const localizationFile = `${lang}.json`;

    fetch(localizationFile)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading localization file");
            }
            return response.json();
        })
        .then(data => {
            updateContent("main_text", data.main_text);
            updateContent("yes_btn", data.yes_btn, data.yes_href); // Добавляем обработку ссылки для yes_btn
            updateContent("no_btn", data.no_btn, data.no_href);   // Добавляем обработку ссылки для no_btn
        })
        .catch(error => {
            console.error("Localization error:", error);
            // Обработка ошибки загрузки локализации. Например, можно установить значения по умолчанию.
            updateContent("main_text", "Текст по умолчанию");
            updateContent("yes_btn", "Да", "https://example.com");
            updateContent("no_btn", "Нет", "https://example.com");
        });
});