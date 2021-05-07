export default function () {
  return {
    all: [],
    active: [],
    system: [],
    possibleapps: [],
    create: false,
    running: false,
    link_tab: 'default',
    link_tabs: [
      {
        value: 'heimdall',
        label: 'Same tab'
      },
      {
        value: '_blank',
        label: 'New tab'
      },
      {
        value: '_self',
        label: 'Current tab'
      },
      {
        value: 'default',
        label: 'Default'
      }
    ],
    edit: {
      id: null,
      icon: null,
      title: null,
      users: null,
      description: '',
      url: null,
      color: null,
      applicationtype: null,
      possibletags: null,
      link_tab: 'default'
    }
  }
}
