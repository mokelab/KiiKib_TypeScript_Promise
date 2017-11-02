app.js: *.ts
	tsc -target es6 --locale ja app.ts -out app.js
index.html:	html/*.html
	cd html && sh build.sh
css:
	sass style.scss > style.css