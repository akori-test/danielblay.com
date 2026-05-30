// Tiny hash router: shows one .view at a time and highlights the active nav link.
(function () {
  var views = document.querySelectorAll(".view");
  var navLinks = document.querySelectorAll(".nav a");

  function show(route) {
    var matched = false;
    views.forEach(function (view) {
      var isMatch = view.getAttribute("data-view") === route;
      view.hidden = !isMatch;
      if (isMatch) matched = true;
    });
    // Fall back to home if the route is unknown.
    if (!matched) {
      route = "home";
      views.forEach(function (view) {
        view.hidden = view.getAttribute("data-view") !== "home";
      });
    }
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-route") === route);
    });
    window.scrollTo(0, 0);
  }

  function routeFromHash() {
    return (window.location.hash || "#home").replace(/^#/, "");
  }

  window.addEventListener("hashchange", function () {
    show(routeFromHash());
  });

  // Explicit click handling so it works even where default anchor
  // navigation / hashchange don't fire (e.g. some embedded previews).
  document.querySelectorAll("a[data-route]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var route = link.getAttribute("data-route");
      if (window.location.hash !== "#" + route) {
        window.location.hash = route;
      }
      show(route);
    });
  });

  show(routeFromHash());
})();
