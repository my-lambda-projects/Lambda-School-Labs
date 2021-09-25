Git Process for LABS Project:

Creating a new branch:
1. git checkout dev 
2. git -b your-branch-name**
** Name your branch after the feature you are currently working on, not your name


Committing changes to your branch:
1. git checkout your-branch-name
2. git status
3. git add .
4. git commit -m "My commit message here"
5. git checkout dev
6. git pull origin dev 
7. git checkout your-branch-name
8. git rebase master
9. git push origin master 


If rebase contains merge conflicts:
1. Resolve conflict(s) in terminal or code editor GUI
2. Save changes after resolving conflict(s)
3. git add .
4. git rebase --continue
5. Reach out for help if problems with this process occur

After you are done with feature on our branch, create a PR. 
In Slack @channel a link to your PR and have everyone look at it and leave beneficial code commentary or a thumbs up
Once given approval from all team members, merge into dev

Merging into Dev Branch:
1. git checkout dev
2. git pull origin dev
3. git merge your-branch-name
4. Resolve any merge conflicts (reach out for help if necessary at this step)
5. git push origin dev

Once you merge into Dev Branch, let PM know, and they will merge with master branch.

Code Review:
- pull their branch down and test to make sure everything works on their branch
