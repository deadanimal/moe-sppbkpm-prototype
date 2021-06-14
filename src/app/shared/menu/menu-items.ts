export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-home text-primary'
  },
  {
    path: '/admin/perancangan',
    title: 'Perancangan',
    type: 'link',
    icontype: 'fas fa-tasks text-primary'
  },
  {
    path: '/admin/pentadbiran',
    title: 'Pentadbiran',
    type: 'sub',
    icontype: 'fas fa-school text-primary',
    collapse: 'pentadbiran',
    isCollapsed: true,
    children: [
      { path: 'jenis-pentaksiran', title: 'Tetapan Jenis Pentaksiran', type: 'link' },
      { path: 'tahun-tingkatan', title: 'Tetapan Tahun/Tingkatan', type: 'link' }
    ]
  },
  {
    path: '/admin/keputusan',
    title: 'Keputusan',
    type: 'link',
    icontype: 'ni ni-trophy text-primary'
  },
  {
    path: '/admin/user-management',
    title: 'Pengurusan Pengguna',
    type: 'sub',
    icontype: 'fas fa-users-cog text-primary',
    collapse: 'user-management',
    isCollapsed: true,
    children: [
      { path: 'management', title: 'Pengurusan', type: 'link' },
      { path: 'user', title: 'Pengguna', type: 'link' },
      { path: 'roles', title: 'Peranan', type: 'link' }
    ]
  },
  {
    path: '/admin/audit-trails',
    title: 'Jejak Audit',
    type: 'link',
    icontype: 'fas fa-shoe-prints text-primary'
  },
  /*{
    path: '/admin/management',
    title: 'Management',
    type: 'sub',
    icontype: 'fas fa-file-invoice text-pink',
    collapse: 'management',
    isCollapsed: true,
    children: [
      { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
      { path: 'user', title: 'User', type: 'link' }
    ]
  },
  {
    path: '/admin/report',
    title: 'Reporting',
    type: 'link',
    icontype: 'fas fa-chart-bar text-red'
  },
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/user/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-yellow'
  },
  {
    path: '/user/keputusan',
    title: 'Keputusan',
    type: 'link',
    icontype: 'ni ni-trophy text-yellow'
  }
  /*{
    path: '/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-green'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  },
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];