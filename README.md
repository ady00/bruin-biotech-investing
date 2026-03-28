# GUIDE TO EDITING CONTENT. (same as the content-guide file)


## read this first

This guide explains how to update the website content without any coding knowledge. 

All the (important) content in this website is stored in Markdown files (
  essentially, a simpler version of a MS Word or Google Doc file
). Markdown files are glorified text files that can be parsed easily; do not 
be scared by them. there is no crazy syntax to memorize, just follow the rules
I have written.

Try to chain major code/content changes together – if you make TOO MANY content changes the provider will rate limit the website. Instead of updating
each individual on the home page once, upload them all in at once and push your
changes then.

To navigate to a particular directory, press on the folders in that order. 
For instance, to navigate to the team members, first press on the content 
folder, then the team folder, then the members folder. Then you will see a 
list of markdown files of teammates.

I have set up the site and its deployment to redeploy (redeployments take 3-4 mins) each time a change in content is detected (deleting an alumni, adding a 
new class, updating a stock pitch, etc). Thus, the only thing you have to worry
about is making those requisite edits (which I go into more detail below) – DO 
NOT touch any other files. If the site fails to update or breaks entirely,
contact Advay at [advayb2018 at gmail dot com].

## Table of Contents
- [Getting Started with GitHub](#getting-started-with-github)
- [Editing Stock Pitches](#editing-stock-pitches)
- [Editing Team Members](#editing-team-members)
- [Editing Placements](#editing-placements)
- [Editing Recruitment Information](#editing-recruitment-information)
- [Adding Images](#adding-images)
- [Publishing Changes](#publishing-changes)

---

## Getting Started with GitHub

1. Go to the repository on GitHub
2. Navigate to the file you want to edit (see sections below)
3. Click the **pencil icon** (Edit) in the top right corner of the file
4. Make your changes
5. Scroll down and click **"Commit changes"**
6. Add a brief description of what you changed (i.e added Fall '26 class)
7. Click **"Commit changes"** again

The website will automatically update within a few minutes after your changes are merged.

---

## Editing Stock Pitches

Stock pitches are stored in: `content/pitches/`

### To Add a New Pitch

1. Go to `content/pitches/` on GitHub
2. Click **"Add file"** > **"Create new file"**
3. Name your file: `company-ticker.md` (e.g., `pfizer-pfe.md`)
4. Copy this template and fill in your information: (look at already existing 
pitches if you're confused):

```markdown
---
company: Company Name
ticker: TICK
thesis: Long
date: March 2025
author: Your Name
pdfUrl: /pitches/your-pitch-file.pdf
---

Write a brief 1-2 sentence summary of the investment thesis here.
```

**Field explanations:**
- `company`: Full company name (e.g., "Pfizer Inc.")
- `ticker`: Stock ticker symbol (e.g., "PFE")
- `thesis`: Either `Long` or `Short`
- `date`: Month and year (e.g., "March 2025")
- `author`: Name of the analyst(s)
- `pdfUrl`: Path to the PDF file (see [Adding Images](#adding-images) for uploading)

### To Edit an Existing Pitch

1. Go to `content/pitches/`
2. Click on the file you want to edit
3. Click the pencil icon and make your changes

### To Remove a Pitch

1. Go to `content/pitches/`
2. Click on the file you want to delete
3. Click the **trash icon** in the top right
4. Commit the deletion

---

## Editing Team Members

Team members are stored in: `content/team/members/`

### To Add a New Team Member

1. Go to `content/team/members/`
2. Click **"Add file"** > **"Create new file"**
3. Name your file: `XX-firstname-lastname.md` (e.g., `16-john-doe.md`)
   - The number at the start controls the display order
4. Copy this template:

```markdown
---
name: First Last
position: Position Title
year: "2027"
image: /team/placeholder.svg
order: 16
---
```

**Field explanations:**
- `name`: Full name
- `position`: Their role (e.g., "President", "Analyst", "Director of Research")
- `year`: Graduation year in quotes (e.g., "2027")
- `image`: Path to headshot image (use `/team/placeholder.svg` if no image yet)
- `order`: Number controlling display order (1 = first, higher = later)

### To Edit a Team Member

1. Go to `content/team/members/`
2. Click on their file
3. Click the pencil icon and make changes

### To Remove a Team Member

1. Go to `content/team/members/`
2. Click on their file
3. Click the trash icon and commit

---

## Editing Placements

Placements are organized by year in: `content/team/placements/`

### To Add Placements for a New Year

1. Go to `content/team/placements/`
2. Click **"Add file"** > **"Create new file"**
3. Name the file with the year: `2028.md`
4. Copy this template:

```markdown
---
year: "2028"
placements:
  - name: Student Name
    company: Company Name
    role: Job Title
    type: Internship
  - name: Another Student
    company: Another Company
    role: Another Role
    type: Full-time
---
```

**Field explanations:**
- `year`: The graduation year in quotes
- `placements`: A list of placement entries
  - `name`: Student's name
  - `company`: Company name (e.g., "Goldman Sachs")
  - `role`: Job title (e.g., "Healthcare IB Summer Analyst")
  - `type`: Either `Internship` or `Full-time`

### To Add a Placement to an Existing Year

1. Go to `content/team/placements/`
2. Open the file for that year (e.g., `2027.md`)
3. Add a new entry under `placements:` following the format above

---

## Editing Recruitment Information

Recruitment content is stored in: `content/recruitment/`

### Updating Application Status

Edit `content/recruitment/config.md`:

```markdown
---
status: open
quarter: Fall
year: "2025"
applicationUrl: https://forms.google.com/your-form-link
---
```

**To open applications:** Change `status: closed` to `status: open`
**To close applications:** Change `status: open` to `status: closed`

### Editing Timeline Events

Events are in `content/recruitment/events/`. Each file is one event:

```markdown
---
name: Info Session
date: October 5, 2025
time: 6:00 PM - 7:00 PM
location: Royce Hall 154
order: 1
---

Description of the event goes here. This text appears on the website under the event name.
```

**Field explanations:**
- `name`: Event name
- `date`: Date of the event (or "TBA")
- `time`: Time of the event (or "TBA")
- `location`: Where it takes place (or "TBA")
- `order`: Display order (1 = first event, 2 = second, etc.)

### Editing FAQs

FAQs are in `content/recruitment/faqs/`. Each file is one question:

```markdown
---
question: Your question here?
order: 1
---

The answer to the question goes here. You can write multiple paragraphs if needed.
```

---

## Adding Images

### Team Headshots

1. Go to `public/team/` on GitHub
2. Click **"Add file"** > **"Upload files"**
3. Upload the image (recommended: square, at least 300x300 pixels)
4. Name it something clear like `john-doe.jpg`
5. Update the team member's file to reference it: `image: /team/john-doe.jpg`

### Stock Pitch PDFs

1. Go to `public/pitches/` on GitHub
2. Click **"Add file"** > **"Upload files"**
3. Upload your PDF
4. Update the pitch file to reference it: `pdfUrl: /pitches/your-file.pdf`

---

## Publishing Changes

After you commit changes on GitHub:

1. **Automatic deployment**: Vercel will automatically detect changes and rebuild the site
2. **Wait 2-5 minutes**: The deployment usually takes a few minutes
3. **Check the site**: Visit the website after ~10 mins to verify your changes appear correctly

### If Something Goes Wrong

- **Build failed**: Check that your formatting is correct (proper indentation, quotes around years)
- **Content not showing** (IMPORTANT): Make sure the file extension is `.md` 
- **Images not loading**: Verify the path starts with `/team/` or `/pitches/`

### HELP!?!??

If you run into issues, reach out to the Advay at the email above.

---

## ref: File Locations (browse to these places to edit the requisite content)

| Content Type | Location |
|-------------|----------|
| Stock Pitches | `content/pitches/` |
| Team Members | `content/team/members/` |
| Placements | `content/team/placements/` |
| Recruitment Config | `content/recruitment/config.md` |
| Timeline Events | `content/recruitment/events/` |
| FAQs | `content/recruitment/faqs/` |
| Team Images | `public/team/` |
| Pitch PDFs | `public/pitches/` |
