function injectRatio() {
    const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
    const gerichteHeading = headings.find(heading => heading.textContent.trim().toLowerCase().includes("gerichte"));

    if (!gerichteHeading) return;

    let container = gerichteHeading.nextElementSibling;
    if (!container) return;

    const items = container.querySelectorAll("li, article, div");

    items.forEach(item => {
    if (!item.dataset.modified) {
        const text = item.textContent;
        const priceMatch = text.match(/(\d+,\d{2})\s*€/);
        const caloriesMatch = text.match(/(\d+)\s*kcal/);
        if (priceMatch && caloriesMatch) {
        const price = parseFloat(priceMatch[1].replace(",", "."));
        const calories = parseInt(caloriesMatch[1]);
        const ratio = (calories / price / 100).toFixed(2);
        const ratioElement = document.createElement("span");
        ratioElement.textContent = ` Kalorien/Preis: ${ratio} kcal/ct`;
        ratioElement.style.fontWeight = "bold";
        ratioElement.style.color = setColor(ratio);
        item.appendChild(ratioElement);
        item.dataset.modified = "true";
        }
    }
  });
}

function setColor(ratio) {
    if (ratio >= 2.0) {
        return "green";
    } else if (ratio >= 1.0) {
        return "orange";
    } else {
        return "red";
    }
}

injectRatio();

const observer = new MutationObserver(injectLetter);
observer.observe(document.body, { 
    childList: true, 
    subtree: true 
});