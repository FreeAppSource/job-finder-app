# JobFinder - Mobile Application

A job search and application mobile application built with **pure JavaScript & JSX** (`.js` / `.jsx`), Expo SDK 58+, and Expo Router, based on the 38 Sketch artboards.

---

## 📱 Features & Screens

### 1. Onboarding & Member Authentication
- **Splash Screen**: Branded JobFinder emblem on Royal Blue (`#475BD8`).
- **Welcome Screen**: *"Welcome Job Hunter - I'm happy to see you, let's explore new dream jobs for your career"*.
- **Authentication**:
  - Full Register form with full name, email, password.
  - Login form with password toggle, forgot password modal, and instant navigation.

### 2. Home Dashboard (`/(tabs)/index`)
- Greeting header: *"Let’s Find Your Dream Jobs"* with user avatar.
- Search input with clear toggle and filter modal (Fulltime, Internship).
- Category filter chips (*All, Design, Engineering, Marketing*).
- **"Jobs For You" Horizontal Carousel**: Curated tech roles from Google, Dribbble, Gojek.
- **"Recently Posted" List**: Fast-loading cards with company logos, roles, locations, and salaries.

### 3. Bookmarks Tab (`/(tabs)/bookmarks`)
- Saved jobs list with instant unsave bookmark toggle and direct apply link.
- Empty state view (*"Bookmarks - No Activities"*) with *"Explore Jobs"* CTA.

### 4. Applications Tracker Tab (`/(tabs)/applications`)
- Status filter pills:
  - `All`
  - `In Review` (`Applycation - Review`)
  - `Interview` (`Applycation - Interview`)
  - `Not Suitable` (`Applycation - Not Suitable`)
- Application cards with Company Logo, Role, Date applied, Status Pill, Resume attached, Detail Jobs link.

### 5. My Account & Profile (`/(tabs)/profile`)
- User header: Avatar, Name (*"Muhamad Fadli"*), Email (*"Fadly00@gmail.com"*).
- Account details:
  - Change Name modal (`Change Name` artboard)
  - Change Email modal (`Email` artboard)
  - Tanggal Lahir (DOB: 12-12-2000)
  - Change Password modal (`Change Password` artboard)
  - Attached Resume (`Cv Muhamad Fadli.pdf`, Uploaded 02 Jul 2021)
  - Logout

### 6. Job Details (`/job-detail?id=...`)
- Header with company logo, title, location, badges (Senior, Design, Fulltime), salary.
- Skills Needed tags (*UI UX Design, Figma, UI Design, Prototyping*).
- Tabs: Description, Requirements, Responsibilities.
- Sticky bottom *"Apply"* button.

### 7. Job Application Flow (`/apply-job` & `/apply-success`)
- Target banner: *"You Will Applying to [Company] as [Job Title]"*.
- Attached resume selector with upload date.
- Contact details: Physical address and phone input (`+62 8123213148`).
- Cover Letter / Application Letter textarea.
- **Success Screen (`/apply-success`)**:
  - Green checkmark confirmation.
  - *"Your applying to [Company] as [Job Title] has been sent"*.
  - *"Explore Jobs"* and *"Track Applications"* buttons.

### 8. Notifications (`/notifications`)
- Activity updates: Application Sent, Interview invites, Profile views.

---

## 🎨 Design System
- **Primary Color**: `#475BD8` (Royal Blue)
- **Primary Light**: `#EBF0FF`
- **Secondary Navy**: `#223263`
- **Background**: `#F6F7FA`
- **Card**: `#FFFFFF`
- **Success**: `#53D1B6`

---

## 🚀 Running the App

```bash
npx expo start
```

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Job Finder** design by **Fadli Creative**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Fadli Creative](https://www.sketchappsources.com/contributor/fadlicreative) |
| Original design | Job Finder |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4744-job-finder-sketch-freebie-resouce.html) |
| Original file | `job-finder-fadli-creative.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Job Finder" by Fadli Creative (https://www.sketchappsources.com/contributor/fadlicreative), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4744-job-finder-sketch-freebie-resouce.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
