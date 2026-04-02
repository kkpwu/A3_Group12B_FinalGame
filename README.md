# Pixel Alignment: Stability Crisis

## 1. Project Title

**Pixel Alignment: Stability Crisis**

## 2. Group Number

**Group 12B** _Members: Karen Wu, Matthew Spong, Frank Le_

## 3. Description

**Pixel Alignment: Stability Crisis** is a serious game developed in p5.js that translates the clinical symptoms of **Generalized Anxiety Disorder (GAD)** into interactive gameplay.

- **Concept:** The game explores the "Worry Loop"—the intersection of chronic pressure, intolerance of uncertainty, and intrusive thoughts.
- **Mechanics:** Players engage in a core **Pattern Matching** task, swapping tiles on a randomized grid to match a target. This focus is disrupted by the **"Anxiety Engine,"** a system of relentless, intrusive pop-up errors that block the player’s view and interaction.
- **Player Experience:** By combining a 60-second "Fight-or-Flight" timer with unavoidable interruptions, the game creates a high-stress environment that builds empathy for the functional impairment experienced by those with GAD.

## 4. Setup and Interaction Instructions

### Setup

1.  **Download:** Ensure all project files and the `/assets` folder are in a single directory.
2.  **Run via VS Code (Recommended):** \* Open the project folder in VS Code.
    - Install the **Live Server** extension.
    - Right-click `index.html` and select **"Open with Live Server"**.
3.  **Run via Browser:** Drag and drop `index.html` into a modern web browser. _Note: Live Server is preferred to prevent local CORS issues with assets._

### Interaction

- **Mouse Click:** Swap grid tiles and click "Close" buttons on pop-up errors.
- **Spacebar:** Toggle **Zen Pause** (Deep Breath mode) to reset the visual field and pause the countdown.
- **'R' Key:** Restart the challenge at any time.

## 5. Iteration Notes

### a. Post-Playtest

1.  **Grid Scale Optimization:** Reduced the grid size from its original dimensions to ensure better visibility and alignment across different screen resolutions, resolving reported scaling issues.
2.  **Anxiety Engine Refinement:** Reduced the frequency of pop-up overrides. Playtest data showed that the initial "Anxiety Spike" was too aggressive, preventing players from learning the core mechanics.
3.  **Interaction Guard:** Implemented a logical "guard" that prevents players from interacting with the grid while pop-ups are active, ensuring the "blocking" nature of intrusive thoughts is felt mechanically.

### b. Post-Showcase

1.  **Complexity Scaling:** Implementing more complex interaction layers, such as requiring specific sequences of clicks or "held" keys to clear advanced anxiety pop-ups, moving beyond simple click-to-close.
2.  **Multi-Channel Affordances:** Adding unique symbols/icons to

## 6. Assets

All visual assets and code were created by Group 12B specifically for this project, except for the following:

- **Zen Stone Imagery:** Original digital composition created by Group 12B, 2026.
- **UI Assets:** Custom window renders designed in p5.js by Karen Wu.

## 7. References

### a. Academic References

Academic References for GAD Research (ACM Format)
[1] Alaa Abd-alrazaq et al. 2022. Effectiveness of serious games for anxiety: A systematic review and meta-analysis. _JMIR Serious Games_ 10, 2 (2022).
[2] Evelyn Behar, Ilyse Dobrow DiMarco, Eric B. Hekler, Jan Mohlman, and Alison M. Staples. 2009. Current theoretical models of generalized anxiety disorder (GAD): Conceptual review and treatment implications. _Journal of Anxiety Disorders_ 23 (2009), 1011–1023.
[3] Benjamin K. et al. 2022. Effects of symptom-simulation interventions on mental health stigma. _JMIR Serious Games_ 10, 2 (2022).
[4] Jinghe Cai et al. 2023. CatHill: An emotion-based interactive storytelling game leveraging cognitive behavioral therapy techniques. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM.
[5] Amanda Ferchaud, Nicholas D. Bowman, and Ashley C. Calhoun. 2020. Reducing mental health stigma through identification and transportation in video games. _Frontiers in Psychology_ 11 (2020).
[6] Johns Hopkins Medicine. n.d. Generalized Anxiety Disorder.
[7] María J. Martínez et al. 2020. Effect of an intervention combining technological resources with a talk by a professional and contact with persons with lived experiences of mental health problems. _Frontiers in Psychology_ 11 (2020), 2240.
[8] Luca Milani et al. 2023. ReWIND: Integrating cognitive behavioral therapy constructs into a story-based serious role-playing game for anxiety. _International Journal of Serious Games_ 10, 3 (2023).
[9] Aneesh K. Mishra and Anuj R. Varma. 2023. A Comprehensive Review of the Generalized Anxiety Disorder. _Cureus_ 15, 9 (2023), e46115.
[10] National Institute of Mental Health. n.d. Generalized Anxiety Disorder: What You Need to Know.
[11] NHS. n.d. Generalised anxiety disorder (GAD).
[12] Neil A. Rector, Danielle Bourdeau, Kate Kitchen, Linda Joseph-Massiah, and Judith M. Laposa. 2024. Anxiety Disorders: An Information Guide. _Centre for Addiction and Mental Health_.
[13] Piyathida Siriaraya et al. 2021. A framework for gamification design in mental health care. _Games for Health Journal_ 10, 4 (2021), 279–293.

### b. Additional Relevant Sources

- Centre for Addiction and Mental Health (CAMH). 2024. _Anxiety Disorders: An Information Guide._
- National Institute of Mental Health (NIMH). n.d. _Generalized Anxiety Disorder: What You Need to Know._
