1. Check Git Version
git --version

Purpose: Checks whether Git is installed and shows the installed version.

Example:

git --version

Output:

git version 2.45.1
2. Configure Git

First-time setup.

git config --global user.name "John Doe"
git config --global user.email "john@example.com"

Check configuration:

git config --list
3. Clone a Repository

Downloads a remote repository to your local machine.

git clone https://github.com/user/project.git

Example:

git clone https://github.com/spring-projects/spring-petclinic.git

Now you have a local copy.

4. Check Repository Status

Probably the most used command.

git status

Shows:

Modified files
New files
Deleted files
Staged files
Current branch

Example:

modified: UserService.java

Untracked files:
Employee.java
5. View Commit History
git log

Short version:

git log --oneline

Example:

d8923a Added login feature
8bd223 Fixed bug
93dc12 Initial commit
6. Create a New Branch
git branch feature/login

Creates a branch.

7. Switch Branch

Older command:

git checkout feature/login

Modern Git:

git switch feature/login

Create and switch together:

git switch -c feature/login
8. View All Branches
git branch

Output:

main
develop
feature/login

Current branch:

* feature/login
9. Stage Files

Single file:

git add UserService.java

Everything:

git add .

Meaning:

Move changes into the staging area.

Think of staging as preparing a package before sending it.

10. Commit Changes
git commit -m "Added login validation"

A commit is a snapshot of your project.

Good commit:

Added JWT authentication

Bad commit:

Changes
11. Push Changes

Upload commits to GitHub.

git push

First push:

git push origin feature/login
12. Pull Latest Changes

Download changes from GitHub.

git pull

Equivalent to

fetch
+
merge
13. Fetch Changes
git fetch

Downloads updates but doesn't merge them.

Useful when you want to inspect changes before updating your branch.

14. Compare Changes

Compare working directory:

git diff

Compare staged changes:

git diff --staged
15. Restore File

Undo local changes.

git restore UserService.java

Back to last committed version.

16. Delete Branch

Local:

git branch -d feature/login

Remote:

git push origin --delete feature/login
17. Merge Branch

Merge feature into main.

git switch main

git merge feature/login
18. See Remote Repository
git remote -v

Example:

origin
https://github.com/company/project.git
19. Stash Changes

Temporarily save work.

git stash

Restore:

git stash pop

Very useful when you need to switch branches without committing incomplete work.

20. Reset Commit

Soft reset:

git reset --soft HEAD~1

Keeps changes.

Hard reset:

git reset --hard HEAD~1

Deletes the last commit and its changes.

Use --hard carefully because it permanently removes uncommitted work.

21. Show Current Branch
git branch

Or

git status
22. Rename Branch
git branch -m feature/authentication
23. Remove Untracked Files

Preview:

git clean -n

Delete:

git clean -f
24. View Remote Branches
git branch -r
25. Show Commit Details
git show

Shows the latest commit with the changes it introduced.

Typical Enterprise Workflow

This is a common daily workflow for developers:

# Get the latest code
git pull origin main

# Create a feature branch
git switch -c feature/user-login

# Make code changes

# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Add user login validation"

# Push branch
git push origin feature/user-login

# Open a Pull Request (PR) on GitHub

# After the PR is approved and merged,
# switch back to main
git switch main

# Update local main
git pull origin main

# Delete the feature branch
git branch -d feature/user-login
Commands to Master First

If you're preparing for enterprise Java or full-stack development, focus on these commands first:

Command	Purpose
git clone	Download a repository
git status	Check current changes
git add	Stage changes
git commit -m	Save changes locally
git push	Upload changes
git pull	Get the latest changes
git fetch	Download remote updates without merging
git branch	List or create branches
git switch	Change branches
git merge	Merge branches
git diff	View code differences
git log --oneline	View commit history
git stash	Temporarily save work
git restore	Discard local changes
git remote -v	View remote repositories