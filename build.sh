#!/bin/sh
cd src/api/impl
tsc -target es6 \
KiiAppAPI.ts \
KiiBucketAPI.ts \
KiiObjectAPI.ts \
KiiACLAPI.ts \
-d \
-out ../../../bin/KiiLib.js 
