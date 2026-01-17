# .claude Directory

This directory contains session logs, documentation, and tracking for the Clawpoint Security website project.

## Directory Structure

```
.claude/
├── README.md                    # This file
├── IMPLEMENTATION_PLAN.md       # Comprehensive implementation plan
├── sessions/                    # Session logs for continuity
├── issues/                      # Known issues and blockers
├── content/                     # Extracted content from existing site
└── research/                    # Research notes and decisions
```

## Quick Start for New Sessions

1. **Read First**:
   - `/CLAUDE.md` - Main project requirements
   - `.claude/IMPLEMENTATION_PLAN.md` - Current implementation plan

2. **Check Recent Work**:
   - Look in `.claude/sessions/` for most recent logs
   - Read the latest session log to understand current state

3. **Start Your Session**:
   - Create new session log: `.claude/sessions/YYYY-MM-DD-HH-MM-task-name.md`
   - Use the template from `/CLAUDE.md`
   - Update every 15-30 minutes

4. **Use Validation Agents**:
   - UI/UX Specialist: Design reviews
   - web-qa-crawler: Functional testing
   - code-quality-reviewer: React best practices

5. **Before Ending Session**:
   - Update session log with current state
   - Document next steps
   - List any uncommitted changes
   - Note blockers or issues

## Session Log Template

```markdown
# Task: [Task Name]
Date: [YYYY-MM-DD]
Time Started: [HH:MM]
Status: [In Progress / Completed / Blocked]

## Objective
[What you're trying to accomplish]

## Progress Made
- [Completed items with file references]

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
[Brief description of major changes]
```

## Critical Reminders

- ⚠️ **Always log your work** - Other agents need to resume from your progress
- 🧪 **Test with agents** - UI/UX, web-qa-crawler, React expert
- 🎨 **Maintain tactical theme** - Apex predator, night vision, military aesthetic
- 📱 **Mobile first** - Test responsive design at every step
- ♿ **Accessibility** - WCAG AA compliance required

## Emergency Recovery

If resuming after a crash:
1. Check latest session log in `sessions/`
2. Review "Current State" and "Next Steps"
3. Check `git status` for uncommitted changes
4. Resume from last checkpoint
5. Update log with recovery notes

## Contact

Questions about logging or process? See `/CLAUDE.md` "Work Session Logging" section.
