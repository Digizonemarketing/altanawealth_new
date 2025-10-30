
(function(){
  var parts = window.location.pathname.replace(/\/$/, "").split("/").filter(Boolean);
  var built = "";
  var html = '<nav class="breadcrumb"><a href="/">Home</a>';

  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];

    // Skip pure numbers (dates in blog URLs)
    if (/^\d+$/.test(p)) continue;

    built += "/" + p;
    var label = decodeURIComponent(p)
      .replace(/-/g, " ")
      .replace(/\b\w/g, function(m){ return m.toUpperCase(); });

    html += ' <span class="sep">→</span> <a href="' + built + '">' + label + '</a>';
  }

  html += '</nav>';
  document.write(html);

  // JSON-LD Breadcrumb Schema
  var temp = document.createElement("div");
  temp.innerHTML = html;
  var links = temp.querySelectorAll("a");

  if (links.length > 1) {
    var schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": []
    };

    for (var j = 0; j < links.length; j++) {
      schema.itemListElement.push({
        "@type": "ListItem",
        "position": j + 1,
        "name": links[j].textContent.trim(),
        "item": links[j].href
      });
    }

    document.write('<script type="application/ld+json">' + JSON.stringify(schema) + '<\/script>');
  }
})();
