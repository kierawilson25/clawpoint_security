# Clawpoint Security Website

## Project Overview

Build a website for Clawpoint Security, a cybersecurity company that helps anyone who uses technology learn where they might have vulnerabilities and can strengthen their tech stack. They sell this service to businesses.

## Research Requirements

### Current Site Analysis
- Crawl https://www.clawpointsecuritycollective.com/ to understand the current design
- Extract existing content, structure, and messaging

### Competitive Research
- Research other security agencies to create high quality copy that will convey high potential clients to book a call
- Follow agency best practices to maximize the amount of call backs the site will generate

## Design Direction

### Aesthetic & Theme
-  "hunting bad guys" theme
- Feral, stalking-through-the-forest vibe
- The more feral the better

### User Experience Goals
- Break the fourth wall—immersive, Alice in Wonderland feel as users move through the space
- Create a future virtual reality feeling
- Make users feel like they are moving through a physical space
- Lead users through a forest journey to schedule a meeting as the primary CTA

### Specific Design Requirements
- Keep the Infinite View eye animation
- Rework the mission assurance suite cards

## Visual Design Details

### Color Palette
- **Primary Colors**: Black and white
- **Gradients**: Use black-to-white, black-to-green, and dark gradients throughout
- **Secondary Color**: Green (tactical/military green, night vision aesthetic)
- **Accent Color**: Red (use sparingly, only for high-emphasis elements like critical CTAs or alerts)

### Typography
- Military style, tactical aesthetic
- Bold, commanding, "bad ass" presence
- Consider stencil or military-inspired typefaces for headings
- Clean, highly legible fonts for body text
- Strong font weight hierarchy to create impact

### Visual Style Guidelines
- High contrast black and white base
- Tactical, night vision, special ops aesthetic
- Dark mode-first approach
- Sharp, precise edges and elements
- Cinematic, immersive feeling
- Matrix-like or terminal-inspired effects where appropriate

### Animation & Interaction
- Smooth, purposeful animations
- Stalking/predator-like transitions
- Eye animation as signature element
- Hover states that feel tactical and responsive
- Loading states that match the tactical theme

### Mobile Responsiveness
- Fully responsive design across all breakpoints
- Optimized for mobile browser experience
- Touch-friendly interactions
- Maintain immersive experience on smaller screens
- Performance optimized for mobile devices
- Gesture-based interactions where appropriate
- Mobile navigation should feel as tactical and immersive as desktop

## Key Messaging

### Target Audience
- Anyone using technology
- Government/international pursuits

### Unique Differentiator
- Cognitive load reduction


### Business Focus
- Finding security gaps between compliance requirements and mission needs

## Pages to Build

Use information from https://www.clawpointsecuritycollective.com/ to fill out these pages or generate convincing content that can be replaced later:

1. Home
2. About Us
3. Careers
4. Solutions
5. Information
6. Infinite View

## Technical Requirements

### Tech Stack
- React / Next.js app
- Tailwind CSS
- Follow best industry standards

### Development Approach
- Use the Claude Code front end design skill to build all pages
- Use the UX/UI sub agents to ensure good user experience
- Use React architecture subagent to structure things the best possible way

### Component Architecture
- Any reused UI elements should be made into components
- Components should be consistent across the site
- Follow atomic design principles where appropriate

### Performance & Quality Standards
- Lighthouse score: 90+ on all metrics
- Fast page loads optimized for both desktop and mobile
- Smooth animations at 60fps
- Optimized images and assets
- Minimal bundle size
- Progressive enhancement approach

### SEO & Metadata
- Proper meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Optimized for security industry keywords
- Fast Core Web Vitals scores

## Functional Requirements

### Contact & Lead Generation
- Prominent "Schedule a Meeting" CTA throughout the site
- Contact form for inquiries
- Email capture for newsletter/updates (if applicable)
- Clear path from any page to booking a consultation

### Booking Flow
- Seamless transition from "forest journey" experience to booking
- Multiple entry points for scheduling throughout the site
- Mobile-optimized booking experience

## Primary Call to Action

Schedule a meeting/consultation call

## Development Notes

- Prioritize the immersive, tactical aesthetic in all decisions
- Ensure the "feral" and "stalking" theme comes through in interactions
- Test on multiple devices to maintain quality experience
- Keep performance high even with animations and effects

## Work Session Logging (CRITICAL)

**ALL Claude agents MUST log their work to ensure continuity across sessions.**

### Logging Requirements

1. **Create Session Logs** in `.claude/sessions/` directory
   - File format: `YYYY-MM-DD-HH-MM-task-name.md`
   - Example: `2026-01-17-14-30-contact-form-implementation.md`

2. **Log Structure** - Each session log MUST include:
   ```markdown
   # Task: [Task Name]
   Date: [YYYY-MM-DD]
   Time Started: [HH:MM]
   Status: [In Progress / Completed / Blocked]

   ## Objective
   [What you're trying to accomplish]

   ## Progress Made
   - [Bullet point list of completed items]
   - [Include file paths and line numbers when relevant]

   ## Current State
   - [What's working]
   - [What's not working]
   - [Files modified]

   ## Next Steps
   - [What needs to be done next]
   - [Any blockers or dependencies]

   ## Testing Performed
   - [Web QA crawler results]
   - [UI/UX review findings]
   - [Manual testing notes]

   ## Code Changes
   [Brief description of major changes with file references]
   ```

3. **Update Session Logs Throughout Work**
   - Update the log file every 15-30 minutes of work
   - If a session crashes, the next agent can resume from the last log entry
   - Mark files as "In Progress" when working, "Completed" when done

4. **Create Recovery Notes** if you encounter issues
   - Document any errors or problems in `.claude/issues/`
   - Include error messages, stack traces, and attempted solutions

5. **Agent Handoff Protocol**
   - Before ending a session, update the log with current state
   - List any uncommitted changes
   - Note what the next agent should focus on

### Validation Requirements

Before marking any task as complete, MUST use:
- **Web QA Crawler Agent**: Test the implemented features in browser
- **UI/UX Specialist Agent**: Review design quality and user experience
- **React Expert**: Validate code follows React best practices

Document all validation results in the session log.

## Git Workflow (CRITICAL)

**ALWAYS follow this workflow before pushing any changes:**

### Before Every Push:

1. **Fetch and pull the latest main branch**
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   ```

2. **Return to your feature branch**
   ```bash
   git checkout <your-feature-branch>
   ```

3. **Rebase your branch onto main**
   ```bash
   git rebase main
   ```
   - Resolve any conflicts that arise
   - Use `git rebase --continue` after resolving conflicts
   - Use `git rebase --abort` if you need to start over

4. **Push your changes**
   - For new branches: `git push origin <branch-name>`
   - For rebased branches: `git push origin <branch-name> --force-with-lease`

### Important Notes:
- **NEVER push without rebasing onto main first**
- This ensures your branch is always up-to-date with the latest changes
- Prevents merge conflicts and "branch behind main" issues
- Use `--force-with-lease` (NOT `--force`) when pushing after rebase to protect against overwriting others' work
