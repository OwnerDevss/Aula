document.addEventListener("DOMContentLoaded", () => {
    const pages = [
        "aprendiz.html",
        "lei-aprendizagem.html",
        "decreto-9579.html",
        "lei-8069.html"
    ];

    const currentPage = window.location.pathname.split("/").pop();

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            const nextPageIndex = pages.indexOf(currentPage) + 1;
            if (nextPageIndex < pages.length) {
                window.location.href = pages[nextPageIndex];
            }
        } else if (event.key === "ArrowLeft") {
            const prevPageIndex = pages.indexOf(currentPage) - 1;
            if (prevPageIndex >= 0) {
                window.location.href = pages[prevPageIndex];
            }
        }
    });
});