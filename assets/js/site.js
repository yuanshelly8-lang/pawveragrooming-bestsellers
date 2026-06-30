
(function(){
  const toggle=document.querySelector('.mobile-toggle');
  const menu=document.querySelector('.menu');
  if(toggle&&menu) toggle.addEventListener('click',()=>{menu.classList.toggle('open');toggle.setAttribute('aria-expanded',menu.classList.contains('open'));});
  const form=document.getElementById('quoteForm');
  if(form){
    const params=new URLSearchParams(location.search); const product=params.get('product');
    if(product&&form.elements['product']){const opt=[...form.elements['product'].options].find(o=>o.value.startsWith(product));if(opt)form.elements['product'].value=opt.value;}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const d=new FormData(form);
      const msg=[
        'Hello Pawvera Grooming, I would like a B2B wholesale quotation.',
        '',
        'Name: '+(d.get('name')||''),
        'Company: '+(d.get('company')||''),
        'Email: '+(d.get('email')||''),
        'Product / Project: '+(d.get('product')||''),
        'Estimated Quantity: '+(d.get('quantity')||''),
        'Destination Market: '+(d.get('market')||''),
        'OEM / Packaging: '+(d.get('oem')||''),
        'Additional Requirements: '+(d.get('message')||''),
        '',
        'Please advise suitable model, MOQ, sample cost, estimated lead time, packaging options and shipping information.'
      ].join('
');
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'quote_form_submit',product:d.get('product')||'',quantity:d.get('quantity')||'',market:d.get('market')||''});
      window.open('https://wa.me/8615270582230?text='+encodeURIComponent(msg),'_blank','noopener');
    });
  }
})();

(function(){
 window.dataLayer=window.dataLayer||[];
 function track(name,detail){window.dataLayer.push({event:name,...detail});}
 document.addEventListener('click',function(e){
  const a=e.target.closest('a'); if(!a)return;
  const href=a.getAttribute('href')||'';
  if(href.startsWith('mailto:')) track('email_click',{link_text:(a.textContent||'').trim(),page:location.pathname});
  if(href.includes('wa.me/')) track('whatsapp_click',{link_text:(a.textContent||'').trim(),page:location.pathname});
  if(href.includes('contact.html#quote')) track('quote_cta_click',{link_text:(a.textContent||'').trim(),page:location.pathname});
  if(href.includes('product-')) track('product_link_click',{url:href,page:location.pathname});
 });
})();


(function(){
  document.querySelectorAll('[data-product-gallery]').forEach(function(gallery){
    const stage=gallery.querySelector('[data-gallery-stage]');
    const caption=gallery.querySelector('[data-gallery-caption]');
    gallery.querySelectorAll('[data-gallery-src]').forEach(function(btn){
      btn.addEventListener('click',function(){
        gallery.querySelectorAll('[data-gallery-src]').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        stage.src=btn.dataset.gallerySrc;
        stage.srcset='';
        stage.alt=btn.dataset.galleryAlt||stage.alt;
        if(caption) caption.textContent=btn.dataset.galleryCaption||'';
      });
    });
  });
})();
