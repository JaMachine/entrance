const updateContent = (id, value) => {
    const element = document.getElementById(id);
    if (element && value) {
        element.innerHTML = value;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.startsWith("ru") ? "ru" : userLang.startsWith("uk") ? "ua" : "en";
    const localizationFile = `${lang}.json`;

    fetch(localizationFile)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error");
            }
            return response.json();
        })
        .then(data => {
            updateContent("main_text", data.main_text);
            updateContent("yes_btn", data.yes_btn);
            updateContent("no_btn", data.no_btn);
        })
        .catch(error => {
            console.error("local error:", error);
        });
});
