// Utility function to handle asset paths for GitHub Pages and Render deployment
export const getAssetPath = (path: string): string => {
  const basePath = import.meta.env.VITE_BASE_PATH || '/';
  // Remove trailing slash from basePath and leading slash from path, then join
  return `${basePath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

// Debug function to check all asset paths
export const debugAssetPaths = () => {
  const assets = [
    'assets/tatarilogo.png',
    'headshots/dalban.jpg',
    'headshots/boucheseiche.jpg'
  ];
  
  console.log('=== Asset Path Debug ===');
  assets.forEach(asset => {
    console.log(`${asset} -> ${getAssetPath(asset)}`);
  });
  console.log('Environment:', process.env.NODE_ENV);
  console.log('=======================');
}; 