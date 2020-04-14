#! /bin/bash

CURRENT_DIR=$(pwd)

# 既存ディレクトリを削除
rm -rf "${CURRENT_DIR}/front" && "${CURRENT_DIR}/back"

# gitcloneする
GIT_REPO_FRONT=git@github.com:mug1chan/hashigen-front.git
GIT_REPO_BACK=git@github.com:mug1chan/hashigen-back.git
git clone ${GIT_REPO_FRONT} "${CURRENT_DIR}/front"
git clone ${GIT_REPO_BACK} "${CURRENT_DIR}/back"