# My Wallet - Backend

My Wallet is a full-stack personal finance management tool designed to help you keep your finances in check. This README focuses on the backend of the My Wallet application.

## Table of Contents

- [Overview](#overview)
- [Badges](#badges)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Overview

The My Wallet backend is an essential part of the full-stack application, providing the necessary APIs to manage expenses and income. It serves as the server-side component responsible for handling data storage and retrieval.

## Badges

This project leverages the following technologies on the backend:

- Node.js
- Express.js
- MongoDB

## Getting Started

Here's how to set up and run the My Wallet backend server locally.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. If you don't have them installed, you can download and install them from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

### Installation

Follow these steps to set up the backend:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ohanaace/mywallet-back.git
```
2. Navigate to the project's root directory in your terminal:
   ```bash
   cd mywallet-back
   ```
3. Install all dependecies
 ```bash
    npm install
```
4. Create a ``.env`` file based on the ``.env.example`` file provided in the repository. Configure the environment variables, including the database connection details.
1. Start the backend server
 ```bash
    npm start
```

The backend server should now be running on the specified port (default is 3000).

## Usage

The My Wallet backend provides a set of RESTful APIs that the front-end application uses to manage financial data. These APIs allow you to perform actions such as creating, updating, and retrieving income and expense records.

Make sure to check the documentation or API endpoints within the backend code for detailed information on how to use the APIs.

For additional information on setting up and running the front-end application, please refer to the [front-end README](https://github.com/ohanaace/mywallet-front/blob/main/README.md).