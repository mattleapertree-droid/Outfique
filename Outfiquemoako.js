const cards = Array.from(document.querySelectorAll(".card"));
const selection = document.getElementById("selection");

const revealOnLoad = () => {
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("revealed");
    }, index * 80);
  });
};

const selectCategory = (card) => {
  cards.forEach((c) => c.classList.remove("active"));
  card.classList.add("active", "pulse");
  selection.textContent = `Selected: ${card.dataset.category}`;

  window.setTimeout(() => {
    card.classList.remove("pulse");
  }, 600);
};

cards.forEach((card) => {
  card.addEventListener("click", () => selectCategory(card));

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-6px) scale(1.02) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

window.addEventListener("DOMContentLoaded", revealOnLoad);
