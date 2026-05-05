/* global script.js — Rate Card interactivity */
(function () {
  'use strict';

  /* ── Currency toggle ── */
  const currencySwitch = document.getElementById('currencySwitch');
  const currencyLabel  = document.getElementById('currencyLabel');
  let isIDR = false;

  function formatIDR(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
  }

  function formatUSD(amount) {
    return '$' + Number(amount).toLocaleString('en-US');
  }

  function updatePrices() {
    /* Card prices */
    document.querySelectorAll('.card-price').forEach(function (el) {
      const amountEl = el.querySelector('.price-amount');
      if (!amountEl) return;

      if (isIDR) {
        amountEl.textContent = formatIDR(el.dataset.idr);
      } else {
        amountEl.textContent = formatUSD(el.dataset.usd);
      }
    });

    /* Table price cells */
    document.querySelectorAll('.price-cell').forEach(function (el) {
      /* Skip addon items that use a percent string */
      if (!el.dataset.usd || !el.dataset.idr) return;
      if (isIDR) {
        el.textContent = formatIDR(el.dataset.idr) + '/hr';
      } else {
        el.textContent = formatUSD(el.dataset.usd) + '/hr';
      }
    });

    /* Addon prices */
    document.querySelectorAll('.addon-price').forEach(function (el) {
      if (!el.dataset.usd || !el.dataset.idr) return;
      /* Percent strings (e.g. "50%") stay as-is */
      if (el.dataset.usd.includes('%')) return;
      if (isIDR) {
        el.textContent = formatIDR(el.dataset.idr);
      } else {
        el.textContent = formatUSD(el.dataset.usd);
      }
    });

    currencyLabel.textContent = isIDR ? 'USD' : 'IDR';
    currencySwitch.setAttribute('aria-checked', String(isIDR));
  }

  function toggleCurrency() {
    isIDR = !isIDR;
    updatePrices();
  }

  currencySwitch.addEventListener('click', toggleCurrency);
  currencySwitch.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCurrency();
    }
  });

  /* ── Print button ── */
  document.getElementById('printBtn').addEventListener('click', function () {
    window.print();
  });

  /* ── Contact form ── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(function (field) {
      field.classList.remove('invalid');
      if (!field.value.trim()) {
        field.classList.add('invalid');
        valid = false;
      }
    });

    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('invalid');
      valid = false;
    }

    if (!valid) return;

    /* Simulate submission */
    form.classList.add('hidden');
    success.classList.remove('hidden');
    success.focus();
  });

  /* Remove invalid class on input */
  form.addEventListener('input', function (e) {
    e.target.classList.remove('invalid');
  });

  /* ── Footer year ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
