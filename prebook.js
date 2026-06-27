// prebook.js - handles pre-book UI, validation, and checkout flow
(function(){
  const PRICE_RUPEES = 4999;
  const DISCOUNT_PERCENT = 15; // pre-book discount

  function rupeesToPaise(r){ return Math.round(r * 100); }

  function computeUnitPaise(){
    const basePaise = rupeesToPaise(PRICE_RUPEES);
    return Math.round(basePaise * (100 - DISCOUNT_PERCENT) / 100);
  }

  const unitPaise = computeUnitPaise(); // e.g., 424915 paise

  const formWrap = document.getElementById('form-wrap');
  const options = document.querySelectorAll('.prebook-option');
  const heading = document.querySelector('.section-heading');
  const optionWrap = document.querySelector('.prebook-options');

  function showOrderOptions(){
    if (heading) heading.style.display = '';
    if (optionWrap) optionWrap.style.display = '';
    if (formWrap) formWrap.innerHTML = '';
  }

  function createFormFor(type, variant){
    // constraints per type
    const constraints = {
      student: {min:1, max:2, qtyPlaceholder: '1'},
      parent: {min:2, max:5, qtyPlaceholder: '2'},
      institute: {min:10, max:500, qtyPlaceholder: '10'}
    };
    const c = constraints[type];

    const container = document.createElement('div');
    container.className = 'prebook-form';

    const backButton = document.createElement('button');
    backButton.className = 'prebook-back';
    backButton.type = 'button';
    backButton.textContent = 'Go back';
    backButton.addEventListener('click', showOrderOptions);
    container.appendChild(backButton);

    const heading = document.createElement('h2');
    heading.textContent = type === 'student' ? 'Student Pre-book Order' : type === 'parent' ? 'Parent Pre-book Order' : 'Institute / Organization Pre-book Order';
    container.appendChild(heading);

    const form = document.createElement('form');
    form.noValidate = false;
    let html = '';
    if (type === 'student'){
      html = `
        <label><span>Full name</span><input name="name" required placeholder="Full name"></label>
        <label><span>Date of birth</span><input type="date" name="dob" required></label>
        <label><span>Mobile</span><input name="mobile" required inputmode="numeric" pattern="[0-9]{7,15}" placeholder="Mobile number"></label>
        <label><span>Email</span><input type="email" name="email" required placeholder="Email"></label>
        <label><span>Address</span><textarea name="address" rows="3" required placeholder="Shipping address"></textarea></label>
        <label><span>Quantity</span><input type="number" name="quantity" placeholder="${c.qtyPlaceholder}" min="${c.min}" max="${c.max}" required></label>
      `;
    } else if (type === 'institute'){
      html = `
        <label><span>Contact name</span><input name="name" required placeholder="Full name"></label>
        <label><span>Institute / Organization</span><input name="org" required placeholder="Institute or organization name"></label>
        <label><span>Mobile</span><input name="mobile" required inputmode="numeric" pattern="[0-9]{7,15}" placeholder="Mobile number"></label>
        <label><span>Email</span><input type="email" name="email" required placeholder="Email"></label>
        <label><span>Address</span><textarea name="address" rows="3" required placeholder="Billing / shipping address"></textarea></label>
        <label><span>Quantity</span><input type="number" name="quantity" placeholder="${c.qtyPlaceholder}" min="${c.min}" max="${c.max}" required></label>
      `;
    } else if (type === 'parent'){
      html = `
        <label><span>Name</span><input name="name" required placeholder="Full name"></label>
        <label><span>Occupation</span><input name="occupation" placeholder="Occupation"></label>
        <label><span>Mobile</span><input name="mobile" required inputmode="numeric" pattern="[0-9]{7,15}" placeholder="Mobile number"></label>
        <label><span>Email</span><input type="email" name="email" required placeholder="Email"></label>
        <label><span>Address</span><textarea name="address" rows="3" required placeholder="Shipping address"></textarea></label>
        <label><span>Quantity</span><input type="number" name="quantity" placeholder="${c.qtyPlaceholder}" min="${c.min}" max="${c.max}" required></label>
      `;
    }

    form.innerHTML = html + `
      <div style="margin-top:12px;"><button class="button button-primary" type="submit">Proceed to Pay</button></div>
    `;

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        type,
        variant: variant || new URLSearchParams(location.search).get('variant') || 'core',
        name: fd.get('name'),
        org: fd.get('org') || '',
        dob: fd.get('dob'),
        occupation: fd.get('occupation') || '',
        mobile: fd.get('mobile'),
        email: fd.get('email'),
        address: fd.get('address'),
        quantity: Number(fd.get('quantity')||0)
      };

      // basic validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!payload.name || !payload.mobile || !payload.email || payload.quantity < c.min){
        alert('Please fill required fields and make sure quantity meets the minimum.');
        return;
      }

      if (payload.quantity > c.max){
        alert('Quantity exceeds allowed maximum for this order type.');
        return;
      }

      try{
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Order creation failed');

        if (data.mock || !window.Razorpay) {
          const verifyRes = await fetch('/api/verify', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              razorpay_payment_id: 'pay_mock_' + Date.now(),
              razorpay_order_id: data.orderId,
              razorpay_signature: '',
              meta: payload
            })
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.ok) {
            throw new Error(verifyData.message || 'Mock payment verification failed');
          }
          window.location.href = 'prebook-success.html';
          return;
        }

        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: 'Taejoon ALIF',
          description: `Pre-book (${payload.variant}) x ${payload.quantity}`,
          order_id: data.orderId,
          handler: function(response){
            // verify payment on server
            fetch('/api/verify', {
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                meta: payload
              })
            }).then(r=>r.json()).then(j=>{
              if (j.ok) {
                alert('Payment success! Confirmation will be sent shortly.');
                window.location.href = 'prebook-success.html';
              } else {
                alert('Payment verification failed: ' + (j.message||'')); 
              }
            }).catch(err=>{alert('Verification error: '+err.message)});
          },
          prefill: {name: payload.name, email: payload.email, contact: payload.mobile},
          theme: {color: '#4a78ff'}
        };

        const rzp = new Razorpay(options);
        rzp.open();

      }catch(err){
        alert('Error creating order: '+err.message);
      }
    });

    container.appendChild(form);
    return container;
  }

  options.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      // hide heading and options so only the form is visible
      if (heading) heading.style.display = 'none';
      if (optionWrap) optionWrap.style.display = 'none';
      // clear
      formWrap.innerHTML = '';
      const type = btn.dataset.type;
      const variant = new URLSearchParams(location.search).get('variant') || 'core';
      const f = createFormFor(type, variant);
      formWrap.appendChild(f);
      // focus first input
      const firstInput = f.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    });
  });

  // open variant if query param provided and default to student
  const qsType = new URLSearchParams(location.search).get('type');
  if (qsType){
    const el = Array.from(options).find(o=>o.dataset.type===qsType);
    if (el) el.click();
  }
})();
