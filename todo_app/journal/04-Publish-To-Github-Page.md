#04: Publish To Github Page:

applying the technique found here https://github.com/rafrex/spa-github-pages (and using their 404.html and part of their index.html)
I sucessfully used the react browser inside github page system.

To deploy :
npm run build
cp -r build /tmp/tmpBuild
git checkout origin master
mv /tmp/tmpBuild/* .
git add -i .
git commit -m "publication"
git push origin master






note to self : 
	git :  rebase - stash - reset 
	formspee : https://formspree.io
	submodule and GH pages : https://help.github.com/articles/using-submodules-with-pages/