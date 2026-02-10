import { HttpInterceptorFn } from '@angular/common/http';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. LocalStorage se Tenant ID nikalo (Jo login karte waqt save ki thi)
  // Agar nahi mili to 'public' default use karega
  const tenantId = localStorage.getItem('tenantId') || 'public';

  // 2. Request ko Clone karke Header add karo
  // (Direct request modify nahi kar sakte, clone karna zaroori hai)
  const clonedRequest = req.clone({
    setHeaders: {
      'X-TenantID': tenantId
    }
  });

  // 3. Console me print karo taaki pata chale request kaunse schema me ja rahi hai
  console.log(`📡 Sending Request to Tenant: ${tenantId}`);

  // 4. Request ko aage Jane do
  return next(clonedRequest);
};