const NavigationOptions = {
  primaryLinks: [
    {
      linkName: 'About',
      linkPath: '/About',
      linkId: 'about',
      index: 1
    }
  ],
  dropdownOptions: [
    {
      linkName: 'Execute',
      linkId: 'exec ',
      index: 2,
      subLinks: [
        {
          linkName: 'Performance',
          linkPath: '/performance',
          index: 2.1
        },
        {
          linkName: 'UI Test Automation',
          linkPath: '/ui',
          index: 2.2
        },
        {
          linkName: 'Service Test Automation',
          linkPath: '/execution/service',
          index: 2.3
        }
      ]
    },
    {
      linkName: 'Report',
      linkId: 'report',
      index: 3,
      subLinks: [
        {
          linkName: 'Add Report',
          linkPath: '/reporting/add-report',
          index: 3.1
        },
        {
          linkName: 'View All',
          linkPath: '/reporting/all',
          index: 3.2
        }
      ]
    }
  ]
};
export default NavigationOptions;
