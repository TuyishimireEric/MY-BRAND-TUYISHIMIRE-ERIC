export const blogs = [
  {
    id: 1,
    title: "Next Js 13.4",
    date: "11/Jan/2024",
    image: "./images/nextJS.png",
    createBy: "Eric Tuyishimire",
    rating: 4.2,
    likes: 10,
    comments: [
      {
        id: 1,
        name: "Mussa Muhammed",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "11/Jan/2024",
      },
      {
        id: 2,
        name: "John Doe",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "13/Jan/2024",
      },
      {
        id: 3,
        name: "Mucyo Eric",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "15/Jan/2024",
      },
    ],
    description: `To build a complete web application with React from scratch, there are many important details you need to consider:

        Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
        You need to do production optimizations such as code splitting.
        You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
        You might have to write some server-side code to connect your React app to your data store.
        A framework can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.
        
        Next.js: The React Framework
        Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.
        
        Next.js aims to have best-in-class developer experience and many built-in features, such as:
         intuitive page-based routing system (with support for dynamic routes)
        Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
        Automatic code splitting for faster page loads
        Client-side routing with optimized prefetching
        Built-in CSS and Sass support, and support for any CSS-in-JS library
        Development environment with Fast Refresh support
        API routes to build API endpoints with Serverless Functions
        Fully extendable
        Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.
        
        This free interactive course will guide you through how to get started with Next.js.
        
        In this tutorial, you’ll learn Next.js basics by creating a very simple blog app. Here’s an example of the final result:
        
        https://next-learn-starter.vercel.app (source)
        
        This tutorial assumes basic knowledge of JavaScript and React. If you’ve never written React code, you should go through the official React tutorial first.
        
        If you’re looking for documentation instead, visit the Next.js documentation.
        
        Setup
        First, let’s make sure that your development environment is ready.
        
        If you don’t have Node.js installed, install it from here. You’ll need Node.js version 18 or higher.
        You’ll be using your own text editor and terminal app for this tutorial.
        If you are on Windows, we recommend downloading Git for Windows and use Git Bash that comes with it, which supports the UNIX-specific commands in this tutorial. Windows Subsystem for Linux (WSL) is another option.
        
        
        Create a Next.js app
        
        To create a Next.js app, open your terminal, cd into the directory you’d like to create the app in, and run the following command:
        
        npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
        Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the --example flag.
        
        If it doesn’t work, please take a look at this page.
        
        Run the development server
        You now have a new directory called nextjs-blog. Let’s cd into it:
        
        cd nextjs-blog
        Then, run the following command:
        
        npm run dev
        This starts your Next.js app’s "development server" (more on this later) on port 3000.
        `,
  },
  {
    id: 2,
    title: "How to create a blog",
    date: "11/Jan/2024",
    image: "./images/blog.jpeg",
    createBy: "Eric Tuyishimire",
    rating: 4,
    likes: 10,
    comments: [
      {
        id: 1,
        name: "Mussa Muhammed",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "10/Jan/2024",
      },
      {
        id: 2,
        name: "John Doe",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "09/Jan/2024",
      },
      {
        id: 3,
        name: "Mucyo Eric",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "18/Jan/2024",
      },
    ],
    description: `To build a complete web application with React from scratch, there are many important details you need to consider:

        Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
        You need to do production optimizations such as code splitting.
        You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
        You might have to write some server-side code to connect your React app to your data store.
        A framework can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.
        
        Next.js: The React Framework
        Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.
        
        Next.js aims to have best-in-class developer experience and many built-in features, such as:
         intuitive page-based routing system (with support for dynamic routes)
        Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
        Automatic code splitting for faster page loads
        Client-side routing with optimized prefetching
        Built-in CSS and Sass support, and support for any CSS-in-JS library
        Development environment with Fast Refresh support
        API routes to build API endpoints with Serverless Functions
        Fully extendable
        Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.
        
        This free interactive course will guide you through how to get started with Next.js.
        
        In this tutorial, you’ll learn Next.js basics by creating a very simple blog app. Here’s an example of the final result:
        
        https://next-learn-starter.vercel.app (source)
        
        This tutorial assumes basic knowledge of JavaScript and React. If you’ve never written React code, you should go through the official React tutorial first.
        
        If you’re looking for documentation instead, visit the Next.js documentation.
        
        Setup
        First, let’s make sure that your development environment is ready.
        
        If you don’t have Node.js installed, install it from here. You’ll need Node.js version 18 or higher.
        You’ll be using your own text editor and terminal app for this tutorial.
        If you are on Windows, we recommend downloading Git for Windows and use Git Bash that comes with it, which supports the UNIX-specific commands in this tutorial. Windows Subsystem for Linux (WSL) is another option.
        
        
        Create a Next.js app
        
        To create a Next.js app, open your terminal, cd into the directory you’d like to create the app in, and run the following command:
        
        npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
        Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the --example flag.
        
        If it doesn’t work, please take a look at this page.
        
        Run the development server
        You now have a new directory called nextjs-blog. Let’s cd into it:
        
        cd nextjs-blog
        Then, run the following command:
        
        npm run dev
        This starts your Next.js app’s "development server" (more on this later) on port 3000.
        `,
  },
  {
    id: 3,
    title: "How to create a blog",
    date: "14/Jan/2024",
    image: "./images/blog1.jpeg",
    createBy: "Eric Tuyishimire",
    rating: 4,
    likes: 10,
    comments: [
      {
        id: 1,
        name: "Mussa Muhammed",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "11/Jan/2024",
      },
      {
        id: 2,
        name: "John Doe",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "20/Jan/2024",
      },
      {
        id: 3,
        name: "Mucyo Eric",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "22/Jan/2024",
      },
    ],
    description: `To build a complete web application with React from scratch, there are many important details you need to consider:

        Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
        You need to do production optimizations such as code splitting.
        You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
        You might have to write some server-side code to connect your React app to your data store.
        A framework can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.
        
        Next.js: The React Framework
        Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.
        
        Next.js aims to have best-in-class developer experience and many built-in features, such as:
         intuitive page-based routing system (with support for dynamic routes)
        Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
        Automatic code splitting for faster page loads
        Client-side routing with optimized prefetching
        Built-in CSS and Sass support, and support for any CSS-in-JS library
        Development environment with Fast Refresh support
        API routes to build API endpoints with Serverless Functions
        Fully extendable
        Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.
        
        This free interactive course will guide you through how to get started with Next.js.
        
        In this tutorial, you’ll learn Next.js basics by creating a very simple blog app. Here’s an example of the final result:
        
        https://next-learn-starter.vercel.app (source)
        
        This tutorial assumes basic knowledge of JavaScript and React. If you’ve never written React code, you should go through the official React tutorial first.
        
        If you’re looking for documentation instead, visit the Next.js documentation.
        
        Setup
        First, let’s make sure that your development environment is ready.
        
        If you don’t have Node.js installed, install it from here. You’ll need Node.js version 18 or higher.
        You’ll be using your own text editor and terminal app for this tutorial.
        If you are on Windows, we recommend downloading Git for Windows and use Git Bash that comes with it, which supports the UNIX-specific commands in this tutorial. Windows Subsystem for Linux (WSL) is another option.
        
        
        Create a Next.js app
        
        To create a Next.js app, open your terminal, cd into the directory you’d like to create the app in, and run the following command:
        
        npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
        Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the --example flag.
        
        If it doesn’t work, please take a look at this page.
        
        Run the development server
        You now have a new directory called nextjs-blog. Let’s cd into it:
        
        cd nextjs-blog
        Then, run the following command:
        
        npm run dev
        This starts your Next.js app’s "development server" (more on this later) on port 3000.
        `,
  },
  {
    id: 4,
    title: "use Clamp",
    date: "11/Jan/2024",
    image: "./images/mocha.png",
    createBy: "Eric Tuyishimire",
    rating: 4,
    likes: 10,
    comments: [
      {
        id: 1,
        name: "Mussa Muhammed",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "11/Jan/2024",
      },
      {
        id: 2,
        name: "John Doe",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "10/Jan/2024",
      },
      {
        id: 3,
        name: "Mucyo Eric",
        comment:
          "Fantastic read! Next.js has truly revolutionized the way we approach React applications. The seamless integration with React and the built-in features like server-side rendering and automatic code splitting make it a powerhouse for building performant and scalable web applications. I appreciate the detailed insights provided in this article, especially [mention any specific points you found interesting]. Looking forward to exploring more of Next.js's capabilities and best practices.",
        rating: 4,
        date: "17/Jan/2024",
      },
    ],
    description: `To build a complete web application with React from scratch, there are many important details you need to consider:
      
        Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
        You need to do production optimizations such as code splitting.
        You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
        You might have to write some server-side code to connect your React app to your data store.
        A framework can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.
        
        Next.js: The React Framework
        Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.
        
        Next.js aims to have best-in-class developer experience and many built-in features, such as:
         intuitive page-based routing system (with support for dynamic routes)
        Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
        Automatic code splitting for faster page loads
        Client-side routing with optimized prefetching
        Built-in CSS and Sass support, and support for any CSS-in-JS library
        Development environment with Fast Refresh support
        API routes to build API endpoints with Serverless Functions
        Fully extendable
        Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.
        
        This free interactive course will guide you through how to get started with Next.js.
        
        In this tutorial, you’ll learn Next.js basics by creating a very simple blog app. Here’s an example of the final result:
        
        https://next-learn-starter.vercel.app (source)
        
        This tutorial assumes basic knowledge of JavaScript and React. If you’ve never written React code, you should go through the official React tutorial first.
        
        If you’re looking for documentation instead, visit the Next.js documentation.
        
        Setup
        First, let’s make sure that your development environment is ready.
        
        If you don’t have Node.js installed, install it from here. You’ll need Node.js version 18 or higher.
        You’ll be using your own text editor and terminal app for this tutorial.
        If you are on Windows, we recommend downloading Git for Windows and use Git Bash that comes with it, which supports the UNIX-specific commands in this tutorial. Windows Subsystem for Linux (WSL) is another option.
        
        
        Create a Next.js app
        
        To create a Next.js app, open your terminal, cd into the directory you’d like to create the app in, and run the following command:
        
        npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
        Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the --example flag.
        
        If it doesn’t work, please take a look at this page.
        
        Run the development server
        You now have a new directory called nextjs-blog. Let’s cd into it:
        
        cd nextjs-blog
        Then, run the following command:
        findme
        npm run dev
        This starts your Next.js app’s "development server" (more on this later) on port 3000.
        `,
  },
];
