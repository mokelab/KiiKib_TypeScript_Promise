#!/bin/sh
cd src/api/impl
tsc -target es6 KiiAppAPI.ts KiiBucketAPI.ts \
-d \
-out ../../../bin/KiiLib.js 
