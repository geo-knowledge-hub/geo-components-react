#
# This file is part of GEO-Components-React.
# Copyright (C) 2022 GEO Secretariat.
#
# GEO-Components-React is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.
#

#
# General definitions
#
BASE_DIRECTORY=$PWD

VERDACCIO_USERNAME=foo
VERDACCIO_PASSWORD=test
VERDACCIO_EMAIL=test@test.org

VERDACCIO_LOCAL_REGISTRY=http://127.0.0.1:4873
VERDACCIO_DOCKER_REGISTRY=http://127.0.0.1:4873

GEO_KNOWLEDGE_HUB_ORGANIZATION_URL=https://github.com/geo-knowledge-hub

#
# Auxiliary functions
#

# Name: extract_from_quotes
# Description: Extract values between quotes in a string
extract_from_quotes() {
	echo "$1" | cut -d'"' -f 2
}

#
# 1. Configuring the required services to build
#
docker-compose -f docker/builder/docker-compose.yml up -d

#
# 2. Authenticating on registry
#

# installing utility tool to auth
npm install -g npm-cli-login

# authenticating
npm-cli-login \
    -u $VERDACCIO_USERNAME \
    -p $VERDACCIO_PASSWORD \
    -e $VERDACCIO_EMAIL \
    -r $VERDACCIO_LOCAL_REGISTRY

echo @geo-knowledge-hub:registry=${VERDACCIO_DOCKER_REGISTRY} > ~/.npmrc

#
# 3. Publishing JavaScript dependencies from `geo-components-react` to verdaccio
#

# extract the dependencies from the `geo-knowledge-hub`
# note: `@geo-knowledge-hub` is the scope defined to the `geo-knowledge-hub` packages
JAVASCRIPT_DEPENDENCIES_VERSION=`cat package.json | grep -e @geo-knowledge-hub/ | tail -n 2`
JAVASCRIPT_DEPENDENCIES_ARRAY=(${JAVASCRIPT_DEPENDENCIES_VERSION//,/ })

# creating a build temporary file
mkdir build-tmp-dir
cd build-tmp-dir

for ((i=0;i< ${#JAVASCRIPT_DEPENDENCIES_ARRAY[@]} ; i+=2));
do

	PACKAGE_NAME=`extract_from_quotes ${JAVASCRIPT_DEPENDENCIES_ARRAY[i]}`
  PACKAGE_NAME=${PACKAGE_NAME//@geo-knowledge-hub\/''}

	PACKAGE_VERSION=`extract_from_quotes ${JAVASCRIPT_DEPENDENCIES_ARRAY[i + 1]}`

	# checking if is a branch or tag
  if [[ "$PACKAGE_VERSION" != b* ]]; then
      PACKAGE_VERSION=v$PACKAGE_VERSION
  fi

  # by now, only master branch dependencies are available.
  PACKAGE_VERSION=master

  if [[ ! -d "$PACKAGE_NAME" ]]; then

      git clone --branch $PACKAGE_VERSION $GEO_KNOWLEDGE_HUB_ORGANIZATION_URL/$PACKAGE_NAME $PACKAGE_NAME
      cd $PACKAGE_NAME

      npm install
      npm run build
      npm publish --registry $VERDACCIO_LOCAL_REGISTRY

      cd ../..

      npm install @geo-knowledge-hub/$PACKAGE_NAME
      cd build-tmp-dir
  fi
done

cd ..
rm -rf build-tmp-dir
