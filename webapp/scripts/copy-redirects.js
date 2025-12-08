const fs = require('fs');
const path = require('path');

// Копируем _redirects в dist
const redirectsSource = path.join(__dirname, '../public/_redirects');
const redirectsDest = path.join(__dirname, '../dist/_redirects');

if (fs.existsSync(redirectsSource)) {
  fs.copyFileSync(redirectsSource, redirectsDest);
  console.log('✓ _redirects copied to dist');
}

// Создаем index.html копии для основных роутов (fallback для Render)
const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Создаем копии для основных роутов
  const routes = ['/catalog', '/limited', '/cart', '/account', '/about', '/admin'];
  
  routes.forEach(route => {
    const routePath = route.substring(1); // убираем ведущий /
    const routeDir = path.join(distPath, routePath);
    
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    
    const routeIndexPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeIndexPath, indexContent);
  });
  
  console.log('✓ Created route fallbacks');
}

console.log('✓ Build post-processing complete');

