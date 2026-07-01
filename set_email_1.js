(async () => {
  const to = "zakelijk@lifegoodsgroup.com";
  const subject = "OEM Pet Clippers for Auronic — Dedicated Factory Partner for Your Bol.com Growth";
  const body = `<div style='font-family:Arial,sans-serif;font-size:14px;color:#333;line-height:1.6'><p>Dear Keting,</p><p>As one of the largest third-party sellers on bol.com with five in-house brands, LifeGoods Group clearly understands the importance of reliable supply chain partnerships. I noticed that Auronic has built an excellent reputation in the personal care and pet grooming space — and I believe we can help you strengthen that position even further.</p><p>We are a professional pet clipper manufacturer already supplying established bol.com sellers in the Netherlands. Our factory specialises in full OEM/ODM services — from custom branding and packaging to product modifications — which aligns perfectly with your multi-brand strategy.</p><p>With your scale (33+ employees, 5 brands), we can offer dedicated production lines, priority scheduling, and volume pricing. Our MOQ starts at just 20 sets per carton, so you can test new SKUs under any of your brands with minimal risk. We also handle DDP shipping directly to your Almere warehouse.</p><p>Would you be open to discussing your pet grooming product roadmap? Feel free to reply to this email or reach out via WhatsApp — I'd be happy to send samples of our top-selling models for your team to evaluate.</p><p>You can view our full product range here: <a href='https://maoshell.en.alibaba.com'>maoshell.en.alibaba.com</a></p><br/><p>Best regards,</p><p><b>Shelly</b></p><p style='color:#666;font-size:13px'>Hangzhou MaoShell Import Export Co., Ltd | Alibaba.com<br/>WhatsApp: +86 15207050232<br/>Email: hzmyshell1015@outlook.com</p></div>`;

  // Set Subject
  const subjectInput = document.querySelector('input[aria-label="添加主题"], input[aria-label="主题"]');
  if (subjectInput) {
    subjectInput.value = subject;
    subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
    subjectInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Set Body
  const bodyEditor = document.querySelector('div[aria-label="邮件正文"], div[role="textbox"][aria-multiline="true"]');
  if (bodyEditor) {
    bodyEditor.innerHTML = body;
    bodyEditor.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // Set To (This is tricky in Outlook)
  const toInput = document.querySelector('div[aria-label="收件人"], div[aria-label="To"]');
  if (toInput) {
      // Find the inner contenteditable or input
      const editable = toInput.querySelector('[contenteditable="true"]') || toInput;
      editable.focus();
      document.execCommand('insertText', false, to);
      // Wait a bit then press enter to confirm the recipient
      setTimeout(() => {
          editable.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
      }, 500);
  }

  return { success: !!(subjectInput && bodyEditor && toInput) };
})()