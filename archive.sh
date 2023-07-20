#!/usr/bin/env bash

version=$(cat manifest.json | jq -r '.version')
zip $(basename $(pwd))-${version}.zip manifest.json popup/*
