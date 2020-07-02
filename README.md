# renekann.de

My personal website at [www.renekann.de](https://www.renekann.de) built with Hugo and hosted on Netlify.

# Preconditions
- Install https://github.com/nvm-sh/nvm
- Install node v12.13.1 along with npm
- npm install hackmyresume -g
- npm install --global gulp-cli
- run `npm install`

# Local development
- run `hugo server -D` to  start Hugo Server
- run `gulp`
- run `build.sh all` in folder `cv` to build all types (PDF and Word in en + de)

# Update Theme
Changes to themes CSS and JS must be done on the `/themes/renekann.de/static` folder

# Update Resume and content
- Update the resume files in `data/en` and `data/de`
- Contents for partials are either pulled from resume files or `content` folder

# Update Layouts
In `layouts/partials`

# Deployment
- Push to master branch will update the live version on netlify