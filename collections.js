const cards = Array.from(document.querySelectorAll(".card"));
const selection = document.getElementById("selection");

const revealCards = () => {
	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("revealed");
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.25 }
	);

	cards.forEach((card, index) => {
		card.style.transitionDelay = `${index * 60}ms`;
		observer.observe(card);
	});
};

const handleSelect = (card) => {
	const category = card.dataset.category || "";
	const target = card.dataset.link || "creation outfique.html";

	cards.forEach((item) => item.classList.remove("active"));
	card.classList.add("active", "pulse");
	selection.textContent = `${category} selected`;

	setTimeout(() => {
		card.classList.remove("pulse");
	}, 500);

	setTimeout(() => {
		const url = `${target}?category=${encodeURIComponent(category)}`;
		window.location.href = url;
	}, 650);
};

const bindCard = (card) => {
	card.addEventListener("click", () => handleSelect(card));
	card.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleSelect(card);
		}
	});
};

revealCards();
cards.forEach(bindCard);
