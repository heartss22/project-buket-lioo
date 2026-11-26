const orderButtons = document.querySelectorAll(".order-button");
const orderForm = document.querySelector("#orderForm");
const orderProduct = document.querySelector("#orderProduct");
const orderPrice = document.querySelector("#orderPrice");
const productInput = document.querySelector("#productInput");
const priceInput = document.querySelector("#priceInput");
const orderQuantity = document.querySelector("#orderQuantity");
const orderConfirmation = document.querySelector("#orderConfirmation");

const formatRupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

if (orderForm) {
  orderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      const price = Number(button.dataset.price);

      orderProduct.textContent = product;
      orderPrice.textContent = formatRupiah(price);
      productInput.value = product;
      priceInput.value = String(price);
      orderQuantity.value = "1";
      orderConfirmation.classList.add("d-none");
      orderConfirmation.textContent = "";
    });
  });

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!orderForm.reportValidity()) {
      return;
    }

    const formData = new FormData(orderForm);
    const quantity = Number(formData.get("quantity"));
    const total = Number(formData.get("price")) * quantity;

    orderConfirmation.textContent =
      `Ringkasan: ${quantity} ${formData.get("product")}, total ${formatRupiah(total)}. ` +
      `Pemesan: ${formData.get("customerName")} (${formData.get("customerPhone")}). ` +
      `Alamat: ${formData.get("address")}. Pesanan ini belum dikirim ke penjual.`;
    orderConfirmation.classList.remove("d-none");
  });
}

const contactForm = document.querySelector("#contactForm");
const contactFormStatus = document.querySelector("#contactFormStatus");
const contactWhatsAppLink = document.querySelector("#contactWhatsAppLink");

if (contactForm && contactFormStatus && contactWhatsAppLink) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const phoneNumber = contactForm.dataset.whatsappNumber.replace(/\D/g, "");
    contactWhatsAppLink.classList.add("d-none");
    contactFormStatus.classList.remove("d-none", "is-error");

    if (phoneNumber.length < 8 || phoneNumber.length > 15) {
      contactFormStatus.textContent =
        "Form belum tersambung. Isi nomor WhatsApp usaha pada atribut data-whatsapp-number di kontak.html (gunakan kode negara, tanpa tanda +).";
      contactFormStatus.classList.add("is-error");
      return;
    }

    const formData = new FormData(contactForm);
    const message = [
      `Halo, saya ${formData.get("name")}.`,
      `Email: ${formData.get("email")}.`,
      `Pesan: ${formData.get("message")}`,
    ].join("\n");

    contactWhatsAppLink.href =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    contactFormStatus.textContent =
      "Pesan siap dikirim. Klik tombol di bawah untuk membuka WhatsApp.";
    contactWhatsAppLink.classList.remove("d-none");
  });
}