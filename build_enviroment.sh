#!/bin/bash
if [ "$BITBUCKET_BRANCH" == "master" ]
then
    export ENVIROMENT="master"
    export STORAGE_URL="mdpps"
    export BASE_URL="https://mdpps.com/api/"
    export CLIENT_SECRET="mdpps"
    export CLIENT_ID="mdpps"
elif [ "$BITBUCKET_BRANCH" == "staging" ]
then
    export ENVIROMENT="staging"
    export STORAGE_URL="mdpps-staging"
    export BASE_URL="https://staging.mdpps.com/api/"
    export CLIENT_SECRET="mdpps"
    export CLIENT_ID="mdpps"
else
    export ENVIROMENT="development"
    export STORAGE_URL="mdpps-dev"
    export BASE_URL="https://dev.mdpps.com/api/"
    export CLIENT_SECRET="2crK9dEiqm55Qx70UST7TomzJ2T9K6hL1GDutxteI8lkG0aaUXEIvIsQtCyVZzZfAewptkKu4f3PshmFp2wDiBBZxBNOer6Aqn9e0o3or11bBLhk1H3CaCz2UoVAAQwU"
    export CLIENT_ID="nZb0dz6LrIwSkuQeirv31Fnpdii72qJJYBsZcTyy"
fi
export PUBLIC_URL=https://$STORAGE_URL.storage.googleapis.com/