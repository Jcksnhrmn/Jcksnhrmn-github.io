// pages/index.js

import { useState } from "react";

const alcoholOptions = [
  "Vodka",
  "Rum",
  "Gin",
  "Tequila",
  "Whiskey",
  "Wine",
  "Beer"
];

const mixerOptions = [
  "Orange juice",
  "Cranberry juice",
  "Pineapple juice",
  "Soda water",
  "Cola",
  "Tonic water",
  "Lemonade",
  "Milk / Cream"
];

const fruitOptions = [
  "Lime",
  "Lemon",
  "Orange",
  "Strawberries",
  "Blueberries",
  "Mint",
  "No fruit"
];

// 🔹 This is a placeholder “ChatGPT-ish” generator.
// In your presentation you can say: “Right now this is a mock,
// but this is where we’d call the OpenAI API with our ingredients.”
function generateDrinkSuggestion({ alcohols, mixers, fruits }) {
  const has = (list, item) => list.includes(item);

  let name = "Freestyle Mystery Drink";
  let description = "A custom drink based on what you have on hand.";
  let ingredients = [];
  let steps = [];

  // Some simple “smart” combos
  if (has(alcohols, "Vodka") && has(mixers, "Orange juice")) {
    name = "Lazy Screwdriver";
    description = "Simple, bright, and citrusy vodka + orange combo.";
    ingredients = [
      "2 oz vodka",
      "4–6 oz orange juice",
      fruits.includes("Orange") ? "Orange slice for garnish" : null
    ].filter(Boolean);
    steps = [
      "Fill a glass with ice.",
      "Pour in the vodka.",
      "Top with orange juice and give it a quick stir.",
      "Garnish with an orange slice if you have one."
    ];
  } else if (has(alcohols, "Rum") && has(mixers, "Cola")) {
    name = "Rum & Coke (At Home Edition)";
    description = "Classic and sweet, built in the glass.";
    ingredients = [
      "2 oz rum",
      "4–6 oz cola",
      fruits.includes("Lime") ? "Lime wedge" : null
    ].filter(Boolean);
    steps = [
      "Add ice to a glass.",
      "Pour in the rum.",
      "Top with cola.",
      fruits.includes("Lime")
        ? "Squeeze in a lime wedge and drop it in."
        : "Give it a gentle stir."
    ];
  } else if (has(alcohols, "Tequila") && has(mixers, "Lime juice")) {
    name = "Barebones Tequila Sour";
    description = "A simple tequila + lime combo, like a stripped-down margarita.";
    ingredients = [
      "2 oz tequila",
      "1 oz lime juice",
      "0.5–1 oz simple syrup or sugar (if available)"
    ];
    steps = [
      "Add tequila, lime juice, and sweetener (if using) to a shaker or jar with ice.",
      "Shake or stir well.",
      "Strain into a glass with fresh ice."
    ];
  } else if (alcohols.length === 0 && mixers.length > 0) {
    name = "House Mocktail";
    description = "Non-alcoholic refresher using what you’ve got.";
    const baseMixer = mixers[0];
    ingredients = [
      `${baseMixer}`,
      fruits.length ? `${fruits.join(", ")} for garnish` : null
    ].filter(Boolean);
    steps = [
      `Add ice to a glass and pour in your ${baseMixer}.`,
      fruits.length
        ? "Use your fruit as a garnish or squeeze it in for extra flavor."
        : "Stir and enjoy."
    ];
  } else if (alcohols.length > 0 && mixers.length > 0) {
    const alc = alcohols[0];
    const mix = mixers[0];
    name = `${alc} ${mix} Remix`;
    description = `A simple highball using ${alc.toLowerCase()} and ${mix.toLowerCase()}.`;
    ingredients = [
      `2 oz ${alc.toLowerCase()}`,
      `4–6 oz ${mix.toLowerCase()}`,
      fruits.length ? `${fruits[0]} for garnish` : null
    ].filter(Boolean);
    steps = [
      "Fill a glass with ice.",
      `Pour in the ${alc.toLowerCase()}.`,
      `Top with ${mix.toLowerCase()}.`,
      fruits.length
        ? `Garnish with your ${fruits[0].toLowerCase()}.`
        : "Give it a gentle stir."
    ];
  } else {
    name = "Water or Juice Break";
    description = "Looks like you’re low on ingredients — hydrate and rest.";
    ingredients = ["Whatever non-alcoholic drink you have", "Ice, if you want"];
    steps = [
      "Pour your drink into a glass.",
      "Add ice if you like it cold.",
      "Enjoy a little reset."
    ];
  }

  const imageUrl = `https://via.placeholder.com/600x350.png?text=${encodeURIComponent(
    name
  )}`;

  return { name, description, ingredients, steps, imageUrl };
}

// Multi-select pill component
function MultiSelect({ label, options, selected, onChange, drunkMode }) {
  const toggle = (item) => {
    if (selected.includes(item)) {
      onChange(selected.filter((x) => x !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="section">
      <h2 className={drunkMode ? "section-title drunk" : "section-title"}>
        {label}
      </h2>
      <div className={drunkMode ? "pill-row drunk" : "pill-row"}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={
              selected.includes(opt) ? "pill pill-selected" : "pill"
            }
            onClick={() => toggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [drunkMode, setDrunkMode] = useState(false);
  const [alcohols, setAlcohols] = useState([]);
  const [mixers, setMixers] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [drink, setDrink] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleGenerate = async () => {
    // 👉 In a real app, this is where you’d call your API route
    // that talks to ChatGPT. For now we call our local function.
    const suggestion = generateDrinkSuggestion({ alcohols, mixers, fruits });
    setDrink(suggestion);
  };

  const handleLike = () => {
    if (!drink) return;
    setLikes((prev) => prev + 1);
  };

  const handleDislike = () => {
    if (!drink) return;
    setDislikes((prev) => prev + 1);
    // Optionally auto-generate a new one on dislike:
    // handleGenerate();
  };

  const handleReset = () => {
    setAlcohols([]);
    setMixers([]);
    setFruits([]);
    setDrink(null);
  };

  return (
    <div className={drunkMode ? "page drunk-mode" : "page"}>
      <header className="header">
        <div>
          <h1>What Should I Drink?</h1>
          <p className="tagline">
            Tell me what you have, I’ll tell you what to make. 🥂
          </p>
        </div>
        <button
          type="button"
          className={drunkMode ? "drunk-toggle on" : "drunk-toggle"}
          onClick={() => setDrunkMode((prev) => !prev)}
        >
          {drunkMode ? "🍹 Drunk Mode: ON" : "🥂 Drunk Mode"}
        </button>
      </header>

      <p className="disclaimer">
        Please drink responsibly and only if you are of legal drinking age.
      </p>

      <MultiSelect
        label="1. What alcohol do you have?"
        options={alcoholOptions}
        selected={alcohols}
        onChange={setAlcohols}
        drunkMode={drunkMode}
      />

      <MultiSelect
        label="2. What mixers / other drinks do you have?"
        options={mixerOptions}
        selected={mixers}
        onChange={setMixers}
        drunkMode={drunkMode}
      />

      <MultiSelect
        label="3. Any fruit or garnish?"
        options={fruitOptions}
        selected={fruits}
        onChange={setFruits}
        drunkMode={drunkMode}
      />

      <div className="actions">
        <button
          type="button"
          className={drunkMode ? "primary-btn big" : "primary-btn"}
          onClick={handleGenerate}
        >
          {drunkMode ? "BIG GREEN BUTTON: SHOW MY DRINK" : "What can I make?"}
        </button>
        <button
          type="button"
          className="secondary-btn"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <main className="result-area">
        {drink ? (
          <div className="drink-card">
            <img
              src={drink.imageUrl}
              alt={drink.name}
              className="drink-image"
            />
            <h2>{drink.name}</h2>
            <p className="drink-description">{drink.description}</p>

            <div className="drink-columns">
              <div>
                <h3>Ingredients</h3>
                <ul>
                  {drink.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Steps</h3>
                <ol>
                  {drink.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="feedback-row">
              <button
                type="button"
                className="like-btn"
                onClick={handleLike}
              >
                👍 I’d drink that
              </button>
              <button
                type="button"
                className="dislike-btn"
                onClick={handleDislike}
              >
                👎 Nah, next idea
              </button>
            </div>

            <p className="feedback-stats">
              Likes this session: {likes} | Dislikes this session: {dislikes}
            </p>
          </div>
        ) : (
          <p className="empty-state">
            Pick what you have, then hit{" "}
            <strong>
              {drunkMode ? "BIG GREEN BUTTON" : "What can I make?"}
            </strong>
            .
          </p>
        )}
      </main>

      <footer className="footer">
        <p>
          Built with Next.js • “What Should I Drink?” group project
        </p>
      </footer>
    </div>
  );
}
