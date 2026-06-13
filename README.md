# Akshobya Rao: Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-0a0a0b?style=for-the-badge&logo=greensock&logoColor=88CE02)

My personal site. A dark, motion-heavy single page built by hand, no framework and no build
step, around one idea: find the signal in the noise. It covers the three lanes I work across,
mechanical engineering, biotechnology, and software, with a Formula 1 lab and a project wall.

## Highlights

- **Hand-built, zero build step.** Plain HTML, CSS, and JavaScript. No framework, no bundler,
  just three files and a few CDN libraries.
- **Motion design.** GSAP and ScrollTrigger for reveals and the section choreography, Lenis
  for smooth scrolling, a custom blend-mode cursor, a magnetic CTA, a loader, and a live
  canvas "signal" animation in the hero.
- **Liquid-glass UI.** Backdrop-blur nav and cards over a film-grain background, in a tight
  ink-and-accent palette.
- **Accessible and responsive.** Skip link, reduced-motion fallbacks, keyboard-reachable
  navigation, and a mobile menu.

## Sections

- **Hero** with the animated signal canvas
- **Focus**: mechanical engineering, non-invasive health tech, software
- **The case**: why the work holds up (builder, range, initiative, proven)
- **Formula 1 Lab**: links to the F1 telemetry, stewards, fantasy, and helmet projects
- **Projects**: StudentTeachers, Fifty Labs, ILREF, Odometry Sim, Roundtable Rumble, and a
  free file-conversion tool
- **Contact**

## Tech

- **HTML, CSS, vanilla JavaScript** (no framework, no build)
- **GSAP + ScrollTrigger** for animation
- **Lenis** for smooth scroll
- Fonts: Syne (display), Inter (body), Space Mono (mono)

## Run it

It is fully static, so any static server works:

```bash
python3 -m http.server 8099    # then open http://localhost:8099
```

## Structure

```
index.html        # all markup and the section content
css/styles.css    # the full design system and layout
js/main.js        # loader, cursor, smooth scroll, reveals, hero canvas
assets/           # project imagery and headshot
```
