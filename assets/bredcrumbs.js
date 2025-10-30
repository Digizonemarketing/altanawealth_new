document.addEventListener("DOMContentLoaded", function() {
  const pathName = window.location.pathname;
  if (pathName === "/" || pathName === "") return;

  const breadcrumbContainer = document.createElement("nav");
  breadcrumbContainer.className = "breadcrumbs";

  let segments = pathName.split("/").filter(Boolean);

  // Remove date-like segments (year / month / day)
  segments = segments.filter(seg => !/^\d{4}$/.test(seg) && !/^\d{1,2}$/.test(seg));

  let html = `<a href="/">Home</a>`;
  let list = [];
  list.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": window.location.origin + "/"
  });

  let cumulative = "";
  let pos = 2;

  segments.forEach((seg, idx) => {
    cumulative += "/" + seg;
    const name = seg
      .replace(/-/g, " ")
      .replace(/&/g, " & ")
      .replace(/\b\w/g, l => l.toUpperCase());

    if (idx === segments.length - 1) {
      html += ` <span>›</span> <span class="current">${name}</span>`;
    } else {
      html += ` <span>›</span> <a href="${cumulative}/">${name}</a>`;
    }

    list.push({
      "@type": "ListItem",
      "position": pos++,
      "name": name,
      "item": window.location.origin + cumulative + "/"
    });
  });

  breadcrumbContainer.innerHTML = html;

  const insertPoint = document.querySelector("main, .Main, #page");
  if (insertPoint) insertPoint.prepend(breadcrumbContainer);

  // Schema Injection
  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  schemaScript.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": list
  });
  document.head.appendChild(schemaScript);
});
