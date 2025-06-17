document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("navSearch");
  const filterSelect = document.getElementById("classFilter");
  const galleryContainer = document.querySelector(".gallery-container");
  const animalCards = Array.from(document.querySelectorAll(".animal-card"));

  function filterAnimals() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedClass = filterSelect.value;

    animalCards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const cardClass = card.dataset.class?.toLowerCase() || "";
      const matchesName = name.includes(searchTerm);
      const matchesClass = !selectedClass || cardClass === selectedClass.toLowerCase();

      card.style.display = matchesName && matchesClass ? "block" : "none";
    });
  }

  searchInput.addEventListener("input", filterAnimals);
  filterSelect.addEventListener("change", filterAnimals);

  // Download buttons
  document.querySelectorAll(".download-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.img;
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  // Smooth scroll on CTA
  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Trivia Section Logic
  const triviaCards = [
    {
      question: "Which arachnid is known for its venomous bite?",
      options: ["Tarantula", "Black Widow", "Scorpion", "Tick"],
      answer: "Black Widow"
    },
    {
      question: "Which crustacean is known for living in discarded shells?",
      options: ["Shrimp", "Lobster", "Hermit Crab", "Crayfish"],
      answer: "Hermit Crab"
    },
    {
      question: "Which animal class does a frog belong to?",
      options: ["Reptilia", "Insecta", "Amphibia", "Pisces"],
      answer: "Amphibia"
    }
  ];

  let currentTrivia = 0;
  const showTriviaBtn = document.getElementById('show-trivia');
  const triviaCard = document.querySelector('.trivia-card');
  const questionEl = document.getElementById('trivia-question');
  const optionsContainer = document.getElementById('trivia-options');
  const feedbackEl = document.getElementById('trivia-feedback');
  const nextBtn = document.getElementById('next-trivia');

  function loadTrivia(index) {
    const card = triviaCards[index];
    questionEl.textContent = card.question;
    optionsContainer.innerHTML = "";

    card.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.classList.add("option-button");
      btn.addEventListener('click', () => {
        const isCorrect = option === card.answer;
        feedbackEl.textContent = isCorrect ? "✅ Correct!" : ❌ Incorrect! The correct answer is: ${card.answer};
        feedbackEl.style.color = isCorrect ? "green" : "red";
        optionsContainer.querySelectorAll("button").forEach(b => b.disabled = true);
      });
      optionsContainer.appendChild(btn);
    });

    feedbackEl.textContent = "";
  }

  if (showTriviaBtn) {
    showTriviaBtn.addEventListener('click', () => {
      showTriviaBtn.classList.add('hidden');
      triviaCard.classList.remove('hidden');
      loadTrivia(currentTrivia);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTrivia = (currentTrivia + 1) % triviaCards.length;
      loadTrivia(currentTrivia);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("navSearch");
  const classFilter = document.getElementById("classFilter");
  const dangerFilter = document.getElementById("dangerFilter");
  const habitatFilter = document.getElementById("habitatFilter");

  const animalCards = document.querySelectorAll(".animal-card");

  function filterAnimals() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedClass = classFilter.value;
    const selectedDanger = dangerFilter.value;
    const selectedHabitat = habitatFilter.value;

    animalCards.forEach(card => {
      const name = card.dataset.name?.toLowerCase() || "";
      const classValue = card.dataset.class || "";
      const dangerValue = card.dataset.danger || "";
      const habitatValue = card.dataset.habitat || "";

      const matchesSearch = name.includes(searchTerm);
      const matchesClass = !selectedClass || classValue === selectedClass;
      const matchesDanger = !selectedDanger || dangerValue === selectedDanger;
      const matchesHabitat = !selectedHabitat || habitatValue === selectedHabitat;

      const shouldShow = matchesSearch && matchesClass && matchesDanger && matchesHabitat;
      card.style.display = shouldShow ? "block" : "none";
    });
  }

  // Attach filter listeners
  searchInput.addEventListener("input", filterAnimals);
  classFilter.addEventListener("change", filterAnimals);
  dangerFilter.addEventListener("change", filterAnimals);
  habitatFilter.addEventListener("change", filterAnimals);
});
document.addEventListener("DOMContentLoaded", () => {
  const allCards = document.querySelectorAll(".animal-card p:first-of-type");

  allCards.forEach(p => {
    const strong = p.querySelector("strong");
    if (strong) {
      // Get full paragraph text excluding <strong> tag
      const fullText = p.textContent.trim();
      const labelText = strong.textContent.trim();
      
      // Extract the scientific name (the part after "Scientific name:")
      const sciName = fullText.replace(labelText, "").trim();

      // Rebuild the inner HTML with <strong> and <em>
      p.innerHTML = <strong>${labelText}</strong> <em>${sciName}</em>;
    }
  });
});