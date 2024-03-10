const sideNavigation = [
  {
    name: 'Dashboard',
    path: './dashboard.html',
    icon: '../../images/dashboard.png',
    subMenu: [],
  },
  {
    name: 'Blogs',
    path: './blogs.html',
    icon: '../../images/blogs.png',
    subMenu: [
      {
        name: 'All Blogs',
        path: '/blogs/all',
        icon: 'users',
      },
      {
        name: 'Add Blog',
        path: '/blogs/add',
        icon: 'users',
      },
      {
        name: 'Update Blog',
        path: '/blogs/update',
        icon: 'users',
      },
    ],
  },
  {
    name: 'Skills',
    path: './skills.html',
    icon: '../../images/skills.png',
    subMenu: [
      {
        name: 'All Skills',
        path: '/skills/all',
        icon: 'users',
      },
      {
        name: 'Add Skill',
        path: '/skills/add',
        icon: 'users',
      },
      {
        name: 'Update Skill',
        path: '/skills/update',
        icon: 'users',
      },
    ],
  },
  {
    name: 'Queries',
    path: './queries.html',
    icon: '../../images/querries.png',
    subMenu: [],
  },
];

export default sideNavigation;