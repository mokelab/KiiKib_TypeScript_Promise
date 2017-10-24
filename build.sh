#!/bin/sh
cd src/api/impl
tsc -target es6 \
KiiAppAPI.ts \
KiiUserAPI.ts \
KiiBucketAPI.ts \
KiiObjectAPI.ts \
KiiACLAPI.ts \
KiiServerAPI.ts \
KiiThingAPI.ts \
KiiAdminAPI.ts \
-d \
-out ../../../bin/KiiLib.js 
