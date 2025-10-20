# Remaining Tasks

## Completed ✅
1. Added 3 new newsletters to manifest (Weeks 10, 11, 12)
2. Removed hover pop/scale effect from Home page buttons

## Still To Do

### 3. About Page Redesign
- Remove "Our Team" section
- Add interactive world map showing countries: USA, UK, South Africa, India, Thailand, Canada, Philippines
- Make About page full-screen with scroll-down animation
- Structure: Hero section → Scroll down indicator → Our Approach section

### 4. Financial Literacy Page
- Add counting animation for numbers (count to 50 for "Interactive Lessons")
- Change "Sign in to start learning" to "Start Learning"

### 5. Open Source Page
- Fix "100% Open Source" color to match MIT orange
- Add all 17 repositories:
  1. AraAI
  2. Cryptvault
  3. MeridianAlgo
  4. TradeRiser
  5. Bitflow
  6. Apex-Analysis
  7. Python-Packages
  8. Adaptive-MA-Selection
  9. Portfolio-Optimization
  10. Portfolio-Optimization-Research
  11. Option-Pricing-Research
  12. FinAI
  13. TimeSeries-Prediction-Research
  14. Utils
  15. Bitflow-Original
  16. Javascript-Packages
  17. In-NodeJS

## Implementation Notes

### Map Component
- Use a library like `react-simple-maps` or `react-leaflet`
- Highlight countries: USA, UK, South Africa, India, Thailand, Canada, Philippines
- Add markers or colored regions

### Counting Animation
- Use `react-countup` or custom animation
- Trigger when element comes into viewport
- Count from 0 to 50 smoothly

### Repository Cards
- Extract from GitHub API or hardcode
- Include: name, description, language, license, stars
- Maintain consistent card design
