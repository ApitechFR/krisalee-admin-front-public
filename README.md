# `krisalee-admin-front`

|                   |                                       |
|-------------------|---------------------------------------|
| _Projet_          | **Krisalee**                           |
| _Élément_         | Admin Panel                           |
| _Type_            | Front-End                             |
| _Technologies_    | Node, Angular                         |
| _Fork_            | https://github.com/akveo/ngx-admin    |

# Useful commands

```bash
# run a docker for local development
docker run -it --rm -p 8080:8080 -v "$PWD":/usr/src/app -w /usr/src/app node:14 /bin/bash

# setup fork
git remote add upstream git@github.com:akveo/ngx-admin.git
git remote -v

# fetch fork modifications and rebase on them
git fetch upstream
git status
git rebase upstream/master
```