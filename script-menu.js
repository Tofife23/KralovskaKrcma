const foods = [
  "Pečená kachna s knedlíky a zelím",
  "Smažený řízek s bramborovým salátem",
  "Hovězí guláš s chlebem",
  "Grilovaný losos s pečenými bramborami"
];

const drinks = [
  "Pilsner Urquell",
  "Budvar",
  "Nealkoholické pivo",
  "Domácí limonáda",
  "Káva"
];

const rollButton = document.getElementById("rollButton");
const foodInner = document.getElementById("foodInner");
const drinkInner = document.getElementById("drinkInner");

function populateRoller(items, inner) {
  inner.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    items.forEach(item => {
      const div = document.createElement("div");
      div.textContent = item;
      inner.appendChild(div);
    });
  }
}

function roll(items, inner) {
  populateRoller(items, inner);

  const totalItems = inner.children.length;
  const itemHeight = 50; // stejná výška jako v CSS
  const randomStop = Math.floor(Math.random() * items.length);
  const finalIndex = totalItems - items.length + randomStop;

  const translateY = -finalIndex * itemHeight;

  // Spuštění animace
  requestAnimationFrame(() => {
    inner.style.transform = `translateY(${translateY}px)`;
  });
}

rollButton.addEventListener("click", () => {
  // Reset pozice
  foodInner.style.transition = "none";
  drinkInner.style.transition = "none";
  foodInner.style.transform = "translateY(0)";
  drinkInner.style.transform = "translateY(0)";

  // Spuštění nové animace
  setTimeout(() => {
    foodInner.style.transition = "transform 3s cubic-bezier(0.25, 1, 0.5, 1)";
    drinkInner.style.transition = "transform 4s cubic-bezier(0.25, 1, 0.5, 1)";
    roll(foods, foodInner);
    roll(drinks, drinkInner);
  }, 50);
});
