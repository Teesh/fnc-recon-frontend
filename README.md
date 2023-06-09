<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h2 align="center">FNC Recon React Frontend</h2>

  <p align="center">
    The FNC Recon App will consist of three portions: collection, storage, and analysis. This project specifically targets the analysis portion through building a React frontend as a baseline for somewhere to create graphs, tables, etc.
    <br />
    <a href="https://github.com/Teesh/fnc-recon-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://fnc-recon-frontend-avxirbvnfa-uc.a.run.app/">View Demo</a>
    ·
    <a href="https://github.com/Teesh/fnc-recon-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Teesh/fnc-recon-frontend/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Built With

* [![Google Cloud Platform][GCP]][GCP-url]
* [![React][React]][React-url]
* [![Node JS][Node.js]][Node-url]
* [![Docker][Docker]][Docker-url]
* [![Typescript][Typescript]][Typescript-url]
* [![NPM][NPM]][NPM-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The live version on GCP is currently managed by Teesh. The app itself was bootstrapped using [Create React App](https://create-react-app.dev/). The Docker portion of this app is just for sanity checking to make sure it will build on GCP as intended.

### Prerequisites

Use the following steps to get the app running on your local machine
* Node JS

  https://nodejs.org/en/download

* npm
  ```sh
  npm install npm@latest -g
  ```
* Docker Desktop (for local testing only). Be aware, Windows machines may need additional setup not covered here

  https://www.docker.com/products/docker-desktop/

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Teesh/fnc-recon-frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the React app in development mode 
   ```sh
   npm start
   ```
4. (Optional) Start the React app in Docker. Make sure Docker is running first. 
   ```sh
   docker-compose up -d
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

The app is a blank slate at the moment, with goal of allowing devs to quickly start a blank React app and try new things with it. No functionality has been added and there in no integration with other portions of the FNU United app at this time.

_For more examples, please refer to the [Documentation (Placeholder)](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Test and agree on a graphing/visualization [library](https://technostacks.com/blog/react-chart-libraries/)
- [ ] Build simple charts to pull data from FNC United API
- [ ] Build a test view for inserting data into a development database 
- [ ] Agree on some simple metrics for display
- [ ] Utilize an API key

See the [open issues](https://github.com/Teesh/fnc-recon-frontend/issues) for a full list of proposed features (and known issues). Feel free to add or track issues there for now. They can be migrated to the official repo later once that is built.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. As a proof of concept, the work here will eventually be migrated to an official team repository.

Until then, if you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Teesh - Find me on the FNC Scouting Discord as `Teesh|4561|Mentor` or reach out to me via email at `teesh.s93@gmail.com` 

Project Link: [https://github.com/Teesh/fnc-recon-frontend](https://github.com/Teesh/fnc-recon-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Terrorbytes](terrorbytes.org) for their support and vision in this

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Teesh/fnc-recon-frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/Teesh/fnc-recon-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Teesh/fnc-recon-frontend.svg?style=for-the-badge
[forks-url]: https://github.com/Teesh/fnc-recon-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/Teesh/fnc-recon-frontend.svg?style=for-the-badge
[stars-url]: https://github.com/Teesh/fnc-recon-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Teesh/fnc-recon-frontend.svg?style=for-the-badge
[issues-url]: https://github.com/Teesh/fnc-recon-frontend/issues
[license-shield]: https://img.shields.io/github/license/Teesh/fnc-recon-frontend.svg?style=for-the-badge
[license-url]: https://github.com/Teesh/fnc-recon-frontend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/teeshshahi
[product-screenshot]: images/screenshot.png
[GCP]: https://img.shields.io/badge/Google_Cloud-0F9D58?style=for-the-badge&logo=google-cloud&logoColor=F4B400
[GCP-url]: https://cloud.google.com/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[Node.js]: https://img.shields.io/badge/Node.js-35495E?style=for-the-badge&logo=nodedotjs&logoColor=4FC08D
[Node-url]: https://nodejs.org/
[Docker]: https://img.shields.io/badge/Docker-4A4A55?style=for-the-badge&logo=docker&logoColor=4285F4
[Docker-url]: https://docker.com/
[Typescript]: https://img.shields.io/badge/Typescript-4285F4?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://typescriptlang.org
[NPM]: https://img.shields.io/badge/NPM-CC3534?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://npmjs.com