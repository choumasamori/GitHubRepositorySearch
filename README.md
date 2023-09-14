# GitHub User and Repository Search App

This React application allows users to search for GitHub users by entering a username. It retrieves up to 5 users with usernames similar to the entered value and displays their repositories with no limit on the displayed repositories.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Integration](#api-integration)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1. Clone the repository:
  ```bash
   git clone https://github.com/choumasamori/GitHubRepositorySearch.git
  ```
2. Navigate to the project directory:
  ```bash
  cd GitHubRepositorySearch
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

### Usage
1. Start the development server:
```bash
npm run dev
```
2. Open your web browser and go to http://localhost:3000.

3. Enter a username in the search input field.

4. Click the "Search" button to retrieve up to 5 users with similar usernames.

5. Click on a user to display their repositories.

### Features
- User search by username.
- Display up to 5 users with similar usernames.
- View repositories for selected users with no limit on the displayed repositories.
  
### API Integration
This application integrates with the GitHub API to fetch user and repository data. You can find more information about the GitHub API in the [API Documentation](https://developer.github.com/v3/).

### Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

### Fork the repository.
1. Create a new branch for your feature: git checkout -b feature-name.
2. Make your changes and commit them: git commit -m 'Add new feature'.
3. Push to the branch: git push origin feature-name.
4. Create a pull request with a detailed description of your changes.
