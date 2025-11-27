# AudioBook Gaming Automation Interface - Design Guidelines

## Design Approach

**Custom Gaming Dashboard** - Utility-focused automation tool with distinctive ember/magma aesthetic. This is an application interface, not a marketing page. Design prioritizes functionality, quick access to controls, and clear status feedback while maintaining the established gaming atmosphere.

## Core Aesthetic

**Ember/Magma Theme**: Deep ember browns (#1B0F0B, #29140E, #3A1C10) with molten orange/gold accents (#D4631C, #FFE3AA, #E8B449). The psychedelic magma background image is essential - use as a full-viewport background with 60% opacity overlay to ensure text readability.

Gaming icons (fire, sword, trophy, target, power) should be integrated throughout the interface to reinforce the theme.

## Typography

**Font Stack**: 
- Headers: Georgia, serif (16-18px bold for section titles, 14px for subsections)
- Body/Labels: Georgia, serif (10-11px regular)
- Data/Monospace: Consolas, monospace (9-10px for hotkey displays, technical data)

**Hierarchy**: Gold (#FFE3AA) for primary headers, warm beige (#F9D8A0) for body text, subdued tan (#DAB273) for secondary labels.

## Layout System

**Single Dashboard View** (no scrolling needed):
- Top bar: Profile management with dropdown, New/Rename/Delete actions, Status indicator with large toggle button (right-aligned)
- Main content: Two-column layout below top bar
  - Left column (60%): Hotkey configuration form, click recorder controls, auto-target settings
  - Right column (40%): Hotkey list table with edit/delete actions

**Spacing**: Use Tailwind units of 2, 4, 6, and 8 consistently (p-4, m-2, gap-6, etc.)

**Borders**: All panels use layered border treatment - outer highlight border (#D4631C, 3px ridge), inner dark border (#7A2E1B, 2px), inset panel backgrounds (#3A1C10)

## Component Library

**Panels/Cards**: 
- Outer frame: border-highlight color with ridge effect
- Inner border: rust iron color (#7A2E1B)
- Background: inset surface color (#3A1C10)
- Padding: 4-6 units internal spacing

**Buttons**:
- Default: #8F3A1C background, hover #B44C1E, gold text, raised border (2px)
- Destructive (Delete): #611B1C background, same hover treatment
- Icon buttons: 32x32px for primary actions (power toggle), 20x24px for secondary (add, edit)

**Form Inputs**:
- Background: #29140E with #7A2E1B border
- Text: #F9D8A0
- Focus: #ED9444 glow effect (2px outline)
- Dropdowns: Same styling, 20px height

**Status Indicator**:
- Large, prominent (top-right)
- ON state: Gold text (#E8B449), gold background on toggle button
- OFF state: Dark ember text (#5A1F1F), dark background
- Toggle button: Circular power icon (32x32) or [O] text fallback, raised border (3px)

**Tables/Lists**:
- Headers: Border color background (#7A2E1B), gold text, bold
- Rows: Alternating #29140E and #3A1C10 backgrounds
- Selected: #C2551E highlight
- Columns: Hotkey (150px), Click Sequence (flexible), Delay (120px), Actions (80px)

**Key Binding Display**:
- Monospace font (Consolas)
- Pill-shaped badges for individual keys
- Background: #8F3A1C, text: #FFE3AA
- Connected with + symbols

## Images

**Background**: Psychedelic magma texture covering full viewport (900x950px reference), darkened to 60% opacity for readability

**Icons** (integrate via CDN - Font Awesome):
- Fire icon: Section headers, active states
- Sword icon: Combat-related controls
- Trophy icon: Achievement/status markers  
- Target/crosshair: Auto-target features
- Power icon: Main ON/OFF toggle
- Location pin: Position recording
- Plus/Edit/Delete icons: Standard CRUD actions

**Custom Graphics**: Checkbox states (green ON checkmark, red OFF X) for toggle switches

## Interaction Patterns

**Recording Mode**: 
- Button changes visual state (different border color #ED9444, pulsing animation)
- Click positions shown as coordinate overlays
- Stop recording finalizes sequence

**Profile Switching**:
- Dropdown selection immediately loads new profile
- Brief loading state (subtle pulse) during switch
- No page refresh

**Hotkey Configuration**:
- Click input field to activate "Press any key" state
- Key combination captured in real-time
- Display formatted as badge sequence
- Validation feedback (duplicate key warning in ember red)

**Auto-Target Calibration**:
- HSV sliders with real-time preview
- "Calibrate" button triggers screen capture
- Success/failure feedback with color-coded messaging

## Accessibility

- Maintain 4.5:1 contrast ratio between gold text (#FFE3AA) and dark backgrounds
- Focus states use bright ember glow (#ED9444)
- All interactive elements have 44px minimum touch targets
- Keyboard navigation through all controls (tab order: profile → status toggle → form fields → table)

## Critical Implementation Notes

- This is a desktop application interface - optimize for 900x950px viewport minimum
- All functionality accessible without scrolling
- Status indicator MUST be highly visible and responsive to toggle
- Magma background is essential to the brand identity - implement with proper contrast overlays
- Gaming aesthetic should feel powerful and professional, not cartoonish