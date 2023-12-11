<a name="readme-top"></a>

# Calculator & Currency Converter
<details>
<summary>Table of Contents</summary>
<ol>
<li>
<a href="#about-the-project">About The Project</a>
<ul>
<li>
<a href="#built-with">Built With</a>
</li>
<li>
<a href="#getting-started">Getting Started</a>
<ul>
<li><a href="#environment">Environment</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#installation">Installation</a></li>
</ul>
</li>
<li><a href="#usage">Usage</a></li>
<ul>
<li><a href="#script-details">Script details</a></li>
</ul>
</ul>
</li>
</ol>
</details>

## About The Project
This is the web app for calculating simple operations: +, -, *, /

And convert the result to the target currency with the latest exchange rate.
<p align="right">(<a href="#readme-top">Back to top</a>)</p>


## Built With



This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.


* <b>Node.js</b>
* <b>React</b>
* <b>Firebase</b>
* <b>Firestore</b>
* <b>Typescript</b>
* <b>Material UI</b>
* <b>Styled-components</b>
* <b>Tailwind CSS</b>

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

## Getting Started

To install and run the project successfully, please follow the instructions.

### Environment
```
Node version >= 18.0
Firebase Tools(firebase-tools) version 13.0.0
```

To install Firebase Tools, use this command:
```bash
npm install -g firebase-tools
```

```
FYI:

If it is required to test on local, then need to be sure that ``java`` is already installed on it.
Firebase emulator is using Java to run it.
```
<p align="right">(<a href="#readme-top">Back to top</a>)</p>

### Prerequisites

This project is using ``Firebase`` and ``Firestore``.
Before using this, please follow these steps:
* Project is already added in the cloud console.
* App is registered in the cloud project.
* There are two signin methods: Email/Password, Google. Please be sure that these two providers are enabled.
* In the Firebase, create a callection which name is ``users``

For more information please check this [link]('https://firebase.google.com/docs/web/setup').

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

### Installation

```bash
git clone https://github.com/profullstackdeveloper/calculator-firebase.git

cd calculator-firebase

npm install
```
This step will finish the installation for the Frontend UI.

To runn the cloud functions on local, then:
```bash
cd functions

npm install
```

After finishing installation of required modules, then please be sure that env files are already implemented correctly.

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

## Usage

### Script Details

At first, please run the cloud functions at first. (for local test case)

```bash
cd functions
npm run serve
```

And then, UI can be run with the following command.
```bash
cd ..
npm run start
```

To deploy the cloud functions, use the following command.
```bash
cd functions
npm run build
npm run deploy
```