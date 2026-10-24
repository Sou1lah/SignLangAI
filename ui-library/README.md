# LiveKit UI Showcase

Single local entry point for the categorized learning-app UI kit and design reference.
Run from the repository root with `pnpm --filter ui-library storybook`; open http://localhost:6006.
Foundations/Animation includes loaders, confetti, and Nunito typography; Progress and Navigation each have their own Storybook groups.
Learning Path shows color-coded units, lesson progress, and completed, current, available, and locked lessons.
Gamification includes exercise feedback, five streak states, a grouped static and animated leaderboard, badges, and lesson-complete celebration demos.
Animations respect the operating system's reduced-motion preference; browser haptic feedback uses the vibration API when available.
Call controls are static previews only and are not connected to a LiveKit room.
Button styling references the MIT-licensed `thirdparty/duolingo-clone`; adapted heart and points icons are attributed in `THIRD_PARTY_NOTICES.md`.
The clone has no streak component, so the weekly streak card is an original visual template; other icons use Lucide.
