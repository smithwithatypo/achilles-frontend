# Achilles frontend

Learn easier with React + Go + AI

## Libraries
- React
- Vite for packaging
- Shadcn + Tailwind for CSS styling
- React Router (library) for routing

## To run
### Prerequisites
- Git
- Node.js
- Yarn

### Getting Started
1. Clone the repository:
  ```bash
  git clone git@github.com:smithwithatypo/achilles-frontend.git
  ```

2. Navigate to the project directory:
  ```bash
  cd frontend
  ```

3. Install dependencies:
  ```bash
  yarn install
  ```

4. Start the development server:
```bash
yarn dev
```

## Git Branch Management

### Pruning Remote and Local Branches

To clean up your Git repository by removing references to deleted remote branches and then removing local branches:

1. Prune remote-tracking branches that no longer exist on the remote:
```bash
git fetch --prune
```

2. List local branches that have been merged into the current branch (to identify candidates for deletion):
```bash
git branch --merged
```

3. Delete a specific local branch:
```bash
git branch -d <branch-name>
```

4. Force delete a local branch (if it contains unmerged changes):
```bash
git branch -D <branch-name>
```

5. To list local branches that track deleted remote branches:
```bash
git branch -vv | grep ': gone]'
```

6. To delete all local branches that track deleted remote branches:
```bash
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d
```