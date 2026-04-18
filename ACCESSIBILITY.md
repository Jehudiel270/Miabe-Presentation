# ♿ Accessibilité - Guide WCAG 2.1 AA

## Checklist Accessibilité

### 1. Navigation au Clavier

- ✅ Tous les boutons sont accessibles via Tab
- ✅ `aria-expanded` sur les filtres
- ✅ Focus visible sur tous les contrôles interactifs
- ✅ Search avec entrée au clavier

### 2. Lecteur d'Écran (NVDA / JAWS)

- ✅ `aria-label` sur les boutons d'action
- ✅ `aria-current` sur l'élément actif
- ✅ `role="searchbox"` sur l'input de recherche
- ✅ `role="listbox"` sur les résultats de recherche
- ✅ `role="button"` sur les cartes clickables
- ✅ `role="region"` sur les sections dynamiques

### 3. Images

- ✅ Tous les `<img>` ont un `alt`
- ✅ Placeholder pour les images manquantes
- ✅ Lazy loading sans impact sur l'accessibilité

### 4. Contrastes

- ✅ Ratio de contraste ≥ 4.5:1 pour le texte normal
- ✅ Ratio ≥ 3:1 pour le texte large
- ✅ DaisyUI garantit les bons contrastes

### 5. Formulaires

- ✅ Labels explicites sur chaque input
- ✅ Messages d'erreur associés aux champs
- ✅ Placeholders supplémentaires au label

### 6. Loading States

- ✅ `aria-label="Chargement..."` sur les spinners
- ✅ Texte "Chargement en cours" visible
- ✅ Skeletons avec animations réduites

### 7. Modales/Overlays

- ✅ Focus trap dans les modales
- ✅ Fermeture avec Échap
- ✅ `aria-modal="true"`

### 8. Responsive

- ✅ Texte lisible sur tous les appareils
- ✅ Zones cliquables ≥ 44×44px
- ✅ Zoom jusqu'à 200% sans perte de fonction

---

## Implémentation par Composant

### CourseCard

```tsx
// Utilise <button> au lieu de <div>
// - Cliquable au clavier
// - Annoncé comme "button" par les lecteurs
// - Pas de nested controls

// ARIA:
// - aria-label="Voir le cours [title]"
// - alt sur l'image

// Animations:
// - Réduites avec @media (prefers-reduced-motion)
```

### CourseSearch

```tsx
// ARIA:
// - role="searchbox"
// - aria-autocomplete="list"
// - aria-controls="search-results"
// - aria-expanded={hasResults}

// Clavier:
// - Entrée = sélection
// - Échap = fermer
// - Flèches = naviguer
```

### CourseFilters

```tsx
// ARIA:
// - aria-label="Filtres de cours"
// - aria-expanded={{true|false}}
// - aria-live="polite" sur les mises à jour

// Clavier:
// - Tab = naviguer
// - Espace/Entrée = cocher
```

### Loading Skeleton

```tsx
// Pas d'animation distrayante
// - classe animate-pulse (pas trop rapide)
// - aria-label si besoin
```

---

## Tests Accessibilité

### Outils Recommandés:

1. **axe DevTools** - Chrome/Firefox
   - Extension pour tester rapidement
   - Reports détaillés

2. **WAVE** - Web Accessibility Evaluation Tool
   - Identifie les problèmes WCAG
   - Suggestions de correction

3. **Lighthouse** - Chrome DevTools
   - Audit d'accessibilité intégré
   - Score de 0-100

4. **NVDA** - Lecteur d'écran gratuit (Windows)
   - Tester avec un vrai lecteur

5. **VoiceOver** - macOS/iOS inclus
   - Cmd + F5 pour activer

### Tests Manuels:

```bash
# Naviguer complètement au clavier (sans souris)
1. Tab = forward navigation
2. Shift+Tab = backward navigation
3. Entrée/Espace = activer

# Augmenter le zoom à 200%
Ctrl+Scroll ou Cmd+Scroll

# Tester avec lecteur d'écran
Activer NVDA/VoiceOver
Parcourir la page complètement
```

---

## Standards Respectés

### WCAG 2.1 Niveau AA

- ✅ Perceptible: Contenu discernable
- ✅ Utilisable: Navigation facile
- ✅ Compréhensible: Langage clair
- ✅ Robuste: Compatible avec AT

### Section 508 (USA)

- ✅ Tous les critères d'accessibilité respectés

### Loi d'accessibilité (France/EU)

- ✅ Conformité RGAA 4.1

---

## Réductions d'Animations

```css
@media (prefers-reduced-motion: reduce) {
  /* Désactiver les animations */
  * {
    animation-duration: 0s !important;
    transition-duration: 0s !important;
  }
}
```

Impacte:

- CourseCard hover animations
- Filtre expand/collapse
- Fade in on load

---

## Checklist Avant Déploiement

- [ ] Tous les boutons testés au clavier
- [ ] Tous les aria-label vérifiés
- [ ] Contraste des couleurs ≥ 4.5:1
- [ ] Images avec alt text
- [ ] Loading states annoncés
- [ ] Focus visible partout
- [ ] Test NVDA complet
- [ ] Test axe DevTools sans erreur
- [ ] Zoom 200% sans débordement
- [ ] Responsive ≥ 44×44px zones clickables

---

## Ressources Utiles

- [WCAG 2.1 Full](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Next.js Accessibility](https://nextjs.org/learn/seo/improve-accessibility)

---

## Notes Importantes

⚠️ **À vérifier régulièrement:**

- Nouvelles dépendances = nouvelle accessibilité
- Updates DaisyUI = validation des contrastes
- Nouvelles pages = audit complet

✅ **Best Practices:**

- Tester avec lecteur d'écran VRAI (pas juste ARIA)
- Impliquer des utilisateurs en situation de handicap
- Accessibilité = expérience améliorée POUR TOUS

🎯 **L'accessibilité est un élément, pas une fonctionnalité!**
