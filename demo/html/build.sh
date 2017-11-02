#!/bin/sh

out=`cat head.htm`
for file in `ls *.html`; do
    id=`echo $file | sed -e 's/\.html/Template/'`
    body=`cat $file`
    out="$out\n  <script id=\"$id\" type=\"text/ractive\">\n$body\n  </script>"
done
tail=`cat tail.htm`
out="$out\n$tail"
echo "$out" > ../index.html