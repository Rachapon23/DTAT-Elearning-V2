# DTAT-Elearning
E-learning system for DTAT

# Basic of pushing file git
## 1. Add file
git add <_path to file_>
## 2. Check added file status
git status
## 3. Commit file
git commit -m "close #<_your card number_> - <_your message_>"
## 4. Check commit log
git log
## 5. Push file from branch to origin
git push origin <_your branch name_>

# Basic of creating branch in git
## 1. Check all branch
git branch
## 2. Create branch
git checkout -b <_your branch name_>
## 3. Change branch
git checkout <_your target branch_>

# Basic of deleting branch in git
## 1. Move out from branch that you want to delete before delete brach
git checkout main
## 2. Delete branch
git branch -d <_your target branch_>


# Check merge activity
use below command to check which branch is being merge to origin

git log --graph  
