# Twin Cities Animal Rescue — Student Website

Four-page responsive student demonstration website. Images are generated illustrations, not actual animals, volunteers, or rescue facilities.

## GitHub Pages deployment
1. Extract the ZIP file on your computer.
2. Upload ALL extracted files and the `media` folder to the ROOT of your GitHub repository (not a subfolder).
3. Ensure files are named exactly `index.html`, `services.html`, `about.html`, `contact.html`, `styles.css`, `script.js`.
4. Commit changes. In Settings > Pages, select Deploy from a branch, main, /(root).
5. Visit https://adhikaridamo2001.github.io/Twin-Cities-Animal-Rescue/ and refresh after deployment.

## Features
- Responsive desktop and mobile layout, four-page navigation, images with alt text.
- Opportunity selector with localStorage for selected interest; form remembers name locally.
- Form displays inline validation and demo confirmation; **no submissions are sent** to a server or rescue organization.
- The video section uses a text alternative because no approved video file was supplied.

## Quick tests
- Open all four navigation links.
- Resize browser to mobile width.
- On Volunteer or Foster page, choose Foster and reload; selection should remain.
- Click Send my interest on an empty form; validation errors should appear.
- Complete required fields; a demonstration-only confirmation should appear.
