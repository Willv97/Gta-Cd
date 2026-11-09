  (function () {
    // Release: November 19, 2026, 12:00 AM in the viewer's local time.
    var target = new Date(2026, 10, 19, 0, 0, 0).getTime();

    var els = {
      d: document.getElementById("d"),
      h: document.getElementById("h"),
      m: document.getElementById("m"),
      s: document.getElementById("s")
    };
    var timer = document.getElementById("timer");
    var live = document.getElementById("live");
    var hoursLeft = document.getElementById("hoursLeft");
    var last = { d: "", h: "", m: "", s: "" };

    function pad(n) { return n < 10 ? "0" + n : String(n); }

    function split(ms) {
      var total = Math.max(0, Math.floor(ms / 1000));
      return {
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
        hours: Math.floor(total / 3600)
      };
    }

    function set(key, value) {
      var text = pad(value);
      if (last[key] === text) return;
      last[key] = text;
      var el = els[key];
      el.textContent = text;
      if (key === "s" || key === "m") {
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }
    }

    function render() {
      var diff = target - Date.now();
      if (diff <= 0) {
        timer.hidden = true;
        hoursLeft.hidden = true;
        live.hidden = false;
        return false;
      }
      var t = split(diff);
      set("d", t.d);
      set("h", t.h);
      set("m", t.m);
      set("s", t.s);
      hoursLeft.textContent = t.hours.toLocaleString() + " hours to go";
      return true;
    }

    if (render()) {
      var id = setInterval(function () {
        if (!render()) clearInterval(id);
      }, 250);
    }

    // Two views, routed on the hash: the countdown (default) and #about.
    var home = document.getElementById("view-home");
    var about = document.getElementById("view-about");
    function route(scroll) {
      var showAbout = location.hash === "#about";
      home.hidden = showAbout;
      about.hidden = !showAbout;
      if (scroll) { try { window.scrollTo(0, 0); } catch (e) {} }
    }
    window.addEventListener("hashchange", function () { route(true); });
    route(false);
  })();
