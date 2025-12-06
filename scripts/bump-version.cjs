const fs = require("fs");
const path = require("path");

const type = process.argv[2] || "minor";

const rootDir = path.resolve(__dirname, "..");
const versionPath = path.join(rootDir, "VERSION");
const changelogPath = path.join(rootDir, "CHANGELOG.md");

function readFileSafe(p, fallback = "") {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return fallback;
  }
}

let current = readFileSafe(versionPath, "0.0.0").trim() || "0.0.0";
let [major, minor, patch] = current.split(".").map((n) => parseInt(n, 10) || 0);

if (type === "major") {
  major += 1;
  minor = 0;
  patch = 0;
} else if (type === "patch") {
  patch += 1;
} else {
  // minor по умолчанию
  minor += 1;
  patch = 0;
}

const next = `${major}.${minor}.${patch}`;

// Обновляем VERSION
fs.writeFileSync(versionPath, next + "\n", "utf8");

// Обновляем CHANGELOG: добавляем заглушку секции, если её ещё нет
let changelog = readFileSafe(changelogPath, "# Changelog — ASKED Store\n\n");

if (!changelog.includes(`## ${next}`)) {
  const lines = changelog.split("\n");
  const titleIndex = lines.findIndex((l) => l.startsWith("# "));

  const newSection = [
    "",
    `## ${next} — TODO: описать изменения`,
    "",
    "- TODO: заполнить список изменений",
    ""
  ].join("\n");

  if (titleIndex !== -1) {
    // вставляем секцию сразу после заголовка
    const insertIndex = titleIndex + 1;
    lines.splice(insertIndex, 0, newSection);
    changelog = lines.join("\n");
  } else {
    // на всякий случай просто допишем в начало
    changelog = `${newSection}\n${changelog}`;
  }

  fs.writeFileSync(changelogPath, changelog, "utf8");
}

console.log(next);


