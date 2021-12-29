const steps = (i18n) => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('msg.guide.GuideTitle'),
        description: i18n.t('msg.guide.GuideDesc'),
        position: 'bottom-right'
      }
    }
  ]
}
export default steps
