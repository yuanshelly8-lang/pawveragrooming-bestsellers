(async () => {
  const to = document.querySelector('div[aria-label="收件人"]');
  const subject = document.querySelector('input[placeholder="添加主题"]');
  const body = document.querySelector('div[aria-label="邮件正文"]');

  if (to) {
    to.focus();
    to.innerText = '';
    document.execCommand('insertText', false, 'info@groomzo.com');
    await new Promise(r => setTimeout(r, 500));
    to.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
  }
  
  await new Promise(r => setTimeout(r, 500));

  if (subject) {
    subject.focus();
    subject.value = "A Dedicated Clipper Factory for Bol.com's #1 Pet Grooming Brand";
    subject.dispatchEvent(new Event('input', { bubbles: true }));
  }

  if (body) {
    body.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('delete', false, null);
    document.execCommand('insertHTML', false, `<div style='font-family:Arial,sans-serif;font-size:14px;color:#333;line-height:1.6'><p>Dear Mark,</p><p>As the top-selling pet grooming brand on bol.com, Groomzo clearly has a winning formula. Maintaining that #1 position requires products that consistently exceed customer expectations — and a factory partner who understands what Dutch consumers want.</p><p>We're a pet clipper manufacturer already serving other successful bol.com grooming brands. We understand the quality bar, packaging expectations, and logistics timeline that bol.com's top sellers demand.</p><p>What we can offer Groomzo:</p><ul><li>Premium quality at competitive factory pricing — protect your margins as a category leader</li><li>Full OEM with Groomzo branding, custom colour matching, branded gift-box packaging</li><li>Ultra-quiet motors (≤45 dB) and ceramic + titanium blades — the specs your customers love</li><li>CE/RoHS certified, &lt;2% return rate</li><li>MOQ 20 sets — perfect for testing new models before scaling</li><li>DDP to Leeuwarden</li></ul><p>Would you like to test a few of our models side by side with your current products? I'll send a complimentary sample set — no strings attached. Just reply here or message me on WhatsApp.</p><p>You can view our full product range here: <a href='https://maoshell.en.alibaba.com'>maoshell.en.alibaba.com</a></p><br/><p>Best regards,</p><p><b>Shelly</b></p><p style='color:#666;font-size:13px'>Hangzhou MaoShell Import Export Co., Ltd | Alibaba.com<br/>WhatsApp: +86 15207050232<br/>Email: hzmyshell1015@outlook.com</p></div>`);
  }
  
  return { success: true };
})()