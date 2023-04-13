git add .
npm version patch
git commit -m "updates"
npm run build
npm publish --access public