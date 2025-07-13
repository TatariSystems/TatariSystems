// Icon mapping utility for replacing Lucide icons with custom icons
export const getIconPath = (iconName: string): string => {
  const iconMap: { [key: string]: string } = {
    // Core icons
    'Users': 'people.png',
    'User': 'people.png',
    'Cpu': 'CPU.png',
    'Cloud': 'Cloud.png',
    'Shield': 'Shield.png',
    'DollarSign': 'money-bag.png',
    'TrendingUp': 'Chart.png',
    'Zap': 'Switch.png',
    'Globe': 'Web 3.png',
    'Server': 'Box 1.png',
    'Database': 'Box 2.png',
    'Lock': 'Lock.png',
    'MessageSquare': 'Message.png',
    'ArrowRight': 'Connected.png',
    'CheckCircle': 'Heart.png',
    'AlertTriangle': 'Cross.png',
    'BarChart3': 'Chart.png',
    'Target': 'Pin.png',
    'Clock': 'clock.png',
    'BookOpen': 'Folder.png',
    'Sliders': 'Settings.png',
    'Wrench': 'Settings.png',
    'Brain': 'CPU.png',
    'Linkedin': 'Connected.png',
    'ExternalLink': 'Connected.png',
    'ChevronRight': 'Connected.png',
    'ChevronLeft': 'Connected.png',
    'Activity': 'Chart.png',
    'Map': 'Web 3.png',
    'Mountain': 'Box 3.png',
    'TreePine': 'Plant.png',
    'Waves': 'Web 3.png',
    'Sun': 'Web 3.png',
    'Wallet': 'Wallet.png',
    'Blockchain': 'Blockchain.png',
    'Chain': 'chain.png',
    'Discount': 'Discount.png',
    'Plant': 'Plant.png',
    'PieChart': 'Pie chart.png',
    'Chart': 'Chart.png',
    'Settings': 'Settings.png',
    'Cross': 'Cross.png',
    'Pin': 'Pin.png',
    'Connected': 'Connected.png',
    'Switch': 'Switch.png',
    'MoneyBag': 'money-bag.png',
    'Heart': 'Heart.png',
    'Message': 'Message.png',
    'Box1': 'Box 1.png',
    'Box2': 'Box 2.png',
    'Box3': 'Box 3.png',
    'Web3': 'Web 3.png',
    'CPU': 'CPU.png'
  }

  return iconMap[iconName] || 'Settings.png' // fallback to settings icon
}

export const getIconSrc = (iconName: string): string => {
  const iconPath = getIconPath(iconName)
  return `/icons/${iconPath}`
} 