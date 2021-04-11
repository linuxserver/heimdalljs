export default function () {
  return {
    all: [],
    active: [],
    system: [],
    possibleapps: [],
    create: false,
    running: false,
    link_tab: null,
    open_tabs: [
      {
        value: '0',
        label: 'Same tab'
      },
      {
        value: '1',
        label: 'New tab'
      },
      {
        value: '2',
        label: 'Current tab'
      },
      {
        value: '3',
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
      possibletags: null
    }
  }
}
