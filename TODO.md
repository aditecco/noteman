# TODO

### It should:

- [x] Offer the ability to create an account
- [ ] Provide an account profile page
- [ ] Provide an account settings page
- [ ] When creating a note, require title & content (form engine/validation)
- [ ] Offer note search functionality
- [ ] When creating a note, optional fields:
  - [ ] tags
- [ ] Offer the ability to change themes (theming system)
- [x] When creating a note, open it in the main content area right after creation
- [x] Allow deleting notes
- [x] Allow editing notes
- [x] Start up w/ the latest note pre-selected
- [x] Show a sidebar w/ a list of notes
- [x] Show a main content area next to the sidebar
- [x] Display notes in creation order
- [x] When clicking on a note, open it in the main content area
- [x] When clicking "create note", replace the main content area w/ a note creation form
- [x] Allow note creation in markdown
- [x] Offer markdown preview

---

### Implementation:

- [ ] clean-up code
- [x] switch to Meteor publications
- [ ] add UI animations
- [x] switch to Meteor methods
- [x] add types
- [x] add a CSS reset
- [x] choose a CSS-in-JS lib
- [x] add fonts (?)
- [ ] refine styles
- [ ] redesign theme based on a standardized format
- [x] Loading states for async ops
- [ ] Error states
- [ ] implement global token in API handler
- [ ] fine-tune methods in API handler
- [ ] implement `unwrapResult` (https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions)

---

### Fixes

- [x] Selected note on /notes load
- [ ] Note update on PUT /notes
- [ ] TS fixes
- [x] extraReducers TS fixes (https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers)
- [x] remove Meteor residual stuff
- [ ] user/token loop in index
- [ ] make styled CSS values dynamic with theme

---

### Optims

- [ ] Move components out of own folders

---

### Ops

- [ ] deploy
