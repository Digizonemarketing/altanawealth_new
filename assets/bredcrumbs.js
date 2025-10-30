
(function() {
  function createBreadcrumbs() {
    const pathName = window.location.pathname;
    if (pathName === "/" || pathName === "") return;

    // Avoid duplicate breadcrumbs
    if (document.querySelector(".breadcrumbs")) return;

    const breadcrumbContainer = document.createElement("nav");
    breadcrumbContainer.className = "breadcrumbs";

    let segments = pathName.split("/").filter(Boolean);

    // Remove date-like segments (year/month/day)
    segments = segments.filter(seg => !/^\d{4}$/.test(seg) && !/^\d{1,2}$/.test(seg));

    let html = `<a href="/">Home</a>`;
    const list = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": window.location.origin + "/"
    }];

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

    const insertPoint = document.querySelector("main, .Main, #page, #content, .sqs-layout");
    if (insertPoint) insertPoint.prepend(breadcrumbContainer);

    // Add Schema.org JSON-LD
    if (!document.querySelector('script[type="application/ld+json"][data-breadcrumb]')) {
      const schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute("data-breadcrumb", "true");
      schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": list
      });
      document.head.appendChild(schemaScript);
    }
  }

  // Run once when DOM is ready
  document.addEventListener("DOMContentLoaded", createBreadcrumbs);

  // Re-run on Squarespace AJAX page changes
  document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") setTimeout(createBreadcrumbs, 300);
  });

  // Squarespace 7.0 dynamic page reload listener (hash change / pushstate)
  window.addEventListener("popstate", function() {
    setTimeout(createBreadcrumbs, 300);
  });

  // Handle Squarespace AJAX navigation (common event)
  document.addEventListener("DOMContentLoaded", function() {
    const observer = new MutationObserver(() => {
      if (!document.querySelector(".breadcrumbs")) createBreadcrumbs();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();

