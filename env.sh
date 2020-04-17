#!/bin/sh

output=`aws sts assume-role --role-arn "arn:aws:iam::961937407909:role/deployer" --role-session-name "test"`

export AWS_ACCESS_KEY_ID=`echo $output | grep AccessKeyId | awk -F'[:/]' '{print $NF}' | sed -e 's/"//g' | sed -e 's/,//g' `
export AWS_SECRET_ACCESS_KEY=`echo $output | grep SecretAccessKey | awk '$0 = substr($0, 28)' | sed -e 's/"//g' | sed -e 's/,//'`
export AWS_SESSION_TOKEN=`echo $output | grep SessionToken | awk '$0 = substr($0, 25)' | sed -e 's/"//g' | sed -e 's/,//'`
export AWS_SDK_LOAD_CONFIG=1

