<br />
<div align="center">

  <h3 align="center">AI Based Photo and Video Editor</h3>

  <p align="center">
    An awesome photo and video editor to demonstrate the power of AI when made available in a user friendly manner
    <br />
    <br />
  </p>
</div>

## About The Project

This web application enables users to edit photos and videos with advanced AI-driven features. Key functionalities include generative fills, background removal, mask creation, and video cropping with target framing. I built this app to refresh my knowlage about Next.js, TypeScript, Zustand and to understand the new AI features offered by cloudinary. The UI is styled with TailwindCSS and Shadcn for a seamless and responsive user experience.

![Application][app]

### Features

- **Generative Fills**: This AI-driven feature allows users to fill in parts of an image with generated content that seamlessly blends with the existing elements. It can be used to expand images, fill gaps, or even create new objects in a scene based on the surrounding context.

- **Background Removal**: A powerful tool that automatically detects and removes the background from an image, isolating the subject for use in different contexts. This is particularly useful for creating transparent backgrounds or changing the background entirely.

- **Mask Creation**: Allows users to create masks over specific areas of an image. These masks can be used to apply effects or edits selectively, such as adjusting brightness, contrast, or color in only certain parts of the image.

- **Video Cropping with Target in Frame**: This feature enables precise cropping of videos to ensure that the main subject or target remains in the frame throughout the clip. It is particularly useful for focusing on a particular area or subject within a video, enhancing the viewing experience.

- **Generative Removal**: Allows users to remove specific parts of an image by providing a prompt. The AI seamlessly fills in the removed area with generated content that matches the surrounding environment, making the edit appear natural and cohesive.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- ![TypeScript][TypeScript]
- ![Zustand][Zustand]
- ![Cloudinary][Cloudinary]
- ![TailwindCSS][TailwindCSS]
- ![Shadcn][Shadcn]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

  <h3 align="center">AI Based Photo and Video Editor</h3>

  <p align="center">
    An awesome photo and video editor to demonstrate the power of AI when made available in a user friendly manner
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

## About The Project

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

- Your time should be focused on creating something amazing. A project that solves a problem and helps others
- You shouldn't be doing the same tasks over and over like creating a README from scratch
- You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Vue][Vue.js]][Vue-url]
- [![Angular][Angular.io]][Angular-url]
- [![Svelte][Svelte.dev]][Svelte-url]
- [![Laravel][Laravel.com]][Laravel-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This app requires node and npm installed to run it. Further, you need to create a free cloudinary account and an API key to use the AI features provided by it.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

Create a cloudinary account or login to your existing account

Go to the setting page and then to API keys. Create a new API key and copy the key, secret and the environment URL.

![Cloudinary setup page][cloudinary-setup]

Next, go to the cloudinary presets tab and create a new preset for uploading images.

![Cloudinary setup page][cloudinary-preset]

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/Tharindu-Samarakoon/ai-photo-editor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API Key, secret, name and url by creating a .env.local file similar to the existing .example.env file.
   ```js
   CLOUDINARY_NAME = cloudinary_name;
   CLOUDINARY_SECRET = CLOUDINARY_secret_G0eSHeRe;
   CLOUDINARY_KEY = ClouDinARY_KeY;
   CLOUDINARY_URL = THE_API_Environment_URL;
   ```
4. Change git remote url to avoid accidental pushes to base project

   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

5. Finally, run the project with the following command
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The application provides many features like,

- Video and Image uploads.
- Layer comparison
- Generative background removal
- Generative background refill
- Generative removal through a prompt text
- Generative fill
- Video crop with target in frame
- Video transcription

![app image options][image-editing]

![app video options][video-editing]

_For more Cloudinary AI features, please refer to the [Cloudinary Documentation](https://cloudinary.com/documentation/ai_in_action)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Tharindu Samarakoon - [@LinkedIn](https://www.linkedin.com/in/tharindu-c-b-samarakoon/) - tharusamara@gmail.com

Project Link: [https://github.com/Tharindu-Samarakoon/ai-photo-editor](https://github.com/Tharindu-Samarakoon/ai-photo-editor)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Zustand]: https://img.shields.io/badge/Zustand-1E1E1E?style=for-the-badge&logoColor=white
[Zustand-url]: https://zustand.surge.sh/
[Cloudinary]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Shadcn]: https://img.shields.io/badge/Shadcn-4A5568?style=for-the-badge&logoColor=white
[Shadcn-url]: https://shadcn.dev/
[cloudinary-setup]: https://firebasestorage.googleapis.com/v0/b/reactapp-cea8f.appspot.com/o/Github%2Fcloudinary-setup.png?alt=media&token=e858b752-16e6-4da3-93d3-61671e51d946
[cloudinary-preset]: https://firebasestorage.googleapis.com/v0/b/reactapp-cea8f.appspot.com/o/Github%2Fcloudinary-setup-preset.png?alt=media&token=c8a32429-5b9b-42d0-a2cf-c6e5f5e2f8fc
[image-editing]: https://firebasestorage.googleapis.com/v0/b/reactapp-cea8f.appspot.com/o/Github%2Fapp-image.png?alt=media&token=16b0a25e-c5aa-4abb-9610-3091540e7ffe
[video-editing]: https://firebasestorage.googleapis.com/v0/b/reactapp-cea8f.appspot.com/o/Github%2Fapp-video.png?alt=media&token=d51b5b62-49f9-47a1-88f2-eb87c6211951
[app]: https://firebasestorage.googleapis.com/v0/b/reactapp-cea8f.appspot.com/o/Github%2Fapp.JPG?alt=media&token=d581e1da-129f-43be-a782-5162d6d1d076
