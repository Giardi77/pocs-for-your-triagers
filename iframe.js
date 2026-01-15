const container = document.createElement('div');
container.style.cssText = 'position:fixed;bottom:20px;right:20px;width:380px;height:580px;z-index:9999;';
document.body.appendChild(container);

const iframe = document.createElement('iframe');
iframe.style.cssText = 'width:100%;height:100%;border:none;';
iframe.sandbox = 'allow-scripts allow-same-origin allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox';
iframe.title = 'Chat with an Agent';

container.appendChild(iframe);

const doc = iframe.contentDocument || iframe.contentWindow.document;
doc.open();
doc.write(`
<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"></head>
<body style="margin:0;overflow:hidden;">
  <iframe title="Chat with an Agent" ... your original long src ...></iframe>
</body>
</html>
`);
doc.close();
