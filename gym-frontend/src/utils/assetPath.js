// Utility function to handle asset paths for GitHub Pages
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production (GitHub Pages), use the homepage URL
  // In development, use the public folder
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.PUBLIC_URL}/${cleanPath}`;
  }
  
  return `/${cleanPath}`;
};

export default getAssetPath;