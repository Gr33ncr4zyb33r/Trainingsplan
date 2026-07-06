# 💪 Trainingsplan – Persönliche Trainings-PWA

Eine moderne Progressive Web App (PWA) zur Verwaltung deines persönlichen Trainingsplans.

## Features

- 📱 **Mobile-First Design** – optimiert für Smartphone
- 🌙 **Dark Theme** – modernes, augenfreundliches Design
- 📲 **Installierbar als PWA** – füge die App zum Homescreen hinzu
- 💾 **Lokale Datenspeicherung** – alle Daten bleiben auf deinem Gerät (localStorage)
- 🔒 **Keine Anmeldung** – kein Account, keine Cloud
- 🚀 **GitHub Pages** – einfaches Deployment

## Trainingsplan

| Tag        | Übungen |
|------------|---------|
| Montag     | Bankdrücken, Langhantelrudern, Schulterdrücken, Klimmzüge, Enges Bankdrücken, Schrägbankcurl, Kabel Trizepsdrücken |
| Donnerstag | Kniebeuge, Rumänisches Kreuzheben, Beinstrecker, Beinbeuger, Wadenheben, Latzug/Klimmzüge, Face Pulls |
| Freitag    | Schrägbankdrücken, Kabelrudern, Klimmzüge breit, Seitheben, SZ-Curls, Hammer Curls, Overhead Trizeps, Dips |

## Navigation

- **Heute** – Aktuelle Trainingseinheit mit Sätzen, Gewichten, Wiederholungen, RIR und Notizen
- **Trainingsplan** – Übersicht des gesamten Plans
- **Fortschritt** – Trainingshistorie, persönliche Rekorde, Körpergewicht
- **Einstellungen** – Gewichte anpassen, Daten verwalten

## Automatische Progression

- Wenn alle Sätze am oberen Wiederholungsbereich abgeschlossen: **+2,5 kg empfohlen** (Beinübungen: +5 kg)
- Nach **Woche 6**: Deload-Empfehlung

## Befehle

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Build lokal testen
npm run preview

# Auf GitHub Pages deployen
npm run deploy
```

## Deployment auf GitHub Pages

1. Repository auf GitHub pushen
2. `npm run deploy` ausführen
3. In den Repository-Einstellungen GitHub Pages auf `gh-pages` Branch setzen
4. App ist verfügbar unter: `https://Gr33ncr4zyb33r.github.io/Trainingsplan/`

## Technik

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** (HashRouter für GitHub Pages)
- **vite-plugin-pwa** – Service Worker & Web App Manifest
- **gh-pages** – Deployment

## PWA Installation

### Android (Chrome)
1. Website öffnen
2. Menü → „Zum Startbildschirm hinzufügen"

### iOS (Safari)
1. Website öffnen
2. Teilen → „Zum Home-Bildschirm"
