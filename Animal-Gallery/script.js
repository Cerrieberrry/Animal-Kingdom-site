const searchInput = document.getElementById("navSearch");
const classFilter = document.getElementById("classFilter");
const dangerFilter = document.getElementById("dangerFilter");
const habitatFilter = document.getElementById("habitatFilter");
const animalCards = document.querySelectorAll(".animal-card");
const randomBtn = document.getElementById("randomAnimalBtn");
const triviaBtn = document.getElementById("trivia-btn");
const triviaQuestion = document.getElementById("trivia-question");
const optionsContainer = document.getElementById("options-container");
const triviaFeedback = document.getElementById("trivia-feedback");
// 🧠 Trivia Data
const triviaData = [
  {
    question: "Which animal is known as the king of the jungle?",
    options: ["Tiger", "Elephant", "Lion", "Gorilla"],
    answer: "Lion"
  },
  {
    question: "Which bird is the largest and cannot fly?",
    options: ["Eagle", "Parrot", "Ostrich", "Penguin"],
    answer: "Ostrich"
  },
  {
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Horse", "Lion", "Leopard"],
    answer: "Cheetah"
  },
  {
    question: "Which of these animals is a mammal?",
    options: ["Shark", "Frog", "Whale", "Eagle"],
    answer: "Whale"
  },
  {
    question: "Which animal uses its long neck to reach tall trees?",
    options: ["Elephant", "Giraffe", "Zebra", "Camel"],
    answer: "Giraffe"
  },
  {
    question: "Which bird can mimic human speech?",
    options: ["Eagle", "Ostrich", "Parrot", "Hawk"],
    answer: "Parrot"
  },
  {
    question: "Which animal has blue blood?",
    options: ["Human", "Frog", "Horse", "Octopus"],
    answer: "Octopus"
  },
  {
    question: "What animal never sleeps?",
    options: ["Shark", "Snake", "Butterfly", "Jellyfish"],
    answer: "Jellyfish"
  },
  {
    question: "Which animal is known to have the strongest bite force?",
    options: ["Lion", "Hyena", "Crocodile", "Bear"],
    answer: "Crocodile"
  },
  {
    question: "Which class of animals lays eggs and also feeds their young with milk?",
    options: ["Aves", "Reptilia", "Monotremes", "Mammalia"],
    answer: "Monotremes"
  },
  {
    question: "Which animal can survive being frozen and thawed multiple times?",
    options: ["Frog", "Lizard", "Tardigrade", "Bat"],
    answer: "Tardigrade"
  },
  {
    question: "What is the primary function of an animal's camouflage?",
    options: ["Attract mates", "Blend with surroundings", "Show dominance", "Regulate temperature"],
    answer: "Blend with surroundings"
  },
  {
    question: "Which of these animals is an invertebrate?",
    options: ["Snake", "Crab", "Shark", "Penguin"],
    answer: "Crab"
  }
];

// 🔎 Filter Logic
function filterAnimals() {
  const searchText = searchInput.value.toLowerCase();
  const selectedClass = classFilter.value.trim()
  const selectedDanger = dangerFilter.value.trim()
  const selectedHabitat = habitatFilter.value.trim()

  animalCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const classValue = card.dataset.class.trim()
    const dangerValue = card.dataset.danger.trim()
    const habitatValue = card.dataset.habitat.trim()
    console.log("Comparing:", classValue, "===", selectedClass);
    const matchesSearch = name.includes(searchText);
    const matchesClass = !selectedClass || classValue === selectedClass;
    const matchesDanger = !selectedDanger || dangerValue === selectedDanger;
    const matchesHabitat = !selectedHabitat || habitatValue === selectedHabitat;

    if (matchesSearch && matchesClass && matchesDanger && matchesHabitat) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 🎯 Highlight Random Animal
randomBtn.addEventListener("click", () => {
  const visibleCards = Array.from(animalCards).filter(card => card.style.display !== "none");
  if (visibleCards.length > 0) {
    const randomIndex = Math.floor(Math.random() * visibleCards.length);
    const randomCard = visibleCards[randomIndex];
    randomCard.scrollIntoView({ behavior: "smooth", block: "center" });
    randomCard.classList.add("highlight");
    setTimeout(() => randomCard.classList.remove("highlight"), 2000);
  }
});
// 🧠 Load Trivia Question
function loadTrivia() {
  const randomTrivia = triviaData[Math.floor(Math.random() * triviaData.length)];
  
  // Display the question
  triviaQuestion.textContent = randomTrivia.question;
  optionsContainer.innerHTML = "";

  // Create and append answer option buttons
  randomTrivia.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => {
      if (option === randomTrivia.answer) {
        triviaFeedback.textContent = "✅ Correct!";
        triviaFeedback.style.color = "green";
      } else {
        triviaFeedback.textContent = `❌ Wrong! Correct answer: ${randomTrivia.answer}`;
        triviaFeedback.style.color = "red";
      }
    };
    optionsContainer.appendChild(button);
  });
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "➤"; 
  nextBtn.classList.add("next-arrow");
  nextBtn.onclick = loadTrivia;
  optionsContainer.appendChild(nextBtn);
  // Reset feedback message and scroll into view
  triviaFeedback.textContent = "";
  triviaQuestion.scrollIntoView({ behavior: "smooth", block: "center" });
}
// 🧩 Event Listeners
searchInput.addEventListener("input", filterAnimals);
classFilter.addEventListener("change", filterAnimals);
dangerFilter.addEventListener("change", filterAnimals);
habitatFilter.addEventListener("change", filterAnimals);
triviaBtn.addEventListener("click", loadTrivia);