# Spendlow

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen)](https://spendlow.vercel.app/)

**Description:**

A budget planning application built with Vite and React. This app helps users manage their finances by tracking income and expenses, list borrowed and owe money.

**Features:**

* Income and Expense Tracking: Add, edit, and delete transactions.
* Budget Summary: View a summary of your income, expenses, and net balance.
* Lending Management: Track money lent to others or borrowed.
* Customizable Filters: Filter transactions by month and year.
* Dark Mode: Toggle between light and dark themes.
* Responsive Design: Fully responsive layout for all devices.


**Getting Started:**

**Prerequisites:**

*   Node.js
*   npm

**Installation:**

1.  Clone the repository:

    ```bash
    git clone https://github.com/marufx86/Spendlow.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd Spendlow
    ```

3.  Install dependencies:

    ```bash
    npm i
    ```


**Running the App:**

```bash
npm run dev
```

Open your browser to http://localhost:8080/ to view the app.

**Deployment:**

The app is deployed on Vercel at [budgetplanner-vite.vercel.app](https://spendlow.vercel.app/).  To deploy your own version:

1.  Push your code to GitHub
2.  Import the repository to Vercel
3.  Deploy

**Screenshots:**

![image](https://github.com/user-attachments/assets/8ee7c5e6-7cda-4e33-b654-ee56cc106a4f)

![image](https://github.com/user-attachments/assets/55de73c0-f03f-4aea-a76f-a3587b4837ac)

![image](https://github.com/user-attachments/assets/677f3403-9310-4e03-b9f4-8dd85a4c65c1)

![image](https://github.com/user-attachments/assets/f6e9f70b-e65a-4d9f-aed4-c1d3df3f9576)

![image](https://github.com/user-attachments/assets/3c170828-ec3f-4127-9d3f-250cde13de0e)





**Mobile Preview**

![image](https://github.com/user-attachments/assets/a5df4bb7-7f8d-4be0-91be-4a46f0e72cd9)


![image](https://github.com/user-attachments/assets/81fd2c73-6b50-4345-b304-581948198208)


![image](https://github.com/user-attachments/assets/0a294df9-115c-4654-a688-3cc40ad2e471)

![image](https://github.com/user-attachments/assets/49489a61-079d-4bb2-bd9b-383537b29cf7)



**Native Mobile App (Android) with Capacitor:**

You can easily wrap your web app into a native Android app using Capacitor. Here are the steps:

1.  **Install Capacitor:**

    ```bash
    npm install @capacitor/core @capacitor/cli
    ```

2.  **Initialize Capacitor:**

    ```bash
    npx cap init
    ```

    *   You'll be prompted for an app name and package ID (e.g., `com.example.budgetplanner`).

3.  **Add the Android Platform:**

    ```bash
    npx cap add android
    ```

4.  **Copy Your Built Web App:**

    ```bash
    npm run build  # Make sure you have a production build of your web app.
    npx cap copy
    ```

5.  **Open the Android Project in Android Studio:**

    ```bash
    npx cap open android
    ```

    *   This will open Android Studio. Build and run the app on an emulator or connected device.

**Important Notes for Capacitor:**

*   Ensure you have Android Studio installed and properly configured.
*   Some time errors will pop up, run all the Capacitor related commands again, and you're good to go.
*   Refer to the official Capacitor documentation for the most up-to-date information: [https://capacitorjs.com/docs](https://capacitorjs.com/docs)


**Contributing:**

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository
2.  Create a new branch for your feature/fix
3.  Commit your changes
4.  Open a pull request

**License:**

MIT License

Copyright (c) 2025 Maruf Khan Ornob

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
